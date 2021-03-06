import intl from 'react-intl-universal'
import { action, runInAction, observable } from 'mobx'
import {
  successTip,
  errorTip,
  listToTree,
  failureTip,
} from '../../../common/util'
import io from './io'

class Store {
  projectId

  // 输出设置
  @observable outConfig = [] // 输出设置配置信息

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
  // @observable treeLoading = false
  // @observable tagTreeData = [] // 标签树
  @observable treeLoading = false

  @observable searchKey = undefined
  @observable expandAll = false
  @observable treeData = [] // 类目树数据
  @observable searchExpandedKeys = [] // 关键字搜索展开的树节点

  @observable objList = [] // 对象下拉列表
  @observable objId // 对象Id

  // 查询结果
  @observable showResult = false
  @observable resultInfo = {}
  @observable resultLoading = false

  // 获取高度
  @action getHeight = () => {
    this.contentBoxH = $('#visual-content').height() - 66 // 内容总高度（除去操作栏）
    this.configDom = $('#visual-config') // 配置内容

    this.resultDom = $('#search-result') // 运行结果内容

    // 日志高度
    this.resultDomHeight = this.resultDom.height()

    this.configDom.height(this.contentBoxH - this.resultDomHeight)
  }

  beforeLogHeight = 226

  @action.bound handleExpend(flag) {
    this.showResult = flag
    this.configDom.height(this.contentBoxH - this.beforeLogHeight)
    this.beforeLogHeight = this.resultDomHeight

    if (flag) {
      this.resultDom.height(226)
      this.configDom.height(this.contentBoxH - 226)
    } else {
      this.resultDom.height(30)
      this.configDom.height(this.contentBoxH - 30)
    }
  }

  // 日志拖拽
  @action changeHeight = (height, totalHeight) => {
    if (height < 400) return
    if (totalHeight - height < 226) return

    this.resultDomHeight = totalHeight - height
    this.resultDom.height(totalHeight - height)
    this.configDom.height(this.contentBoxH - this.resultDomHeight)
  }

  // 日志的拖拽
  @action onDraggableLogMouseDown = () => {
    if (this.isMinLog) return
    const $body = $('body')
    let dragableCover = $('.dragable_cover')
    if (dragableCover.length > 0) {
      dragableCover.css('display', 'block')
    } else {
      dragableCover = $('<div class="dragable_cover"></div>')
      $('body').append(dragableCover)
    }
    dragableCover.css('cursor', 'ns-resize')
    $body.on('mousemove', ev => {
      this.changeHeight(ev.clientY, $body.height())
    })
    $body.on('mouseup', () => {
      dragableCover.css('display', 'none')
      $body.off('mousemove')
      $body.off('mouseup')
    })
  }

  // 获取标签树
  @action async getTagTree(params) {
    this.treeLoading = true

    try {
      const res = await io.getTagTree({
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.treeData = listToTree(res)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.treeLoading = false
    }
  }

  // 获取标签树-搜索结果
  @action async searchTree(params) {
    this.treeLoading = true

    try {
      const res = await io.searchTree({
        projectId: this.projectId,
        ...params,
      })

      runInAction(() => {
        this.treeData = listToTree(res)
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
          this.getTagTree({ id: objId })
          this.getExpressionTag({ id: objId })
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
        this.resultInfo = res
        this.saveParams = params
        this.handleExpend(true)
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.resultLoading = false
    }
  }

  // 保存数据查询
  @action async saveSearch(params, cb) {
    this.modalSaveLoading = true
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
          successTip(
            intl
              .get('ide.src.page-search.page-data-search.tql.store.78gkysjruog')
              .d('保存成功')
          )
        } else {
          failureTip(
            intl
              .get('ide.src.page-search.page-data-search.tql.store.mipa6x6oj1s')
              .d('保存失败')
          )
        }
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.modalSaveLoading = false
      })
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
        cb(
          intl.get('ide.src.page-scene.scene.store.o9dgle1dglj').d('名称已存在')
        )
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
        sql: this.resultInfo.sql,
        ...params,
      })

      runInAction(() => {
        this.apiParamsInfo = {
          filedList: res.filedList,
          varList: res.varList.map(d => ({
            ...d,
            required: 1,
          })),
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  @observable apiGroup = []
  // 获取api分组列表
  @action async getApiGroup() {
    try {
      const res = await io.getApiGroup({
        projectId: this.projectId,
      })

      runInAction(() => {
        this.apiGroup = res
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 创建api
  @action async createApi(params, cb) {
    this.modalApiLoading = true
    try {
      const res = await io.createApi({
        projectId: this.projectId,
        sql: this.resultInfo.sql,
        runType: 1,
        ...params,
      })

      runInAction(() => {
        if (res) {
          successTip(
            intl
              .get('ide.src.page-search.page-data-search.tql.store.ss0uj2ea838')
              .d('API创建成功')
          )
        } else {
          failureTip(
            intl
              .get('ide.src.page-search.page-data-search.tql.store.bjvgr4jtuxn')
              .d('API创建失败')
          )
        }
        cb()
        this.apiParamsInfo = {}
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.modalApiLoading = false
      })
    }
  }

  // 名称校验
  apiNameCheck(apiName, cb) {
    return io.apiNameCheck({
      projectId: this.projectId,
      apiName,
    })
  }

  // api路径校验
  async apiPathCheck(apiPath, cb) {
    return io.apiPathCheck({
      projectId: this.projectId,
      apiPath,
    })
  }
}

export default new Store()
