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

  // ************************* 代码编辑 & 日志 start *********************** //

  // 运行查询
  @action async runSearch(params) {
    this.runLoading = true
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
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.runLoading = false
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
}

export default new Store()
