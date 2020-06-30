import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, changeToOptions} from '../../common/util'
import io from './io'

class Store {
  projectId
  type
  groupId

  @observable current = 0 // 步骤条
  // @observable createId = 0 // 如何创建群体 1 规则离线 2 规则实时 3 id集合
  @observable recordObj = {} // 当前编辑群体
  @observable oneForm = {} // 第一步表单
  @observable threeForm = {} // 第三步表单
  @observable submitLoading = false

  // 第一步 设置基础信息
  @observable entityList = []
  @observable objId

  // 第二步 设置群体圈选规则
  @observable configTagList = [] // 对象对应已同步的标签列表
  @observable relList = [] // 对象对应的关系列表
  @observable otherEntity = [] // 另一个实体对象
  @observable logicExper = {}

  // 编辑
  @observable detail = {}

  // @action.bound close() {
  //   this.current = 0
  // }

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList({
        projectId: this.projectId,
      })

      runInAction(() => {
        this.entityList = changeToOptions(toJS(res || []))('objName', 'objId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 添加群体
  @action async addGroup(params, cb) {
    this.submitLoading = true
    try {
      // const res = await io.addGroup({
      //   mode: 1,
      //   type: +this.type,
      //   logicExper: toJS(logicExper),
      //   ...toJS(this.oneForm),
      //   ...params,
      // })

      console.log({
        mode: 1,
        type: this.type,
        logicExper: toJS(this.logicExper),
        ...toJS(this.oneForm),
        ...params,
      })
      const res = true
      runInAction(() => {
        cb(res)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.submitLoading = false
      })
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

  // 获取对象对应已同步的标签列表
  @action async getConfigTagList() {
    try {
      // const res = await io.getConfigTagList({
      //   objId: this.objId, // 实体ID
      //   projectId: this.projectId,
      // })

      const res = [
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205454747884864',
          objNameTagName: '门店.门店一号门',
          tagType: 2,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205456285818176',
          objNameTagName: '门店.门店二号门',
          tagType: 4,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205390118378816',
          objNameTagName: '门店.门店号',
          tagType: 2,
        },
      ]

      runInAction(() => {
        this.configTagList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取对象对应的关系列表
  @action async getRelList() {
    try {
      // const res = await io.getRelList({
      //   objId: this.objId, // 实体ID
      //   projectId: this.projectId,
      // })

      const res = [
        {
          objId: 7275282592311424,
          objName: '门商',
          objDescr: null,
          basicFeatureTag: null,
          markedFeatureTag: null,
          addTime: null,
          picture: null,
          isUsed: null,
        },
      ]

      runInAction(() => {
        this.relList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取另一个实体对象
  @action async getOtherEntity() {
    try {
      // const res = await io.getRelList({
      //   objId: this.objId, // 实体ID
      //   projectId: this.projectId,
      // })

      const res = {
        objId: 7195132603422976,
        objName: '商品11111',
        objDescr: null,
        basicFeatureTag: null,
        markedFeatureTag: null,
        addTime: null,
        picture: null,
        isUsed: null,
      }

      runInAction(() => {
        this.otherEntity = [res]
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
