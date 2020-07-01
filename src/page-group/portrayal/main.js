/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {action} from 'mobx'
import {Select, Input, Button, Layout} from 'antd'
import {
  projectProvider,
} from '../../component'
import './main.styl'

import store from './store'
import DetailSidebar from './detail-sidebar'
import ShowLabel from './show-label'

// const {Option} = Select
const {Sider, Content} = Layout
@observer
class PortrayalLabel extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
    
    const {match: {params}} = props
    if (params && params.objId) {
      store.mainLabel = params.mainLabel
      store.objId = params.objId.toString()
    }
  }
  componentWillMount() {
    store.getEntityList()
    if (store.mainLabel) {
      store.getAnalysis()
      store.getLabel()
    }
    // store.getPortrayal()
  }

  @action selectValue = value => {
    store.objId = value
    store.mainLabel = null
    console.log(store.objId)
  }

  @action inputValue = value => {
    store.mainLabel = value.target.value
    console.log(store.mainLabel)
  }

  @action onSearch = () => {
    if (!store.mainLabel) return
    store.getLabel()
    store.getAnalysis()
    store.getAllTags()
    console.log(store.objId, store.mainLabel)
  }

  @action resetSearch = () => {
    store.objId = undefined
    store.mainLabel = null
    console.log(store.objId, store.mainLabel)
  }

  render() {
    const {entityList, objId, mainLabel} = store
    return (
      <Provider store={store}>
        <div className="show-label">
          <div className="content-header label-header">
            <span>特征分析</span>
            <div className="search-df">
              <div className="mr16">
                <span className="mr8">实体</span>
                <Select 
                  style={{width: '196px'}} 
                  placeholder="请选择实体" 
                  value={objId} 
                  onChange={value => this.selectValue(value)}
                >
                  {entityList}
                </Select>
              </div>
              <div className="mr16">
                <span className="mr8">实体主标签</span>
                <Input 
                  style={{width: '196px'}} 
                  placeholder="请输入主标签" 
                  disabled={!objId}
                  value={mainLabel} 
                  onChange={value => this.inputValue(value)} 
                />
              </div>
              <div className="mr16">
                <Button type="primary" className="mr8" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.resetSearch}>重置</Button>
              </div>
            </div>
          </div>
          <Layout className="label-main">
            <Sider className="label-sider box-border"><DetailSidebar /></Sider>
            <Layout>
              <Content className="label-content box-border"><ShowLabel /></Content>
            </Layout>
          </Layout>
        </div>
      </Provider>
    )
  }
}

export default projectProvider(PortrayalLabel)