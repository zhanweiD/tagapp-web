/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {toJS, action} from 'mobx'
import {Layout, Tabs, Spin} from 'antd'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import personIcon from '../../icon/person.svg'

import {
  projectProvider, NoData, groupProvider, OmitTooltip,
} from '../../component'
import './main.styl'

import store from './store'
import DetailSidebar from './detail-sidebar'
import ShowLabel from './show-label'
import Search from './search'

const {Sider, Content} = Layout
const {TabPane} = Tabs
@observer
class PortrayalLabel extends Component {
  constructor(props) {
    super(props)

    const {match: {params}} = props

    store.resetValue()

    store.mainLabel = ''
    store.objId = undefined

    if (params.projectId) {
      store.projectId = params.projectId
      store.isJump = true
    } else {
      store.projectId = props.projectId
      store.isJump = false
    }
    store.getEntityList(params)
  }

  @action selectPor = v => {
    store.mainLabel = v
    // store.mainLabel = v
  }
  @action btnClick = v => {
    store.unitName = v.姓名
  }

  setCard = item => {
    const cards = []
    const {picUrl} = store
    for (const key in item) {
      // if (key !== 'mainLabel') {
      //   cards.push(`${key}: ${item[key]}`)
      // }
      cards.push(`${key}: ${item[key]}`)
    }
    return (
      <div 
        style={{width: '108px', textAlign: 'left', fontSize: '12px'}}
        onClick={() => this.btnClick(item)}
      >
        <OmitTooltip text={cards[0]} maxWidth={108} />
        <OmitTooltip text={cards[1]} maxWidth={108} />
        <OmitTooltip text={cards[2]} maxWidth={108} />
        {/* <div>
          <img width={32} height={32} src={toJS(picUrl) || personIcon} alt="头像" />
        </div>
        <div>
          <OmitTooltip text={cards[0]} maxWidth={108} />
          <OmitTooltip text={cards[1]} maxWidth={108} />
          <OmitTooltip text={cards[2]} maxWidth={108} />
        </div> */}
      </div>
    )
  }

  setOperationsSlot = () => {
    const {isFirst, isLast} = store
    if (isLast && isFirst) {
      return ({
        left: <LeftOutlined style={{fontSize: '32px', color: 'rgba(0, 0, 0, 0.25)', marginLeft: '16px', cursor: 'not-allowed'}} />,
        right: <RightOutlined style={{fontSize: '32px', color: 'rgba(0, 0, 0, 0.25)', marginRight: '16px', cursor: 'not-allowed'}} />,
      })
    }
    if (isFirst) {
      return ({
        left: <LeftOutlined style={{fontSize: '32px', color: 'rgba(0, 0, 0, 0.25)', marginLeft: '16px', cursor: 'not-allowed'}} />,
        right: <RightOutlined style={{fontSize: '32px', marginRight: '16px', color: '#fff'}} onClick={this.nextPage} />,
      })
    }
    if (isLast) {
      return ({
        left: <LeftOutlined style={{fontSize: '32px', marginLeft: '16px', color: '#fff'}} onClick={this.prevPage} />,
        right: <RightOutlined style={{fontSize: '32px', marginRight: '16px', color: 'rgba(0, 0, 0, 0.25)', cursor: 'not-allowed'}} />,
      })
    }
    return ({
      left: <LeftOutlined style={{fontSize: '32px', marginLeft: '16px', color: '#fff'}} onClick={this.prevPage} />,
      right: <RightOutlined style={{fontSize: '32px', marginRight: '16px', color: '#fff'}} onClick={this.nextPage} />,
    })
  }

  render() {
    const {mainLabel, isJump, changeLoading, unitList, labelKey, tabLoading, mainKey} = store
    const noDataConfig = {
      text: '请输入标签查询',
    }

    return (
      <Provider store={store}>
        <div className="show-label">
          <Spin style={{marginTop: '30%'}} spinning={tabLoading}>

            <div className="content-header label-header">
              <span>微观画像</span>
              {
                isJump ? null : (
                  <div className="search-df">
                    <Search />
                  </div>
                )
              }
            </div>

            {
              isJump && mainLabel ? (
                <Layout className="label-main">
                  <Sider className="label-sider box-border"><DetailSidebar /></Sider>
                  <Layout>
                    <Content className="label-content box-border h-100"><ShowLabel /></Content>
                  </Layout>
                </Layout>
              ) : null
            }
            {
              unitList.length ? (
                <Tabs 
                  defaultValue={mainLabel} 
                  activeKey={mainLabel}
                  tabPosition="top" 
                  type="card"
                  tabBarGutter={16}
                  onChange={this.selectPor} 
                  centered
                // tabBarExtraContent={unitList.length ? this.setOperationsSlot() : []}
                >
                  {unitList.map((item, i) => (
                    <TabPane tab={this.setCard(item)} key={item[mainKey]}>
                      {
                        mainLabel === item[mainKey].toString() && (
                          <Spin spinning={changeLoading}>
                            <Layout className="label-main">
                              <Sider className="label-sider box-border"><DetailSidebar /></Sider>
                              <Layout>
                                <Content className="label-content box-border h-100"><ShowLabel idKey={i} /></Content>
                              </Layout>
                            </Layout>
                          </Spin>
                        )
                      }
                    </TabPane>
                  ))}
                </Tabs>
              ) : null
            }
          </Spin>
          {
            mainLabel ? null : (
              <div className="header-page" style={{paddingTop: '20%'}}>
                <NoData {...noDataConfig} />
              </div>
            )
          }
          {/* {
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
          } */}
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(PortrayalLabel))
