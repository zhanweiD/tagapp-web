/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {Layout} from 'antd'
import {
  projectProvider, NoData, groupProvider,
} from '../../component'
import './main.styl'

import store from './store'
import DetailSidebar from './detail-sidebar'
import ShowLabel from './show-label'
import Search from './search'

const {Sider, Content} = Layout
@observer
class PortrayalLabel extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    store.getEntityList()
    const {match: {params}} = props

    if (params && params.objId) {
      store.mainLabel = params.mainLabel
      store.objId = params.objId.toString()
      store.getAnalysis()
      store.getLabel()
    }
  }

  render() {
    const {markedFeature, basicLabel} = store
    const noDataConfig = {
      text: '请输入主标签查询',
    }

    return (
      <Provider store={store}>
        <div className="show-label">
          <div className="content-header label-header">
            <span>微观画像</span>
            <div className="search-df">
              <Search />
            </div>
          </div>
          {
            markedFeature.length !== 0 || basicLabel.length !== 0 ? (
              <Layout className="label-main">
                <Sider className="label-sider box-border"><DetailSidebar /></Sider>
                <Layout>
                  <Content className="label-content box-border"><ShowLabel /></Content>
                </Layout>
              </Layout>
            ) : (
              <NoData {...noDataConfig} />
            )
          }
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(PortrayalLabel))
