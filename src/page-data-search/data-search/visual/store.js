import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../../common/util'
import io from './io'

class Store {
  @observable visibleSave = false
  @observable visibleApi = false
  @observable modalSaveLoading = false
  @observable modalApiLoading = false

  @observable outConfig = [] // 输出设置
  @observable screenConfig = [] // 筛选设置

  @observable tagTreeData = [] // 标签树
  @observable objectList = [] // 对象下拉列表

  @action async getTagTree() {
    try {
      const res = await io.getTagTree({})
      runInAction(() => {
        this.tagTreeData = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async getObjectList() {
    try {
      const res = await io.getObjectList()
      runInAction(() => {
        this.objectList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
