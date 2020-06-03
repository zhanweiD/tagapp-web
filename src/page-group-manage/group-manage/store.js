import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

class Store {
  // example
  @observable cUser = [] // 项目所有者 
  @observable searchParams = [] // 搜索内容
  @observable visible = false // 新建群体
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable list = [
    {
      name: "testgrouop",
      enName: "group",
      objId: 7025450323959360,
      objName: "实体",
      type: 1,      
      status: 1,
      mode: 1,
      descr: "test",
      lastCount: 123,
      lastTime: 1590560398000,
    },
  ]
  @action async get() {
    try {
      const res = await io.get()
      runInAction(() => {
       
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
