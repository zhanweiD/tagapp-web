import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

class Store {
  @observable dataSource = [] // 数据源 
  @observable visible = false // 新建API
  @observable apiGroupList = [] // 新建API分组列表
  @observable currentKey = 1 // tabs显示
  @observable groupDetial = {} // 群体详情
  @observable barList =[] // 群体详情柱状图
  @observable list = [] // 群体详情列表
  @observable barDataX = [] // 群体详情柱状图横坐标
  @observable barDataY = [] // 群体详情柱图纵坐标
  @observable modeType = 1 // 1 规则离线 2 规则实时 3 ID集合离线
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable barData = [
    {
      x: '2020-06-12',
      y: 0,
    },
  ]

  // 获取群体详情
  @action async getDetail() {
    try {
      const res = await io.getDetail({
        id: this.id,
      })
      runInAction(() => {
        this.groupDetial = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取群体历史记录柱状图
  @action async getHistoryBar(params, cb) {
    try {
      const res = await io.getHistoryBar({
        id: this.id,
        ...params,
      })
      console.log(res)
      const data = res || []
      runInAction(() => {
        res.forEach(item => {
          this.barDataX.push(item.x)
          this.barDataY.push(item.y)
        })
        console.log(this.barDataX, this.barDataY)
        cb(this.barDataX, this.barDataY)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取群体历史记录列表
  @action async getHistoryList() {
    try {
      const res = await io.getHistoryList({
        id: this.id,
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
      })
      runInAction(() => {
        this.list = res.data
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList()
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async groupCheckName(params, callbak) {
    try {
      const res = await io.groupCheckName(params)
      if (res.isExit) {
        callbak('项目名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }
}

export default new Store()
