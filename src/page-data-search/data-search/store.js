import {
  action, runInAction, observable,
} from 'mobx'
import {errorTip} from '../../common/util'
import io from './io'

class Store {
  @observable cardList = []
  @observable loading = false

  // 初始化
  @observable isInit = false
  @observable visibleInit = false
  
  // example
  @action async get() {
    try {
      const res = await io.get()
      runInAction(() => {
       
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
