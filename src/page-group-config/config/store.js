import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {
  successTip, errorTip, changeToOptions, trimFormValues,
} from '../../common/util'
import io from './io'

class Store {
  @observable dataSource = [] // 数据源 
  @observable dataTypeSource = [] // 数据源类型 
  @observable visible = false // 控制配置弹窗
  @observable entityVisible = false // 控制实体弹窗
  @observable initVisible = true // 初始化页面是否显示
  @observable uploadLoading = false // 图片上传
  @observable selectLoading = false 
  @observable confirmLoading = false
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable list = [
    {
      objId: 7025450323959360,
      objName: "实体",
      objDescr: null,
      basicFeatureTag: "6873122232241152",
      markedFeatureTag: "7025450326318656,7025602576644544",
      addTime: 1590486038000,
      picture: "base64up",
      isUsed: 0,
    },
  ]
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

  @action async delList(id) {
    try {
      // await io.delList({id})
      runInAction(() => {
        successTip('删除成功')
        this.getList({currentPage: 1})
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
