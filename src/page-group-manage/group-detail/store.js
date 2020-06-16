import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

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
  @observable visible = false // 新建API
  @observable apiGroupList = [] // 新建API分组列表
  @observable currentKey = 1 // tabs显示
  @observable modeType = 1 // 1 规则离线 2 规则实时 3 ID集合
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
      id: 1,
      descr: 'test',
      lastCount: 123,
      lastTime: 1590560398000,
    },
  ]
  @action async get() {
    try {
      // const res = await io.get()
      runInAction(() => {
       
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取群体详情
  @action async getDetail() {
    try {
      const res = await io.getDetail({
        id: this.id,
      })
    } catch (e) {
      // ErrorEater(e, '校验失败')
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
