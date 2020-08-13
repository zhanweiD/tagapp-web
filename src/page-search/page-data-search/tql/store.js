import {action, runInAction, observable, toJS} from 'mobx'
import {errorTip, listToTree, successTip, failureTip} from '../../../common/util'

import io from './io'

class Store {
  // ************************* 函数树 & 标签树 start ************************* //
  @observable treeLoading = false

  @observable searchKey = undefined
  @observable expandAll = false
  @observable treeData = [] // 类目树数据
  @observable treeFunData = [] // 函数树数据
  @observable searchExpandedKeys = [] // 关键字搜索展开的树节点

  // 保存查询
  @observable visibleSave = false
  // @observable saveParams = {} // 用于保存的参数
  @observable modalSaveLoading = false // 保存按钮loading

  @action findParentId(id, data, expandedKeys) {
    data.forEach(item => {
      if (item.parentId !== 0 && item.id === id) {
        expandedKeys.push(item.parentId)
        this.findParentId(item.parentId, data, this.searchExpandedKeys)
      }
    })
  }


  // 获取 逻辑配置-标签树
  @action async getTagTree(cb) {
    this.treeLoading = true
    try {
      const res = await io.getTagTree({
        projectId: this.projectId,
      })
      runInAction(() => {
        this.treeLoading = false
        this.searchExpandedKeys.clear()
        this.treeData = listToTree(res)

        if (cb) cb()
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.treeLoading = false
      })
    }
  }

  // 获取 逻辑配置-标签树
  @action async searchTree(cb) {
    this.treeLoading = true
    try {
      const res = await io.searchTree({
        projectId: this.projectId,
        searchKey: this.searchKey,
      })
      runInAction(() => {
        this.treeLoading = false
        this.searchExpandedKeys.clear()
        this.treeData = listToTree(res)

        if (cb) cb()
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.treeLoading = false
      })
    }
  }

  // 获取 逻辑配置-函数树
  @action async getFunTree() {
    this.treeLoading = true
    try {
      const res = await io.getFunTree()
      runInAction(() => {
        this.treeFunData = res.map(d => ({
          id: d,
          aId: d,
          name: d,
          parentId: 0,
        }))
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      runInAction(() => {
        this.treeLoading = false
      })
    }
  }

  // ************************* 函数树 & 标签树 end ************************* //

  @observable editor = null
  @observable codeRunSuccess = false
  @observable tqlDetail = {}

  @observable showResult = false
  @observable resultInfo = {}
  @observable resultLoading = false
  @observable log = ''
  @observable tql = ''
  @observable isRuned = false

  // 获取高度
  @action getHeight = () => {
    this.contentBoxH = $('#code-content').height() - 38// 内容总高度（除去操作栏）
    this.configDom = $('#code_area') // 配置内容

    this.resultDom = $('#search-result-tql') // 运行结果内容

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
    console.log(this.contentBoxH, -this.resultDomHeight)
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

  // ************************* 代码编辑 & 日志 start *********************** //

  // 运行查询
  @action async runSearch(params) {
    this.resultLoading = true
    try {
      const res = await io.runSearch({
        projectId: this.projectId,
        runType: 2,
        ...params,
      })

      runInAction(() => {
        this.resultInfo = res
        this.log = res.log
        this.tql = params.tql
        this.isRuned = true
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
        // objId: this.objId,
        runType: 2,
        tql: toJS(this.tql),
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

// ************************* api相关 *********************** //
  @observable visibleApi = false
  @observable modalApiLoading = false
  @observable apiParamsInfo = {}

  @observable apiGroup = []


  // 获取api请求返回参数
  @action async getApiParams (params, cb) {
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
  // 获取api分组列表
  @action async getApiGroup () {
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
  @action async createApi (params, cb) {
    this.modalApiLoading = true
    try {
      const res = await io.createApi({
        projectId: this.projectId,
        sql: this.resultInfo.sql,
        tql:this.tql,
        runType: 2,
        ...params
      })

      runInAction(() => {
        if(res) {
          successTip('API创建成功')
        } else {
          failureTip('API创建失败')
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
  apiNameCheck (apiName, cb) {
    return io.apiNameCheck({
      projectId: this.projectId,
      apiName,
    })
  }

  // api路径校验
  async apiPathCheck (apiPath, cb) {
    return io.apiPathCheck({
      projectId: this.projectId,
      apiPath,
    })
  }
}

export default new Store()
