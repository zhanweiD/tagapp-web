import {
  observable, action, runInAction, toJS, observe,
} from 'mobx'
import {Select} from 'antd'
import {observer} from 'mobx-react'
import {
  successTip, errorTip, changeToOptions, 
} from '../../common/util'
import io from './io'

const {Option} = Select
class Store {
  @observable chartPieValues = [
    {treeId: null, treeName: '530', metaCount: 1229, ratio: 37},
    {treeId: null, treeName: 'ym一级', metaCount: 863, ratio: 26},
    {treeId: null, treeName: 'DCA_一级类目', metaCount: 744, ratio: 23},
    {treeId: null, treeName: 'bb', metaCount: 224, ratio: 7},
    {treeId: null, treeName: 't1', metaCount: 224, ratio: 7},
  ]
  @observable totalCount = 3284

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
