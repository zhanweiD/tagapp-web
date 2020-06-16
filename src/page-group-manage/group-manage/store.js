import {
  action, runInAction, observable,
} from 'mobx'
import {Select} from 'antd'
import {errorTip} from '../../common/util'
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
  @action async getEntityList() {
    try {
      const res = await io.getEntityList()
      runInAction(() => {
        this.entityList = res.map(item => {
          return (<Option value={item.objId}>{item.objName}</Option>)
        })
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
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
