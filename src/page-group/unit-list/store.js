import {Link} from 'react-router-dom'
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
    window.location.href = `${window.__keeper.pathHrefPrefix}/portrayal/${this.objId}/${value}`
  }
  // 获取个体列表
  @action async getUnitList() {
    try {
      const res = await io.getUnitList({
        // id: this.id,
        // projectId: this.projectId,
        // queryDate: this.queryDate,
        id: 7381038078254400,
        projectId: 7195117436885248,
        queryDate: '2020-06-23',
      })
      runInAction(() => {
        this.list = res.data || []
        const {title} = res
        for (let i = 0; i < title.length; i++) {
          this.titleList.push({
            key: title[i],
            title: title[i],
            dataIndex: title[i],
            render: (text, record) => (i === 0 ? (<a onClick={() => this.goPortrayal(record[title[0]])}>{text}</a>) : text),
          })
        }
        this.tableLoading = false
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList({
        // projectId: this.projectId,
        // groupId: this.id,
        // queryDate: this.queryDate,
        id: 7381038078254400,
        projectId: 7195117436885248,
        queryDate: '2020-06-23',
      })
      successTip('导出成功')
    } catch (e) {
      // ErrorEater(e, '校验失败')
      errorTip(e.message)
    }
  }

  // 保存群体
  @action async saveUnitList(obj) {
    try {
      const res = await io.saveUnitList({
        projectId: this.projectId,
        groupId: this.id,
        queryDate: this.queryDate,
        ...obj,
      })
      runInAction(() => {
        this.visible = false
        successTip('导出成功')
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
        id: this.id,
      })
      if (res.isExit) {
        callbak('项目名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
