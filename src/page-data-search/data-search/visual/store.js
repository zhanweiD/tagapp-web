import {
  action, runInAction, observable,
} from 'mobx'
import {successTip, errorTip, listToTree} from '../../../common/util'
import io from './io'

class Store {
  projectId
  @observable visibleSave = false
  @observable visibleApi = false
  @observable modalSaveLoading = false
  @observable modalApiLoading = false

  @observable outConfig = [] // 输出设置
  @observable screenConfig = [] // 筛选设置

  // 标签树 & 对象
  @observable tagTreeData = [] // 标签树
  @observable objList = [] // 对象下拉列表
  @observable objId // 对象Id

  @action async getTagTree(params) {
    try {
      const res = await io.getTagTree({
        projectId: this.projectId,
        ...params,
      })
      runInAction(() => {
        this.tagTreeData = listToTree(res)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async getObjList() {
    try {
      const res = await io.getObjList({
        projectId: this.projectId,
      })
      runInAction(() => {
        if (res.length) {
          const objId = res[0].id
          this.objId = objId
          this.getTagTree({id: objId})
        }
        this.objList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
