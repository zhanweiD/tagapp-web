import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, changeToOptions} from '../../common/util'
import io from './io'

class Store {
  projectId
  type

  @observable groupId

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
  @observable posList
  @observable wherePosMap = {}
  @observable whereMap = {}

  // 第三步
  @observable outputTags = []

  // 编辑
  @observable detail = {}
  @observable detailLoading = false

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
      const logicExper = {
        ...toJS(this.logicExper),
        posList: JSON.stringify(toJS(this.posList)),
      }
      const res = await io.addGroup({
        mode: 1,
        type: +this.type,
        projectId: this.projectId,
        logicExper: JSON.stringify(logicExper),
        ...toJS(this.oneForm),
        ...params,
      })

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

  // 编辑群体详情信息
  @action async getDetail(id) {
    try {
      const res = await io.getDetail({
        projectId: this.projectId,
        id, 
      })

      runInAction(() => {
        this.objId = res.objId
        this.posList = JSON.parse(res.logicExper.posList)

        this.wherePosMap = this.posList.wherePosMap // 回显
        this.whereMap = this.posList.whereMap // 添加

        this.getConfigTagList()
        this.getRelList()
        this.detail = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 编辑群体
  @action async editGroup(params, cb) {
    try {
      const logicExper = {
        ...toJS(this.logicExper),
        posList: JSON.stringify(toJS(this.posList)),
      }
      const res = await io.editGroup({
        id: +this.grouoId,
        mode: 1,
        type: +this.type,
        projectId: this.projectId,
        logicExper: JSON.stringify(logicExper),
        ...toJS(this.oneForm),
        ...params,
      })

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

  // 重命名校验
  @action async checkName(params, callbak) {
    try {
      const res = await io.checkName({
        projectId: this.projectId,
        ...params,
      })
      if (res.isExit) {
        callbak('群体名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 重命名标识校验
  @action async checkLog(params, callbak) {
    try {
      const res = await io.checkLog({
        projectId: this.projectId,
        ...params,
      })
      if (res.isExit) {
        callbak('群体标识已存在')
      } else {
        callbak()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取对象对应已同步的标签列表
  @action async getConfigTagList() {
    try {
      const res = await io.getConfigTagList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
      })

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
      const res = await io.getRelList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
      })

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
      const res = await io.getRelList({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
      })

      runInAction(() => {
        this.otherEntity = [res]
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

    // 获取输出标签
    @action async getOutputTags() {
    try {
      const res = await io.getOutputTags({
        objId: this.objId, // 实体ID
        projectId: this.projectId,
      })

      runInAction(() => {
        this.outputTags = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @action.bound destroy() {
      if (this.groupId) {
        this.detail = {}
      }

      this.current = 0
      this.oneForm = {}
      this.threeForm = {}
      this.submitLoading = false

      this.entityList.clear()
      this.configTagList.clear()
      this.entityList.clear()

      this.logicExper = {}
      this.posList = {}
      this.whereMap = {}
      this.wherePosMap = {}
    }
}

export default new Store()
