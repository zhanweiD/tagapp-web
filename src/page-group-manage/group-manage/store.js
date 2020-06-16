import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {Select} from 'antd'
import {errorTip, changeToOptions} from '../../common/util'
import {ListContentStore} from '../../component/list-content'
import io from './io'

const {Option} = Select
class Store extends ListContentStore(io.getGroupList) {
  // example
  @observable projectId = 0 // 项目id
  @observable objId = 0 // 实体id
  @observable searchParams = [] // 搜索内容
  @observable visible = false // 新建群体
  @observable drawerVisible = false // id新建群体
  @observable modalVisible = false // 文件解析结果
  @observable isCreate = 0 // 是否选中创建群体方式
  @observable recordObj = {} // 当前编辑群体
  @observable list = [] // 群体表格数组
  @observable uploadData = {} // 上传的文件
  @observable uploadList = [] // 上传文件列表
  @observable entityList = [] // 实体列表
  @observable entityOptions = [] // 实体option列表
  @observable tagOptions = [] // 标签option列表
  @observable mode = 0 // 创建方式
  @observable type = 0 // 群体类型
  @observable isAdd = true // 判断编辑还是新建
  @observable tableLoading = false // 表格数据加载
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }

  // 获取群体分页列表
  @action async getGroupList() {
    try {
      this.tableLoading = true
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
        objId: this.objId,
      })
      runInAction(() => {
        this.tagOptions = res.map(item => {
          return (<Option key={item.tagId}>{item.tagName}</Option>)
        })
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
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  
  // 编辑群体
  @action async editGroup(obj) {
    try {
      const res = await io.editGroup({
        id: this.recordObj.id, // 群体ID
        ...obj,
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
