import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {Select} from 'antd'
import {observer} from 'mobx-react'
import {
  successTip, errorTip, changeToOptions, trimFormValues,
} from '../../common/util'
import io from './io'

const {Option} = Select
class Store {
  @observable nowTab = '1' // 当前tab页面
  @observable unitId // 实体id
  @observable unitOption // 实体列表
  @observable unitLabel = '' // 实体主标签

  // 获取实体列表
  @action async getEntityList() {
    try {
      const res = await io.getEntityList()
      runInAction(() => {
        this.unitOption = res.map(item => <Option key={item.id}>{item.name}</Option>)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
  
  @action async getDataTypeSource() {
    try {
      const res = await io.getDataTypeSource()
      runInAction(() => {
        if (res) {
          this.dataTypeSource = changeToOptions(toJS(res || []))('name', 'type')
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }
}

export default new Store()
