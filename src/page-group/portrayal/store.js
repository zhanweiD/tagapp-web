import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {
  errorTip, trimFormValues,
} from '../../common/util'
import io from './io'

class Store {
  @observable objId // 当前实体id
  @observable projectId = null // 项目id
  @observable mainLabel = '' // 实体主标签

  @observable prevTag = {} 
  @observable markedLoading = false
  @observable picUrl

  @observable entityList = [] // 实体option列表
  @observable basicLabel = [] // 基本特征
  @observable tooltipTitle = [] // 单个标签分析提示
  @observable itemLabels = [] // 单个标签
  @observable tooltipX = '' // 单个标签分析提示x
  @observable tooltipY = 0 // 单个标签分析提示y2

  @observable markedFeature = []// 显著特征
  @observable statistics = [] // 显著特征分析(百分比)

  @observable labelRes = []

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.entityList = res
        if (res.length === 0 || this.objId) return
        this.objId = res[0] && res[0].objId.toString()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取全部标签 
  @action async getAllTags() {
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
        this.tooltipX = res.x
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
            <p>
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


  // 显著特征
  // @action async getMarkedFeature(cb) {
  //   this.markedLoading = true
  //   try {
  //     const res = await io.getLabel({
  //       objId: this.objId,
  //       projectId: this.projectId,
  //       personalityUniqueKey: this.mainLabel,
  //     })

  //     runInAction(() => {
  //       // 显著特征
  //       const markedFeature = this.getMarkedFeatureData(res.marked_feature || [])
  //       this.markedFeature = res.marked_feature
  //       cb(markedFeature)
  //     })
  //   } catch (e) {
  //     errorTip(e.message)
  //   } finally {
  //     runInAction(() => {
  //       this.markedLoading = false
  //     })
  //   }
  // }

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
