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

  @observable selectTagList = []

  @observable roportion = {}

  @observable info = []

  @observable loading = false

  @action async getAnalyzeTag(cb) {
    try {
      const res = await io.getAnalyzeTag({
        projectId: this.projectId,
        objId: this.objId,
      })

      runInAction(() => {
        res.forEach(item => {
          let groupType = null
          if (item.type === 2) groupType = 3
          if (item.type === 3) groupType = 0
          cb({tagId: item.tagId, type: item.type, groupType})
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async getObj() {
    try {
      const res = await io.getObj({
        projectId: this.projectId,
      })

      runInAction(() => {
        this.objList = res
        // if (res.length) {
        //   this.objId = res[0].objId
        //   this.getGroup({objId: res[0].objId}, cb2)
        //   if (cb1) {
        //     this.getAnalyzeTag(cb1)
        //   }
        // }
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
        // this.groupId = res.length ? res[0].groupId : null
        // if (cb) cb({id: this.groupId})
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
    this.loading = true
    try {
      const res = await io.getRoportion({
        ...params,
        projectId: this.projectId,
      })

      runInAction(() => {
        this.roportion = res
        if (cb && res) {
          cb(res)
        }
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
  
  @action async getChart(params, index) {
    this.loading = true
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
          Comp: params.chartType ? chartMap[params.chartType] : chartMap.bar,
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

        this.modalVis = false
        this.modalEditInfo = {}
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.loading = false
      })
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

    this.objId = undefined
    this.groupId = undefined
    this.groupTime = undefined
    this.roportion = {}
  }
}

export default new Store()
