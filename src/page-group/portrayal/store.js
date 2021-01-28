import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {message} from 'antd'
import {
  errorTip, trimFormValues, debounce,
} from '../../common/util'
import io from './io'

class Store {
  @observable objId // 当前实体id
  @observable projectId = null // 项目id
  @observable mainLabel = '' // 实体主标签

  @observable prevTag = {} 
  @observable markedLoading = false
  @observable picUrl

  @observable isJump = false // 是否跳转
  @observable changeLoading = false // tab切换
  @observable tabLoading = false // tab切换
  @observable allTagLoading = false // tab切换
  @observable isFirst = true // 是否第一页
  @observable isLast = false // 是否最后一页
  @observable mainKey // 主标签key
  @observable unitList = [] // 个体列表
  @observable searchList = [] // 搜索条件列表
  @observable firstEntry // 默认选中第一个实体
  @observable searchForm // 搜索表单
  @observable searchValue // 搜索表单值
  @observable currentPage = 1 // 页数

  @observable entityList = [] // 实体option列表
  @observable basicLabel = [] // 基本特征
  @observable tooltipTitle = [] // 单个标签分析提示
  @observable itemLabels = [] // 单个标签
  @observable domList = [] // 全部标签dom列表
  @observable tooltipX = '' // 单个标签分析提示x
  @observable tooltipY = 0 // 单个标签分析提示y2

  @observable markedFeature = []// 显著特征
  @observable statistics = [] // 显著特征分析(百分比)

  @observable labelRes = []

  @action resetValue() {
    this.searchList = []
    this.unitList = []
  }

  // 获取实体列表
  @action async getEntityList(params) {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.entityList = res || []

        if (this.entityList.find(item => item.objId === +params.objId)) {
          if (params && params.objId) {
            this.mainLabel = params.mainLabel
            this.objId = params.objId.toString()
            this.getAnalysis()
            this.getLabel()
            this.getAllTags()
          }
        } else {
          this.objId = res[0] ? res[0].objId.toString() : undefined
        }
        this.getSearchList()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取搜索条件
  @action async getSearchList() {
    if (!this.objId) return
    try {
      const res = await io.getSearchList({
        id: this.objId,
        projectId: this.projectId,
      })
      runInAction(() => {
        this.searchList = res || []
        this.searchForm && this.searchForm.setFieldsValue({tagId: res[0] ? res[0].tagId.toString() : undefined})
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @observable mainTagName = '' // 主标签值
  // 判断主标签值是否重复
  @action mainRepeat(res, name) {
    this.mainTagName = ''
    for (let i = 0; i < res.length - 1; i++) {
      for (let j = i + 1; j < res.length; j++) {
        if (res[i][name] === res[j][name]) {
          this.mainTagName = res[i][name]
          return true
        }
      }
    }
    return false
  }

  // 获取个体列表
  @action async getPageList() {
    this.tabLoading = true
    try {
      const res = await io.getPageList({
        projectId: this.projectId,
        currentPage: this.currentPage,
        pageSize: 10,
        ...this.searchValue,
      })
      runInAction(() => {
        const {data = []} = res

        if (this.mainRepeat(data, res.mainTag)) return errorTip(`个体主标签值${this.mainTagName}重复！`)

        if (data.length === 0 && this.isFirst) return message.warning('暂无数据！')
        if (data.length === 0) {
          this.isLast = true
          return message.warning('已经到底了！')
        }
        
        if (data.length < 10) this.isLast = true
        if (data.length === 10) this.isLast = false

        this.mainKey = res.mainTag
        this.unitList = data || []
        this.mainLabel = data ? data[0][res.mainTag].toString() : null
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.tabLoading = false
    }
  }

  // 获取全部标签 
  @action async getAllTags() {
    this.allTagLoading = true
    try {
      const res = await io.getAllTags({
        objId: this.objId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      runInAction(() => {
        this.labelRes = res || []
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.allTagLoading = false
    }
  }

  // 获取单个标签分析信息
  @action.bound async tagAnalysis(obj) {
    try {
      const res = await io.tagAnalysis({
        objId: this.objId,
        projectId: this.projectId,
        value: obj.value,
        tagName: obj.tagName,
        fieldName: obj.fieldName,
        fieldType: obj.fieldType,
        valueEncode: obj.valueEncode,
        tagId: obj.tagId,
      })

      runInAction(() => {
        if (obj.value === '' || obj.value === null) {
          this.tooltipX = `${obj.tagName}：-`
        } else {
          this.tooltipX = res.x
        }
        this.tooltipY = res.y2
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取基本+显著特征
  @action async getLabel(cb = d => {}) {
    this.markedLoading = true
    try {
      const res = await io.getLabel({
        objId: this.objId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })
      this.basicRes = res.basic_feature || []

      runInAction(() => {
        // 生成基本特征dom结构
        this.basicLabel = this.basicRes.map(item => {
          return (
            <p className="basicBox">
              <span className="basicName">{`${item.tagName}：`}</span>
              <span>{`${item.value}`}</span>
            </p>
          )
        })

        // 显著特征
        const markedFeature = this.getMarkedFeatureData(res.marked_feature || [])
        this.markedFeature = res.marked_feature
        this.picUrl = res.pic_url

        cb(markedFeature)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.markedLoading = false
      })
    }
  }

  // 特征分析
  @action async getAnalysis() {
    try {
      const res = await io.getAnalysis({
        projectId: this.projectId,
        objId: this.objId,
        personalityUniqueKey: this.mainLabel,
      })

      runInAction(() => {
        this.statistics = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound getMarkedFeatureData(data) {
    if (!data.length) {
      return {
        nodes: [],
        links: [],
      }
    }
    const nodes = []
    const links = []

    data.unshift({
      tagName: '0',
      value: '0',
    }) 

    for (let i = 0; i < data.length; i++) {
      nodes.push({
        id: i,
        name: `${data[i].tagName}:${data[i].value}`,
      })

      if (i) {
        links.push({
          id: i,
          source: i,
          target: 0,
        })
      }
    }

    return {
      nodes,
      links,
    }
  }
}

export default new Store()
