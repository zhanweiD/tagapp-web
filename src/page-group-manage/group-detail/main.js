import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Tabs, Button, Spin, Alert} from 'antd'

import {Time} from '../../common/util'
import {Tag, DetailHeader, TimeRange} from '../../component'
import TagHistory from './tab-history'
import TabApi from './tab-api'

import store from './store'

const {TabPane} = Tabs

@observer
export default class GroupDetail extends Component {
  defStartTime = moment().subtract(7, 'day').format('YYYY-MM-DD')
  defEndTime = moment().subtract(1, 'day').format('YYYY-MM-DD')

  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props
    store.id = parseInt(params.id) 
    store.objId = parseInt(params.objId) 
  }

  componentWillMount() {
    // 面包屑设置
    // const {frameChange} = this.props
    // frameChange('nav', navList)
   
    store.getDetail()
    store.getHistoryList()
  }

  @action.bound onTabChange(e) {
    console.log(typeof e)
    if (e === '1') {
      store.getHistoryList()
    } else {
      store.getApiList()
    }
    store.currentKey = e
  }

  componentWillUnmount() {
  }

  render() {
    const {modeType, groupDetial, currentKey} = store
    const {
      name,
      id,
      type,
      ctime,
      objName,
      mode,
      cuserName,
      descr,
      lastCount,
      status,
    } = groupDetial
    // 详情信息
    const baseInfo = [
      // {
      //   title: '群体标识',
      //   value: id,
      // }, 
      {
        title: '实体',
        value: objName,
      },
      {
        title: '群体类型',
        value: type === 1 ? '离线群体' : '实时群体',
      },
      {
        title: '创建方式',
        value: mode === 1 ? '规则创建' : 'ID集合创建',
      },
      {
        title: '创建人',
        value: cuserName,
      },
      {
        title: '创建时间',
        value: <Time timestamp={ctime} />,
      },
      {
        title: '描述',
        value: descr,
      },
    ]
    // 不同状态的相应map
    const tagMap = {
      1: <Tag status="success" text="正常" />,
      2: <Tag status="error" text="失败" />,
      3: <Tag status="process" text="计算中" />,
    }

    const actions = [
      <a className="mr8" href={`${window.__keeper.pathHrefPrefix}/scene/${store.sceneId}/tags`}>查看规则</a>,
    ]
    return (
      <div className="group-detail">
        <Spin spinning={false}>
          {/* <Spin> */}
          <DetailHeader
            name={(
              <Fragment>
                <span style={{marginRight: '16px'}}>{name}</span>
              </Fragment>
            )}
            // descr={descr}
            btnMinWidth={230}
            baseInfo={baseInfo}
            tag={tagMap[status]}
            actions={modeType === 0 ? [] : actions}
          />
          {/* <a className="pat21" href>查看规则</a> */}
          <div className="detail-action">
            <span className="fz24">{lastCount}</span>
            <span>人</span>
            <div className="detail-time"><Time timestamp={ctime} /></div>
          </div>
        </Spin>
        <Fragment>
          {
            modeType === 1 ? (
              <Tabs defaultActiveKey="1" animated={false} onChange={this.onTabChange}>
                <TabPane tab="历史记录" key="1">
                  <TagHistory store={store} />
                </TabPane>
                <TabPane tab="API列表" key="2">
                  <TabApi store={store} />
                </TabPane>
              </Tabs>
            ) : (
              <Tabs defaultActiveKey="1" animated={false} onChange={this.onTabChange}>
                <TabPane tab="API列表" key="1">
                  <TabApi store={store} />
                </TabPane>
              </Tabs>
            ) 
          }
        </Fragment>
        {/* <ModalEditScene store={store} /> */}
      </div>
    )
  }
}
