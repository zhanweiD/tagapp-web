import intl from 'react-intl-universal'
/**
 * @description 微观画像
 */
import {Component} from 'react'
import {observer, Provider} from 'mobx-react'
import {toJS, action} from 'mobx'
import {Layout, Tabs, Spin} from 'antd'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'

import {
  projectProvider,
  NoData,
  groupProvider,
  OmitTooltip,
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

    const {
      match: {params},
    } = props

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

  @action prevPage = () => {
    store.isLast = false
    if (store.currentPage === 2) {
      store.isFirst = true
    }
    if (store.currentPage - 1) {
      store.currentPage -= 1
      store.getPageList()
    } 
  }

  @action nextPage = () => {
    store.currentPage += 1
    store.isFirst = false
    store.getPageList()
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
    for (const key in item) {
      cards.push(`${key}: ${item[key]}`)
    }
    return (
      <div
        style={{width: '118px', textAlign: 'left', fontSize: '12px'}}
        onClick={() => this.btnClick(item)}
      >
        <OmitTooltip text={cards[0]} maxWidth={118} />
        <OmitTooltip text={cards[1]} maxWidth={118} />
        <OmitTooltip text={cards[2]} maxWidth={118} />
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

  render() {
    const {
      mainLabel,
      isJump,
      changeLoading,
      unitList,
      tabLoading,
      mainKey,
      isFirst,
      isLast,
    } = store
    const noDataConfig = {
      text: intl
        .get('ide.src.page-group.portrayal.main.l8nj6m6c08')
        .d('请输入标签查询'),
    }

    return (
      <Provider store={store}>
        <div className="show-label">
          <Spin style={{marginTop: '20%'}} spinning={tabLoading}>
            <div className="content-header label-header">
              <span>
                {intl
                  .get('ide.src.page-group.portrayal.main.0tokvnq52km')
                  .d('微观画像')}
              </span>
              {isJump ? null : (
                <div className="search-df">
                  <Search />
                </div>
              )}
            </div>

            {isJump && mainLabel ? (
              <Layout className="label-main">
                <Sider className="label-sider box-border">
                  <DetailSidebar />
                </Sider>
                <Layout>
                  <Content className="label-content box-border h-100">
                    <ShowLabel />
                  </Content>
                </Layout>
              </Layout>
            ) : null}
            {unitList.length ? (
              <div>
                {
                  isFirst ? (
                    <LeftOutlined className="left-line left-not" />
                  ) : (
                    <LeftOutlined className="left-line" onClick={this.prevPage} />
                  )
                }
                <Tabs
                  defaultValue={mainLabel}
                  activeKey={mainLabel}
                  tabPosition="top"
                  type="card"
                  tabBarGutter={16}
                  onChange={this.selectPor}
                  // centered // tab局中
                  // tabBarExtraContent={unitList.length ? this.setOperationsSlot() : []} // 分页切换
                >
                  {unitList.map((item, i) => (
                    <TabPane tab={this.setCard(item)} key={item[mainKey]}>
                      {mainLabel === item[mainKey].toString() && (
                        <Spin spinning={changeLoading} style={{marginTop: '25%'}}>
                          <Layout className="label-main">
                            <Sider className="label-sider box-border">
                              <DetailSidebar />
                            </Sider>
                            <Layout>
                              <Content className="label-content box-border h-100">
                                <ShowLabel idKey={i} />
                              </Content>
                            </Layout>
                          </Layout>
                        </Spin>
                      )}
                    </TabPane>
                  ))}
                </Tabs>
                {
                  isLast ? (
                    <RightOutlined className="right-line right-not" />
                  ) : (
                    <RightOutlined className="right-line" onClick={this.nextPage} />
                  )
                }
              </div>
            ) : null}
          </Spin>
          {mainLabel ? null : (
            <div className="header-page" style={{paddingTop: '20%'}}>
              <NoData {...noDataConfig} />
            </div>
          )}
        </div>
      </Provider>
    )
  }
}

export default projectProvider(groupProvider(PortrayalLabel))
