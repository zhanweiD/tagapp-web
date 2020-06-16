import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

class Store {
  @observable cardList = []
  @observable loading = false

  // 编辑数据查询
  @observable visibleEdit = false
  @observable detail = {}
  
  // 获取查询列表
  @action async getsearchList(params) {
    this.loading = true
    try {
      const res = await io.getsearchList(params)
      runInAction(() => {
        this.cardList = res
      })
    } catch (e) {
      errorTip(e.message)
    } finally {
      this.loading = false
    }
  }

  // 编辑
  @action async edit(params) {
    try {
      const res = await io.edit(params)
      runInAction(() => {
        console.log(res)
      })
    } catch (e) {
      errorTip(e.message)
    } 
  }
}

export default new Store()
