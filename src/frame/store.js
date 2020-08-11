import {
  observable, action, runInAction, toJS,
} from 'mobx'
import io from './io'

class Store {
  constructor() {
    Promise.all([
      this.getFunctionCode('tag_app'), // 标签应用
      this.getFunctionCode('tag_config'), // 后台配置
    ]).then(res => {
      window.frameInfo.tagProductFunctionCode = _.map(toJS(this.functionCodeList), 'functionCode')
      this.functionCodeDone = true
    })
  }

  // 功能权限
  @observable functionCodeList = []
  @observable functionCodeMap = {}
  @observable functionCodeDone = false

  @action async getFunctionCode(productCode) {
    try {
      const res = await io.userFunctionCode({
        productCode,
      })

      runInAction(() => {
        this.functionCodeList = this.functionCodeList.concat(res)
        this.functionCodeMap[productCode] = res
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}

export default new Store()
