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
  @observable dataStorageId = 0 // 配置页面数据源id
  @observable dataStorageName = '' // 配置页面数据源id
  @observable dataStorageTypeId = '' // 配置页面数据源类型id
  @observable dataStorageTypeName = '' // 配置页面数据源类型id
  @observable projectId = 0 // 项目ID
  @observable objId = 0 // 实体ID

  @observable dataSource = [] // 数据源 
  @observable dataTypeSource = [] // 数据源类型
  @observable entityList = [] // 实体列表
  @observable list = [] // 实体表格数组
  @observable tagList = [] // 标签列表
  @observable detail = {} // 编辑展示信息
  @observable imageUrl = null // 图片上传数组

  @observable visible = false // 控制配置弹窗
  @observable confirmLoading = false // 确认按钮loading
  @observable entityVisible = false // 控制实体弹窗
  @observable initVisible = true // 初始化页面是否显示
  @observable uploadLoading = false // 图片上传
  @observable selectLoading = false // 下拉框加载
  @observable tableLoading = true
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }

  // 重置
  @action modalCancel = () => {
    this.entityVisible = false
    this.uploadLoading = false
    this.confirmLoading = false
    this.imageUrl = null
    this.detail = {}
  }

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
        // this.dataStorageName = res.dataStorageName
        // this.dataStorageTypeName = res.dataStorageTypeName
        this.confirmLoading = false
        this.initVisible = false
        this.visible = false
      })
    } catch (e) {
      errorTip(e.message)
      this.confirmLoading = false
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
        this.tableLoading = false
      })
    } catch (e) {
      errorTip(e.message)
      this.tableLoading = false
    }
  }

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })

      runInAction(() => {
        this.entityList = res.map(item => {
          return (<Option key={item.objId} disabled={item.isUsed}>{item.objName}</Option>)
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取标签列表
  @action.bound async getTagList(objId) {
    try {
      const res = await io.getTagList({
        objId,
        projectId: this.projectId,
      })

      runInAction(() => {
        this.tagList = res.map(item => {
          return (<Option key={item.tagId.toString()}>{item.tagName}</Option>)
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
  @action async getDataSource() {
    this.selectLoading = true
    try {
      const res = await io.getDataSource({
        projectId: this.projectId,
        dataStorageType: this.dataStorageTypeId,
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
        this.imageUrl = res.picture
        res.basicFeatureTag = res.basicFeatureTag.split(',')
        res.markedFeatureTag = res.markedFeatureTag.split(',')
        res.objId = res.objId.toString()
        this.detail = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加实体
  @action async addEntity(data) {
    try {
      await io.addEntity({
        ...data,
        projectId: this.projectId,
        dataStorageId: this.dataStorageId,
        dataStorageType: this.dataStorageTypeId,
      })

      runInAction(() => {
        successTip('添加成功')
        this.modalCancel()
        this.getEntityPage()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 编辑实体
  @action async editEntity(data) {
    try {
      await io.editEntity({
        projectId: this.projectId,
        ...data,
      })

      runInAction(() => {
        successTip('编辑成功')
        this.modalCancel()
        this.getEntityPage()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 删除实体
  @action async delEntity(objId) {
    try {
      await io.delEntity({
        objId,
        projectId: this.projectId,
      })
      
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
