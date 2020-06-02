import {
  observable, action, runInAction, toJS,
} from 'mobx'
import {
  successTip, errorTip, changeToOptions, trimFormValues,
} from '../../common/util'
import io from './io'

class Store {
  @observable dataSource = [] // 数据源 
  @observable dataTypeSource = [] // 数据源类型 
  @observable visible = false // 控制弹窗
  @observable selectLoading = false
  @observable confirmLoading = false
  // example
  @action async get() {
    try {
      const res = await io.get()
      runInAction(() => {
       
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound closeModal() {
    this.dataSource.clear()
    // this.dataEnginesSource.clear()
    // this.dataGroupData.clear()
    // this.detail = {}
  }

  @action async getDataTypeSource() {
    this.selectLoading = true
    try {
      const res = await io.getDataTypeSource()
      runInAction(() => {
        if (res) {
          this.dataTypeSource = changeToOptions(toJS(res || []))('name', 'type')
        }
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.selectLoading = false
      })
    }
  }
  @action async getDataSource() {
    this.selectLoading = true
    try {
      const res = await io.getDataSource()
      runInAction(() => {
        if (res) {
          this.dataSource = changeToOptions(toJS(res || []))('storageName', 'storageId')
        }
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.selectLoading = false
      })
    }
  }
}

export default new Store()
