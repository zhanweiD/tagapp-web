import intl from 'react-intl-universal'
/**
 * @description 群体洞察配置
 */
import { Component } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { NoData, projectProvider } from '../../component'

import BackConfig from './back-config'
import store from './store'
import ConfigModal from './configModal'

@observer
class GroupConfig extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
    // store.getPortrayal()
    store.config = {}
    store.hasInit()
    store.getDataTypeSource()
  }

  @action openModal = () => {
    store.visible = true
  }

  render() {
    const { getDefaultLogin, visible } = store
    const noDataConfig = {
      onClick: () => this.openModal(),
      text: intl
        .get('ide.src.component.group-provider.group-provider.viefgvajavb')
        .d('该项目下，群体洞察的数据源未初始化'),
      btnText: intl
        .get('ide.src.component.group-provider.group-provider.5hj4kgoscd9')
        .d('初始化数据源'),
      code: 'tag_config:group_config[u]',
      noAuthText: intl
        .get('ide.src.component.group-provider.group-provider.viefgvajavb')
        .d('该项目下，群体洞察的数据源未初始化'),
    }

    return (
      <div className="h-100">
        <div className="content-header">
          {intl
            .get('ide.src.page-config.group-config.main.ke9odn7meh')
            .d('群体洞察配置')}
        </div>
        <div className="header-page config">
          {store.initVisible ? (
            <BackConfig store={store} />
          ) : (
            <div style={{ marginTop: '15%' }}>
              <NoData {...noDataConfig} />

              {visible ? <ConfigModal store={store} /> : null}

              {/* <ConfigModal store={store} /> */}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default projectProvider(GroupConfig)
