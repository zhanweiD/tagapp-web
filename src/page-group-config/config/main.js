/**
 * @description 后台配置
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {
  NoData,
  projectProvider,
} from '../../component'

import store from './store'
import ModalConfig from './model'

@observer
class GroupConfig extends Component {
  componentWillMount() {

  }

  @action openModal = () => {
    // store.detail = data
    store.visible = true
    // store.getDataSource()
  }

  render() {
    const noDataConfig = {
      btnText: '去初始化',
      onClick: () => this.openModal(),
      text: '初始化',
      code: 'asset_tag_project_add',
      noAuthText: '没有任何项目',
    }
    return (
      <div>
        <NoData
          // isLoading={tableLoading}
          {...noDataConfig}
        />
        <ModalConfig store={store} />
      </div>
    )
  }
}

export default projectProvider(GroupConfig)
