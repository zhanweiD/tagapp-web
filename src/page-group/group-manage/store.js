import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {Select} from 'antd'
import {errorTip, changeToOptions, successTip} from '../../common/util'
import {ListContentStore} from '../../component/list-content'
import io from './io'

const {Option} = Select
class Store extends ListContentStore(io.getGroupList) {
  // example
  @observable projectId = 0 // 项目id
  @observable objId = 0 // 实体id
  @observable mode = 0 // 创建方式
  @observable type = 0 // 群体类型
  @observable isCreate = 0 // 是否选中创建群体方式

  @observable searchParams = [] // 搜索内容
  @observable recordObj = {} // 当前编辑群体 无输出标签信息
  @observable nowGroup = {} // 当前编辑群体 有输出标签信息
  @observable list = [] // 群体表格数组
  @observable fileRes = '' // 上传的文件返回数据
  @observable uploadList = [] // 上传文件列表
  @observable entityList = [] // 实体列表
  @observable entityOptions = [] // 实体option列表
  @observable tagOptions = [] // 标签option列表

  @observable uploadData = false // 是否有上传文件
  @observable visible = false // 新建群体
  @observable drawerVisible = false // id新建群体
  @observable modalVisible = false // 文件解析结果
  @observable isAdd = true // 判断编辑还是新建
  @observable isPerform = false // id集合执行
  @observable tableLoading = true // 表格数据加载
  @observable confirmLoading = false // 确认按钮loading
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }

  @action handleCancel = () => {
    this.drawerVisible = false
    this.isPerform = false
    this.recordObj = {}
    this.nowGroup = {}
    this.objId = 0
    this.uploadList = []
    this.uploadData = false
    this.confirmLoading = false
  }

  // 获取群体分页列表
  @action async getGroupList() {
    try {
      const res = await io.getGroupList({
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
        this.entityOptions = res.map(item => {
          return (<Option key={item.objId}>{item.objName}</Option>)
        })
        this.entityList = changeToOptions(toJS(res || []))('objName', 'objId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  // 获取标签列表
  @action async getTagList() {
    try {
      const res = await io.getTagList({
        projectId: this.projectId,
        objId: this.objId || this.recordObj.objId,
      })
      runInAction(() => {
        this.tagOptions = res.map(item => {
          return (<Option key={item.tagId}>{item.tagName}</Option>)
        })
        // if (!this.isAdd) {
        //   this.getEditIdGroup()
        // }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加群体
  @action async addGroup(obj) {
    try {
      const res = await io.addGroup({
        ...obj,
        projectId: this.projectId,
      })
      runInAction(() => {
        successTip('添加成功')
        this.handleCancel()
        this.getGroupList()
      })
    } catch (e) {
      this.confirmLoading = false
      errorTip(e.message)
    }
  }

  // 添加id群体
  @action async addIdGroup(obj) {
    try {
      const res = await io.addIdGroup({
        ...obj,
        projectId: this.projectId,
      })
      runInAction(() => {
        successTip('添加成功')
        this.handleCancel()
        this.getGroupList()
      })
    } catch (e) {
      this.confirmLoading = false
      errorTip(e.message)
    }
  }
  
  // 编辑id群体
  @action async editIdGroup(obj) {
    try {
      const res = await io.editIdGroup({
        id: this.recordObj.id, // 群体ID
        ...obj,
        projectId: this.projectId,
      })
      runInAction(() => {
        successTip('编辑成功')
        this.handleCancel()
        this.getGroupList()
      })
    } catch (e) {
      this.confirmLoading = false
      errorTip(e.message)
    }
  }

  // 获取ID编辑群体信息
  @action async getEditIdGroup(cb) {
    try {
      const res = await io.getEditIdGroup({
        id: this.recordObj.id, // 群体ID
        projectId: this.projectId,
      })
      runInAction(() => {
        res.outputTags = res.outputTags.split(',')
        cb(res.outputTags)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 删除群体
  @action async removeGroup(id) {
    try {
      const res = await io.removeGroup({
        id, // 群体ID
        projectId: this.projectId,
      })
      runInAction(() => {
        successTip('删除成功')
        this.getGroupList()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  // 规则实时执行
  @action async performGroup(id) {
    try {
      const res = await io.performGroup({
        id, // 群体ID
        projectId: this.projectId,
      })
      runInAction(() => {
        successTip('正在执行')
        this.getGroupList()
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async recheckName(name, callback) {
    try {
      const res = await io.recheckName({
        projectId: this.projectId,
        objId: this.objId,
        name,
      })
      runInAction(() => {
        if (res.isExist) {
          callback('群体名称重复')
        } else {
          callback()
        }
      })
    } catch (error) {
      errorTip(error)
    }
  }
}

export default new Store()
