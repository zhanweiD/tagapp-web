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

  @observable modalVis = false

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
      // const res1 = await io.getRoportion({
      //   ...params,
      // })

      const res = {
        totalCount: 2121,
        groupCount: 500,
        time: 34214234321432144,
      }

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

  
  @action async getChart(params, cb) {
    try {
      // const res1 = await io.getChart({
      //   ...params,
      // })

      const res = {
        ...params,
        percent: '100%', // 全部占比
        tagId: 7320801126843392, // 标签id
        tagName: '创建时间11', // 标签名称
        xy: [
          {
            y1: 1, // y轴 标签个数
            x: '2020-06-13', // x轴 标签值
            y2: '50.00%', // y轴 标签占比
          },
          {
            y1: 1, // y轴 标签个数
            x: '2020-06-11', // x轴 标签值
            y2: '50.00%', // y轴 标签占比
          },
          {
            y1: 3, // y轴 标签个数
            x: '2020-06-14', // x轴 标签值
            y2: '50.00%', // y轴 标签占比
          },
          {
            y1: 3, // y轴 标签个数
            x: '2020-06-16', // x轴 标签值
            y2: '50.00%', // y轴 标签占比
          },
        ],
        Comp: chartMap[params.chartType],
      }

      runInAction(() => {
        this.info.push(res)
        this.modalVis = false
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
