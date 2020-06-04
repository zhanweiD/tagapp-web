import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip,
  successTip, failureTip, listToTree,
} from '../../common/util'
import io from './io-tql'


class Store {
  // ************************* 函数树 & 标签树 start ************************* //
  @observable treeLoading = false

  @observable searchKey = undefined
  @observable expandAll = false
  @observable treeData = [] // 类目树数据
  @observable searchExpandedKeys = [] // 关键字搜索展开的树节点

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
        searchKey: this.searchKey,
      })
      runInAction(() => {
        this.treeLoading = false
        this.searchExpandedKeys.clear()

        let data = res

        // 判断是否进行搜索
        if (this.searchKey) {
          data = res.map(item => {
            // 关键字搜索定位
            if (this.searchKey && item.name.includes(this.searchKey)) {
              this.findParentId(item.id, res, this.searchExpandedKeys)
            }
            return item
          })
        }

        this.treeData = listToTree(data)

        if (cb)cb()
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
        // this.treeData = listToTree(res)
        this.treeData = res.map(d => ({
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
}

export default new Store()
