import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, successTip, changeToOptions} from '../../common/util'
import io from './io'

class Store {
  @observable id = 0 // 群体ID
  @observable objId = 0 // 实体ID
  @observable visible = false // 新建API
  @observable tableLoading = true // 列表
  
  @observable apiGroupList = [] // 新建API分组列表
  @observable groupDetial = {} // 群体详情
  @observable barList =[] // 群体详情柱状图
  @observable list = [] // 群体详情列表
  @observable barDataX = [] // 群体详情柱状图横坐标
  @observable barDataY = [] // 群体详情柱图纵坐标
  @observable modeType = -1 // 1 规则离线 2 规则实时 0 ID集合离线
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }

  // 获取群体详情
  @action async getDetail() {
    try {
      const res = await io.getDetail({
        id: this.id,
      })
      runInAction(() => {
        this.groupDetial = res
        this.modeType = res.mode === 2 ? 0 : res.type
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
      this.barDataX = []
      this.barDataY = []
      runInAction(() => {
        res.forEach(item => {
          this.barDataX.push(item.x)
          this.barDataY.push(item.y)
        })
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
        this.tableLoading = false
      })
    } catch (e) {
      this.tableLoading = false
      errorTip(e.message)
    }
  }

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList()
      runInAction(() => {
        if (res) {
          successTip('导出成功')
        }
      })
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

  // 获取api列表
  @action async getApiList() {
    try {
      const res = await io.getApiList({
        id: this.id,
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
      })
      runInAction(() => {
        this.list = res.data || []
        this.tableLoading = false
      })
    } catch (e) {
      this.tableLoading = false
      errorTip(e.message)
    }
  }

  // 获取api分组
  @action async getApiGroup() {
    try {
      const res = await io.getApiGroup({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.apiGroupList = changeToOptions(toJS(res || []))('groupName', 'apiGroupId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 创建api
  @action async createApi(params) {
    try {
      const res = await io.createApi({
        projectId: this.projectId,
        id: this.id,
        ...params,
      })
      runInAction(() => {
        if (res) {
          successTip('创建成功')
          this.visible = false
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取标签列表
  @action.bound async getTagList() {
    try {
      const res = await io.getTagList({
        objId: this.objId,
        projectId: this.projectId,
      })
      runInAction(() => {
        this.tagList = changeToOptions(toJS(res || []))('tagName', 'tagId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
