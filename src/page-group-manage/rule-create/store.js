import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {Select} from 'antd'
import {errorTip, changeToOptions} from '../../common/util'
import {ListContentStore} from '../../component/list-content'
import io from './io'

const {Option} = Select
class Store {
  // example
  @observable current = 0 // 步骤条
  @observable createId = 0 // 如何创建群体 1 规则离线 2 规则实时 3 id集合
  @observable modalVisible = false // 创建结束弹窗
  @observable recordObj = {} // 当前编辑群体
  @observable oneForm = {} // 第一步表单
  @observable threeForm = {} // 第三步表单
  @observable outputLabels = [] // 输出标签集合
  @observable type = 0 // 群体类型
  @observable projectId = 0 // 项目ID
  @observable id = 0 // 群体ID
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
  @action async checkName(params, callbak) {
    try {
      const res = await io.checkName(params)
      if (res.isExit) {
        callbak('群体名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }

  // 重命名标识校验
  @action async checkLog(params, callbak) {
    try {
      const res = await io.checkLog(params)
      if (res.isExit) {
        callbak('群体标识已存在')
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
