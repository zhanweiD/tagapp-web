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

import BackConfig from './back-config'
import store from './store'
import ConfigModal from './configModal'

@observer
class GroupConfig extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
    store.getPortrayal()
  }
  componentWillMount() {
    // store.getPortrayal()
  }

  @action openModal = () => {
    store.visible = true
    store.getDataTypeSource()
  }

  render() {
    const noDataConfig = {
      btnText: '去初始化',
      onClick: () => this.openModal(),
      text: '初始化',
      // code: 'asset_tag_project_add',
      // noAuthText: '没有任何项目',
    }
    return (
      <div className="config">
        {
          store.initVisible ? (
            <div>
              <NoData
                // isLoading={tableLoading}
                {...noDataConfig}
              />
              <ConfigModal store={store} />
            </div>
          ) : (
            <BackConfig store={store} />
          )
        }
      </div>
    )
  }
}

export default projectProvider(GroupConfig)
