import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

class Store {
  @observable visible = false // 保存群体窗口
  @observable id = 0 // 群体ID
  @observable projectId = 0 // 项目ID
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
      mode: 1,
      descr: 'test',
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

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList()
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async groupCheckName(params, callbak) {
    try {
      const res = await io.groupCheckName(params)
      if (res.isExit) {
        callbak('项目名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }
}

export default new Store()
