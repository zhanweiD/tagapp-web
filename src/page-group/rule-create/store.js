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

  // 编辑
  @observable detail = {}
  @observable detailLoading = false

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
      // posList: JSON.stringify(toJS(this.posList)),
      //   ...toJS(this.oneForm),
      //   ...params,
      // })

      console.log({
        mode: 1,
        type: this.type,
        logicExper: toJS(this.logicExper),
        posList: JSON.stringify(toJS(this.posList)),
        ...toJS(this.oneForm),
        ...params,
      })
      // const res = true
      runInAction(() => {
        // cb(res)
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
      // const res = await io.getDetail({
      //   projectId: this.projectId,
      //   id, 
      // })
      const res = {
        id: 7354378376720000,
        name: '群体类12型',
        enName: null,
        objId: 7195132603422976,
        objName: '商品',
        type: null,
        status: null,
        mode: null,
        descr: '描述',
        lastCount: null,
        lastTime: null,
        logicExper: '{"logic":1,"comparisionList":[{"comparision":"=","left":{"function":"标签值","params":["7275282592311424.7275286538299520"]},"right":{"function":"固定值","params":[1]},"where":{"logic":1,"comparisionList":[{"comparision":"=","left":{"function":"标签值","params":["7205390117788992.7205454747884864"]},"right":{"function":"固定值","params":[1]}}],"childList":[{"logic":2,"comparisionList":[{"comparision":"=","left":{"function":"标签值","params":["7205390117788992.7205456285818176"]},"right":{"function":"固定值","params":[1]}},{"comparision":"=","left":{"function":"标签值","params":["7275282592311424.7275282597881984"]},"right":{"function":"固定值","params":[1]}}]}],"x":1,"posInfoList":[]}}],"childList":[{"logic":2,"comparisionList":[{"comparision":"=","left":{"function":"标签值","params":["7195132603422976.7195138167822592"]},"right":{"function":"固定值","params":[1]}},{"comparision":"=","left":{"function":"标签值","params":["7195132603422976.7195140533016832"]},"right":{"function":"固定值","params":[1]}}]}],"x":1,"posInfoList":[]}',
        scheduleType: 1,
        scheduleExpression: '"0 12 7 * * ? *"',
        isStart: 0,
        startTime: 1592179200000,
        endTime: 1592611200000,
        outputTags: '7239942710386048,7240085512411840',
        importKey: null,
        cuserName: null,
        ctime: null,
        posList: '{"wherePosMap":{"0-1-0":{"selfCon":1,"rule":[{"flag":"0","logic":1,"pos":{"0-0":[{"type":2,"flag":"0","level":[0],"x":20,"y":0,"source":null,"target":null,"leftFunction":"标签值","leftTagId":"7205390117788992.7205454747884864","comparision":"=","rightFunction":"固定值","rightParams":"1","logic":1}],"0-1":[{"type":2,"flag":"0","level":[0],"x":20,"y":0,"source":null,"target":null,"relId":7195132603422976,"leftFunction":"标签值","comparision":"=","rightFunction":"固定值","rightParams":"1"}]}}]}},"selfCon":1,"rule":[{"flag":"0","logic":1,"pos":{"0-0":[{"type":2,"flag":"0","level":[0],"x":20,"y":0,"source":null,"target":null,"leftFunction":"标签值","leftTagId":"7205390117788992.7205454747884864","comparision":"=","rightFunction":"固定值","rightParams":"1","logic":1}],"0-1":[{"type":2,"flag":"0","level":[0],"x":20,"y":0,"source":null,"target":null,"relId":7275282592311424,"leftFunction":"标签值","comparision":"=","rightFunction":"固定值","rightParams":"1"}]}}]}',
      }
      runInAction(() => {
        this.objId = res.objId
        this.posList = JSON.parse(res.posList)

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
      // const res = await io.editGroup({
      //  id: +this.grouoId,
      //   mode: 1,
      //   type: +this.type,
      //   logicExper: toJS(logicExper),
      // posList: JSON.stringify(toJS(this.posList)),
      //   ...toJS(this.oneForm),
      //   ...params,
      // })
    // const res = true
      runInAction(() => {
      // cb(res)
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
