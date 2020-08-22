import {
  action, runInAction, observable, toJS
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

import Pie from './pie'
import Bar from './bar'
import AcrossBar from './across-bar'
import Line from './line'
import Loop from './loop'

const chartMap = {
  bar: Bar,
  pie: Pie,
  acrossBar: AcrossBar,
  line: Line,
  loop: Loop,
}

class Store {
  projectId
  @observable objList = []
  @observable groupList = []
  @observable tagList = []

  @observable modalVis = false
  @observable modalEditInfo = {
    type: 'add',
  }

  @observable selectTagList = []

  @observable groupAInfo = {}
  @observable groupBInfo = {}
  @observable overlapCount = 0
  @observable loading = false

  @observable info = []

  @action async getObj() {
    try {
      const res = await io.getObj({
        projectId: this.projectId,
      })

      runInAction(() => {
        this.objList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async getGroup(params) {
    try {
      const res = await io.getGroup({
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.groupList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  
  @action async groupOverlapCount(ids, cb) {
    this.loading = true
    try {
      const res = await io.groupOverlapCount({
        ids,
        projectId: this.projectId,
      })
      runInAction(() => {
        this.overlapCount = res
        cb(res)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  @action async getTags() {
    try {
      const res = await io.getTags({
        projectId: this.projectId,
        objId: this.objId,
      })

      runInAction(() => {
        this.tagList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async getGroupCount(id, type, cb) {
    try {
      const res = await io.getGroupCount({
        id,
        projectId: this.projectId,
      })
      
      runInAction(() => {
        if (type === 'A') {
          this.groupAInfo = {
            groupId: id,
            ...res,
          }
          cb(res)
        }

        if (type === 'B') {
          this.groupBInfo = {
            groupId: id,
            ...res,
          }
          cb(res)
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }


  @action async getChart(params, index) {
    try {
      const ids = [this.groupAInfo.groupId, this.groupBInfo.groupId].join(',')
      const res = await io.getChart({
        runDate: this.groupTime,
        projectId: this.projectId,
        ids,
        ...params,
        chartType: undefined,
      })

      runInAction(() => {
        if (res.xy) {
          const data = {
            ...params,
            ...res,
            groupAname: toJS(this.groupAInfo).groupName,
            groupBname: toJS(this.groupBInfo).groupName,
            Comp: chartMap[params.chartType],
          }
   
          if (this.selectTagList.includes(params.tagId)) {
            this.selectTagList[index] = params.tagId
          } else {
            this.selectTagList.push(params.tagId)
          }
  
          if (typeof index === 'undefined') {
            this.info.push(data)
          } else {
            this.info[index] = data
          }
        }
        
        this.modalVis = false
        this.modalEditInfo = {}
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound delChart(data, index) {
    this.info.splice(index, 1)
    this.selectTagList.splice(index, 1)
  }

  @action.bound editChart(data, index) {
    this.selectTagList[index] = data.tagId
    this.getChart(data, index)
  }

  @action.bound destory() {
    this.objList.clear()
    this.groupList.clear()
    this.tagList.clear()
    this.selectTagList.clear()
    this.info.clear()
    this.loading = false
    this.objId = undefined
    this.groupAInfo = {}
    this.groupBInfo = {}
    this.overlapCount = 0
  }
}

export default new Store()
