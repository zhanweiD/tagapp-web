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
  @observable dataSource = [
    {
      value: '1583289421353fdnk',
      name: 'testdatasource',
    },
    {
      value: '15839289253985ouc',
      name: '1234',
    },
  ] // 数据源 
  @observable dataTypeSource = [
    {
      value: 1,
      name: 'Mysql',
    },
    {
      value: 2,
      name: 'Oracle',
    },
    {
      value: 11,
      name: 'PostgreSQL',
    },
    {
      value: 10,
      name: 'Greenplum',
    },
    {
      value: 4,
      name: 'Hive',
    },
  ] // 数据源类型
  @observable dataStorageId = 1 // 配置页面数据源id
  @observable dataStorageName = 'test' // 配置页面数据源id
  @observable dataStorageTypeId = '1583289421353fdnk' // 配置页面数据源类型id
  @observable dataStorageTypeName = 'MySQL' // 配置页面数据源类型id
  @observable projectId = 0 // 项目ID
  @observable objId = 0 // 实体ID
  @observable entityList = [] // 实体列表
  @observable tagList = [] // 标签列表
  @observable detail = {} // 编辑展示信息
  @observable visible = false // 控制配置弹窗
  @observable entityVisible = false // 控制实体弹窗
  @observable initVisible = true // 初始化页面是否显示
  @observable uploadLoading = false // 图片上传
  @observable selectLoading = false // 下拉框加载
  @observable confirmLoading = false
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable list = [
    {
      objId: 7025450323959360,
      objName: '实体',
      objDescr: null,
      basicFeatureTag: '6873122232241152',
      markedFeatureTag: '7025450326318656,7025602576644544',
      addTime: 1590486038000,
      picture: 'base64up',
      isUsed: 1,
    },
  ]

  // 初始化云资源
  @action async groupInit(data) {
    try {
      const res = await io.groupInit({
        projectId: this.projectId,
        dataStorageId: data.storageId,
        dataStorageType: data.type,
      })
      runInAction(() => {
        this.getPortrayal()
        this.dataStorageName = res.dataStorageName
        this.dataStorageTypeName = res.dataStorageTypeName
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  // 获取云资源信息
  @action async getPortrayal() {
    try {
      const res = await io.getPortrayal({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.initVisible = !res.dataStorageType
        this.dataStorageId = res.dataStorageId
        this.dataStorageName = res.dataStorageName
        this.dataStorageTypeId = res.dataStorageType
        this.dataStorageTypeName = res.dataStorageTypeName
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取实体分页列表
  @action async getEntityPage() {
    try {
      const res = await io.getEntityPage({
        projectId: this.projectId,
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
        objId: this.objId,
        projectId: this.proejctId,
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
      const res = await io.getDataTypeSource({
        projectId: this.projectId,
        tenantId: 1,
        userId: 1,
      })
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
  @action async getDataSource(dataStorageType) {
    this.selectLoading = true
    try {
      const res = await io.getDataSource({
        projectId: this.projectId,
        dataStorageType,
      })
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
  @action async getEntityInfo(objId) {
    try {
      const res = await io.getEntityInfo({
        objId,
        projectId: this.projectId,
      })
      runInAction(() => {
        this.store.detail = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加实体
  @action async addEntity(data, cb) {
    try {
      await io.addEntity({
        ...data,
        projectId: this.projectId,
        dataStorageId: this.dataStorageId,
        dataStorageType: this.dataStorageTypeId,
      })
      runInAction(() => {
        successTip('添加成功')
        this.getEntityPage()
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 编辑实体
  @action async editEntity(data, cb) {
    try {
      await io.editEntity({
        proejctId: this.projectId,
        ...data,
      })
      runInAction(() => {
        successTip('编辑成功')
        this.getEntityPage()
        cb()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 删除实体
  @action async delEntity(id) {
    try {
      await io.delEntity({id})
      runInAction(() => {
        successTip('删除成功')
        this.getEntityPage()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
