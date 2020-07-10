import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, successTip} from '../../common/util'
import io from './io'

class Store {
  @observable visible = false // 保存群体窗口
  @observable id = 0 // 群体ID
  @observable objId = 0 // 实体ID
  @observable queryDate = 0 // 群体日期
  @observable projectId = 0 // 项目ID
  @observable titleList = [] // 个体列表表头
  @observable tableLoading = true // 个体列表表头
  @observable pagination = {
    totalCount: 1,
    currentPage: 1,
    pageSize: 10,
  }
  @observable list = []

  // 跳转到微观画像
  goPortrayal = value => {
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/portrayal/${this.objId}/${value}`
  }
  
  // 获取个体列表
  @action async getUnitList() {
    try {
      const res = await io.getUnitList({
        id: this.id,
        projectId: this.projectId,
        queryDate: this.queryDate,
      })
      
      runInAction(() => {
        this.list = res.data || []
        this.titleList = []
        const {title} = res

        for (let i = 0; i < title.length; i++) {
          if (title[i] === res.mainTag) {
            this.titleList.unshift({
              key: title[i],
              title: title[i],
              dataIndex: title[i],
              render: (text, record) => (<a onClick={() => this.goPortrayal(record[title[i]])}>{text}</a>),
            })
          } else {
            this.titleList.push({
              key: title[i],
              title: title[i],
              dataIndex: title[i],
            })
          }
        }
        this.tableLoading = false
      })
    } catch (e) {
      this.tableLoading = false
      errorTip(e.message)
    }
  }

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList({
        projectId: this.projectId,
        groupId: this.id,
        queryDate: this.queryDate,
      })
      if (res) {
        successTip('导出成功')
      }
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 保存群体
  @action async saveUnitList(obj) {
    try {
      const res = await io.saveUnitList({
        projectId: this.projectId,
        id: this.id,
        queryDate: this.queryDate,
        ...obj,
      })
      runInAction(() => {
        if (res) {
          this.visible = false
          successTip('已保存')
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async groupCheckName(name, callbak) {
    try {
      const res = await io.groupCheckName({
        name,
        objId: this.objId,
        projectId: this.projectId,
        // id: this.id,
      })
      if (res.isExit) {
        callbak('群体名称重复')
      } else {
        callbak()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
