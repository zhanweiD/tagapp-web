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
  @observable dataStorageId = '' // 配置页面数据源id
  @observable dataStorageTypeID = '' // 配置页面数据源类型id
  @observable detail = {} // 编辑展示信息
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

  @action.bound closeModal() {
    this.dataSource.clear()
    // this.dataEnginesSource.clear()
    // this.dataGroupData.clear()
    // this.detail = {}
  }


  // 初始化云资源
  @action async groupInit(data) {
    try {
      const res = await io.groupInit({
        tenantId: global.tenantId,
        userId: global.userId,
        dataStorageId: data.storageId,
        dataStorageType: data.type,
      })
      runInAction(() => {
        // this.initVisible = res.dataStorageType ? false : true
        this.dataSourceInit = res.dataStorageId
        this.dataTypeSourceInit = res.dataStorageTypeName
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  // 获取云资源信息
  @action async getPortrayal() {
    try {
      const res = await io.getPortrayal()
      runInAction(() => {
        // this.initVisible = res.dataStorageType ? false : true
        this.dataSourceInit = res.dataStorageId
        this.dataTypeSourceInit = res.dataStorageTypeName
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取实体分页列表
  @action async getEntityPage() {
    try {
      // const res = await io.getEntityPage({
      //   currentPage: 1,
      //   pageSize: 10,
      // })
      runInAction(() => {
        // this.list = res.data
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取实体列表
  @action async getGroupList() {
    try {
      // const res = await io.getGroupList({
      //   currentPage: 1,
      //   pageSize: 10,
      // })
      runInAction(() => {
        // this.list = res.data
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取标签列表
  @action async getTagList() {
    try {
      // const res = await io.getTagList({
      //   currentPage: 1,
      //   pageSize: 10,
      // })
      runInAction(() => {
        // this.list = res.data
      })
    } catch (e) {
      errorTip(e.message)
    }
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

  @action async getEntityInfo(id) {
    try {
      // await io.getEntityInfo({
      //   id,
      // })
    } catch (e) {
      errorTip(e.message)
    }
  }
  @action async addList(data, cb) {
    try {
      // await io.addList({...data})
      runInAction(() => {
        successTip('添加成功')
        this.getList({currentPage: 1})
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action async editList(data, cb) {
    try {
      // await io.editList({
      //   "tenantId": 512635,
      //   "userId": 243724,
      //   "proejctId": 1234,
      //   "objId": 123,
      //   "basicFeatureTag": "213,231",
      //   "markedFeatureTag": "234,441",
      //   "picture": "base64"
      // })
      runInAction(() => {
        successTip('编辑成功')
        this.getList({currentPage: 1})
        cb()
      })
    } catch (e) {
      errorTip(e.message)
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
