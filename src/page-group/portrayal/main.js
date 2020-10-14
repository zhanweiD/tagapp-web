/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {toJS} from 'mobx'
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
   

    const {match: {params}} = props

    store.mainLabel = ''
    store.objId = undefined

    if(params.projectId) {
      store.projectId = params.projectId
    } else {
      store.projectId = props.projectId
    }
    store.getEntityList(params)
  }


  render() {
    const {markedFeature, basicLabel, mainLabel} = store
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
            // markedFeature.length !== 0 || basicLabel.length !== 0 ? (
            mainLabel ? (
              <Layout className="label-main">
                <Sider className="label-sider box-border"><DetailSidebar /></Sider>
                <Layout>
                  <Content className="label-content box-border h-100"><ShowLabel /></Content>
                </Layout>
              </Layout>
            ) : (
              <div className="header-page" style={{paddingTop: '15%'}}>
                <NoData {...noDataConfig} />
              </div>
            )
          }
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(PortrayalLabel))
