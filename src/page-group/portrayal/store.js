import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {Select, Button, Tooltip, Progress} from 'antd'
import {TagFilled} from '@ant-design/icons'
import {
  errorTip, trimFormValues,
} from '../../common/util'
import io from './io'

const {Option} = Select
class Store {
  @observable objId = undefined // 当前实体id
  @observable projectId = null // 项目id
  @observable mainLabel = '' // 实体主标签

  @observable allLabelsLoading = true // 加载全部标签

  @observable entityList = [] // 实体option列表
  @observable basicLabel = [] // 基本特征
  @observable allLabels = [] // 全部标签
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
        if (res.length === 0) return
        this.objId = res[0] && res[0].objId.toString()
        this.entityList = res
        // this.entityList = res.map(item => {
        //   return (<Option key={item.objId}>{item.objName}</Option>)
        // })
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
        this.allLabelsLoading = false
      })
    } catch (e) {
      this.allLabelsLoading = false
      errorTip(e.message)
    }
  }

  // 获取单个标签分析信息
  @action async tagAnalysis(obj) {
    try {
      const res = await io.tagAnalysis({
        objId: this.objId,
        projectId: this.projectId,
        value: obj.value,
        tagName: obj.tagName,
        fieldName: obj.fieldName,
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
  @action async getLabel() {
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
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @observable markedLoading = false

  // 显著特征
  @action async getMarkedFeature(cb) {
    this.markedLoading = true
    try {
      const res = await io.getLabel({
        objId: this.objId,
        projectId: this.projectId,
        personalityUniqueKey: this.mainLabel,
      })

      runInAction(() => {
        // 显著特征
        const markedFeature = this.getMarkedFeatureData(res.marked_feature || [])
        this.markedFeature = res.marked_feature
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
