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
  @observable cUser = [] // 项目所有者 
  @observable searchParams = [] // 搜索内容
  @observable visible = false // 新建群体
  @observable drawerVisible = false // id新建群体
  @observable modalVisible = false // 文件解析结果
  @observable createId = 0 // 如何创建群体 1 规则离线 2 规则实时 3 id集合
  @observable recordObj = {} // 当前编辑群体
  @observable uploadList = [] // 上传文件列表
  @observable entityList = [] // 实体列表
  @observable mode = 0 // 创建方式
  @observable type = 0 // 群体类型
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable list = [
    {
      name: 'testgrouop',
      enName: 'group',
      objId: 7025450323959360,
      objName: '实体',
      type: 1,      
      status: 1,
      mode: 2,
      descr: 'test',
      lastCount: 123,
      lastTime: 1590560398000,
    },
  ]

  // 获取群体分页列表
  @action async getGroupList() {
    try {
      const res = await io.getGroupList()
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
        projectId: window.projectId,
      })
      runInAction(() => {
        this.entityList = changeToOptions(toJS(res || []))('objName', 'objId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加群体
  @action async addGroup(obj, objId) {
    try {
      const res = await io.addGroup({
        ...this.oneForm,
        ...this.threeForm,
        objId, // 实体ID
        ...obj,
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  
  // 编辑群体
  @action async editGroup(obj, objId) {
    try {
      const res = await io.editGroup({
        objId, // 实体ID
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
        name,
      })
      runInAction(() => {
        if (res) {
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
