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
  // getApiParams

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
      // const res = [
      //   {
      //     objId: 12312312,
      //     objName: 'fsadfa',
      //   },
      // ]
      
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
      // const res = await io.getExpressionTag({
      //   projectId: this.projectId,
      //   ...params,
      // })

      const res = [
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7275282592311424.7275282597881984',
          objNameTagName: '门商.商品编号',
          tagType: 2, // 1: 离散型 2：整数型 3: 小数型 4: 文本型 5: 日期型 6: 多值型
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7275282592311424.7275282601093248',
          objNameTagName: '门商.门店号',
          tagType: 2,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7275282592311424.7275286538299520',
          objNameTagName: '门商.mens',
          tagType: 4,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205390118378816',
          objNameTagName: '门店.门店号',
          tagType: 2,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205454747884864',
          objNameTagName: '门店.门店一号门',
          tagType: 2,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7205390117788992.7205456285818176',
          objNameTagName: '门店.门店二号门',
          tagType: 4,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7195132603422976.7195132607027456',
          objNameTagName: '商品.商品编号',
          tagType: 2,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7195132603422976.7195138167822592',
          objNameTagName: '商品.购买地址',
          tagType: 4,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7195132603422976.7195140533016832',
          objNameTagName: '商品.购买人',
          tagType: 2,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7195132603422976.7320801126843392',
          objNameTagName: '商品.创建时间11',
          tagType: 5,
          configType: null,
        },
        {
          tenantId: null,
          userId: null,
          objIdTagId: '7195132603422976.7320801130644480',
          objNameTagName: '商品.层级',
          tagType: 2,
          configType: null,
        },
      ]
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
