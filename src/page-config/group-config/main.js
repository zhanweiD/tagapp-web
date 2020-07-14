/**
 * @description 群体洞察配置
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
    store.projectId = props.projectId
    store.getPortrayal()
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
    }
    return (
      <div>
        <div className="content-header">群体洞察配置</div> 
        <div className="header-page config">
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
       
      </div>
    )
  }
}

export default projectProvider(GroupConfig)
