import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {Select} from 'antd'
import {
  successTip, errorTip, changeToOptions, trimFormValues,
} from '../../common/util'
import io from './io'

const {Option} = Select
class Store {
  @observable dataSource = [] // 数据源 
  @observable dataTypeSource = [] // 数据源类型
  @observable dataStorageId = '' // 配置页面数据源id
  @observable dataStorageTypeID = '' // 配置页面数据源类型id
  @observable entityList = [] // 实体列表
  @observable tagList = [] // 标签列表
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
      isUsed: 1,
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
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
      })
      runInAction(() => {
        this.entityList = res.map(item => {
          return (<Option value={item.objId}>{item.objName}</Option>)
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取标签列表
  @action async getTagList() {
    try {
      const res = await io.getTagList({
      })
      runInAction(() => {
        this.TagList = res.map(item => {
          return (<Option value={item.tagId}>{item.tagName}</Option>)
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取数据源类型列表
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

  // 获取数据源列表
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

  // 获取实体信息
  @action async getEntityInfo(id) {
    try {
      // await io.getEntityInfo({
      //   id,
      // })
      // this.store.detail = res
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加实体
  @action async addEntity(data, cb) {
    try {
      // await io.addEntity({...data})
      runInAction(() => {
        successTip('添加成功')
        this.getList({currentPage: 1})
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 编辑实体
  @action async editEntity(data, cb) {
    try {
      // await io.editEntity({
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

  // 删除实体
  @action async delEntity(id) {
    try {
      // await io.delEntity({id})
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
