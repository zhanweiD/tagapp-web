import {
  action, runInAction, observable,
} from 'mobx'
import {successTip, errorTip, listToTree, failureTip} from '../../../common/util'
import io from './io'

class Store {
  projectId

  // 输出设置
  @observable outConfig = [{
    aggregateType: 0, 
    alias: '1', 
    conditionUnit: {
      function: '标签值', 
      params: ['7195132603422976.7195138167822592'],
    }},
  ] // 输出设置配置信息

  @observable expressionTag = [] // 表达式标签

  // 筛选设置
  @observable screenConfig = [] // 筛选设置配置信息

  // 保存查询
  @observable visibleSave = false
  @observable saveParams = {} // 用于保存的参数
  @observable modalSaveLoading = false // 保存按钮loading

  // 生成API
  @observable visibleApi = false
  @observable modalApiLoading = false
  @observable apiParamsInfo = {}

  // 标签树 & 对象
  @observable treeLoading = false
  @observable tagTreeData = [] // 标签树
  @observable objList = [] // 对象下拉列表
  @observable objId // 对象Id

  // 查询结果
  @observable showResult = false
  @observable resultInfo = {}
  @observable resultLoading = false

  // 生成api 
  getApiParams

  // 获取标签树
  @action async getTagTree(params) {
    this.treeLoading = true

    try {
      const res = await io.getTagTree({
        projectId: this.projectId,
        ...params,
      })
      runInAction(() => {
        this.tagTreeData = listToTree(res)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.treeLoading = false
    }
  }

  // 获取对象下拉
  @action async getObjList() {
    try {
      const res = await io.getObjList({
        projectId: this.projectId,
      })
      runInAction(() => {
        if (res.length) {
          const objId = res[0].id
          this.objId = objId
          this.getTagTree({id: objId})
          this.getExpressionTag({id: objId})
        }
        this.objList = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取表达式标签
  @action async getExpressionTag(params) {
    try {
      const res = await io.getExpressionTag({
        projectId: this.projectId,
        ...params,
      })
      runInAction(() => {
        this.expressionTag = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 运行查询
  @action async runSearch(params) {
    this.resultLoading = true
    try {
      const res = await io.runSearch({
        projectId: this.projectId,
        objId: this.objId,
        runType: 1,
        ...params,
      })

      runInAction(() => {
        console.log(res)
        this.resultInfo = res
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.resultLoading = false
    }
  }

  // 保存数据查询 
  @action async saveSearch(params, cb) {
    try {
      const res = await io.saveSearch({
        projectId: this.projectId,
        objId: this.objId,
        runType: 1,
        ...params,
      })
      runInAction(() => {
        if (res && cb) {
          cb()
          successTip('保存成功')
        } else {
          failureTip('保存失败')
        }
      })
    } catch (e) {
      errorTip(e.message)
    } 
  }

  // 名称校验
  @action async checkName(params, cb) {
    try {
      const res = await io.checkName({
        projectId: this.projectId,
        ...params,
      })
      if (res.isExist) {
        cb('名称已存在')
      } else {
        cb()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取api请求返回参数
  @action async getApiParams(params, cb) {
    try {
      const res = await io.getApiParams({
        projectId: this.projectId,
        objId: this.objId,
        ...params,
      })
      const res1 = {
        filedList: [
          {
            fieldName: 'id',
            fieldType: 'java.lang.Long',
          },
          {
            fieldName: 'api_id',
            fieldType: 'java.lang.String',
          },
          {
            fieldName: 'api_path',
            fieldType: 'java.lang.String',
          },
          {
            fieldName: 'tenant_id',
            fieldType: 'java.lang.Long',
          },
        ],
        varList: [
          {
            fieldName: 'id',
            fieldType: 'long',
          },
          {
            fieldName: 'apiId',
            fieldType: 'string',
          },
        ],
        sql: 'select * from table1',
      }

      runInAction(() => {
        this.apiParamsInfo = res1
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
