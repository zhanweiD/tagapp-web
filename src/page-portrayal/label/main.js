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

import store from './store'
import DetailSidebar from './detail-sidebar'
import ShowLabel from './show-label'

const {Option} = Select
const {Sider, Content} = Layout
@observer
class PortrayalLabel extends Component {
  componentWillMount() {
    // store.getPortrayal()
  }

  @action selectValue = value => {
    store.unitId = value
    console.log(store.unitId)
  }

  @action inputValue = value => {
    store.unitLabel = value.target.value
    console.log(store.unitLabel)
  }

  @action onSearch = () => {
    console.log(store.unitId, store.unitLabel)
  }

  @action resetSearch = () => {
    store.unitId = undefined
    store.unitLabel = undefined
    console.log(store.unitId, store.unitLabel)
  }

  render() {
    return (
      <Provider store={store}>
        <div className="show-label">
          <div className="content-header label-header">
            <span>特征分析</span>
            <div className="search-df">
              <div className="mr16">
                <span className="mr8">实体</span>
                <Select style={{width: '196px'}} placeholder="会员" value={store.unitId} onChange={value => this.selectValue(value)}>
                  <Option key="1">会员1</Option>
                  <Option key="2">会员2</Option>
                </Select>
              </div>
              <div className="mr16">
                <span className="mr8">实体主标签</span>
                <Input style={{width: '196px'}} placeholder="请输入" value={store.unitLabel} onChange={value => this.inputValue(value)} />
              </div>
              <div className="mr16">
                <Button type="primary" className="mr8" onClick={this.onSearch}>查询</Button>
                <Button onClick={this.resetSearch}>重置</Button>
              </div>
            </div>
          </div>
          <Layout className="label-main">
            <Sider className="m16 label-sider"><DetailSidebar /></Sider>
            <Layout>
              <Content className="m16 label-content"><ShowLabel /></Content>
            </Layout>
          </Layout>
        </div>
      </Provider>
    )
  }
}

export default projectProvider(PortrayalLabel)
