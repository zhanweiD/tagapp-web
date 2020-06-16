import {
  action, runInAction, observable,
} from 'mobx'
import {successTip, errorTip, changeToOptions} from '../../common/util'
import io from './io'

class Store {
  projectId
  @observable cardList = []
  @observable loading = false

  // 初始化
  @observable isInit = true
  @observable visibleInit = false
  @observable storageType = []
  @observable storageList = []
  @observable loadingInit = false

  // 获取数据源类型
  @action async getStorageType() {
    try {
      const res = await io.getStorageType({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.storageType = changeToOptions(res)('name', 'type')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取数据源列表
  @action async getStorageList(params) {
    try {
      const res = await io.getStorageList({
        projectId: this.projectId,
        ...params,
      })
      runInAction(() => {
        this.storageList = changeToOptions(res)('storageName', 'storageId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 初始化查询
  @action async initSearch(params) {
    this.loadingInit = true
    try {
      await io.initSearch({
        projectId: this.projectId,
        ...params,
      })
      runInAction(() => {
        successTip('初始化成功')
        this.isInit = true
        this.visibleInit = false
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.loadingInit = false
    }
  }
}

export default new Store()
