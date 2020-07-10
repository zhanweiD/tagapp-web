import {
  action, runInAction, observable,
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
  @observable objId
  @observable groupId
  @observable groupTime

  @observable modalVis = false
  @observable modalEditInfo = {
    type: 'add',
  }

  @observable chartTypeList = {}

  @observable roportion = {}

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

  @action async getRoportion(params, cb) {
    try {
      const res = await io.getRoportion({
        ...params,
      })

      runInAction(() => {
        this.roportion = res
        if (cb && res) {
          cb(res)
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  
  @action async getChart(params, index) {
    try {
      const res = await io.getChart({
        runDate: this.groupTime,
        projectId: this.projectId,
        id: this.groupId,
        ...params,
        chartType: undefined,
      })

      runInAction(() => {
        const data = {
          ...params,
          ...res,
          Comp: chartMap[params.chartType],
        }
        
        if (this.chartTypeList[params.tagId]) {
          this.chartTypeList[params.tagId].push(params.chartType)
        } else {
          this.chartTypeList[params.tagId] = [params.chartType]
        }

        if (typeof index === 'undefined') {
          this.info.push(data)
        } else {
          this.info[index] = data
        }

        this.modalVis = false
        this.modalEditInfo = {}
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound delChart(data, index) {
    const tagItem = this.chartTypeList[data.tagId]
    
    if (tagItem && tagItem.length === 1) {
      delete this.chartTypeList[data.tagId]
    }
    
    if (tagItem && tagItem.length > 1) {
      const inx = tagItem.indexOf(data.chartType)
      this.chartTypeList[data.tagId].splice(inx, 1)
    }

    this.info.splice(index, 1)
  }

  @action.bound editChart(data, index) {
    const {tagId, chartType} = this.modalEditInfo

    const inx = this.chartTypeList[tagId].indexOf(chartType)

    this.chartTypeList[tagId].splice(inx, 1)
    this.getChart(data, index)
  }
}

export default new Store()
