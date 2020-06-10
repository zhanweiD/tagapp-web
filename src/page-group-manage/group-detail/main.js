import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Tabs, Button, Spin, Alert} from 'antd'
import {EditOutlined} from '@ant-design/icons' 

import * as navListMap from '../../common/navList'
import {Time} from '../../common/util'
import {AuthBox, Tag, DetailHeader, TimeRange} from '../../component'
import TagHistory from './tab-history'
import TabApi from './tab-api'

import store from './store'

const {TabPane} = Tabs

// 面包屑设置
// eslint-disable-next-line no-underscore-dangle

const navList = [
  navListMap.tagCenter,
  navListMap.application,
  navListMap.scene,
  {text: navListMap.sceneDetail.text},
]


@inject('frameChange')
@observer
export default class GroupDetail extends Component {
  defStartTime = moment().subtract(7, 'day').format('YYYY-MM-DD')
  defEndTime = moment().subtract(1, 'day').format('YYYY-MM-DD')

  constructor(props) {
    super(props)
    const {spaceInfo} = window
    // store.projectId = spaceInfo && spaceInfo.projectId

    // const {match: {params}} = props
    // store.sceneId = params.sceneId
  }

  componentWillMount() {
    // 面包屑设置
    // const {frameChange} = this.props
    // frameChange('nav', navList)
   
    // if (store.projectId) {
    //   store.getDetail()
    //   store.getAuthCode()
    // }
  }

  @action.bound sceneDetailVisible() {
    store.isEdit = true
    store.modalVisible = true
  }

  @action.bound onTabChange(e) {
    store.currentKey = e
  }

  componentWillUnmount() {
    store.info = {}
  }

  render() {
    const info = store.list[0]
    const {
      name,
      enName,
      objId,
      objName,
      descr,
      lastTime,
      status,
    } = info

    // 详情信息
    const baseInfo = [
      {
        title: '群体标识',
        value: objId,
      }, 
      {
        title: '实体',
        value: name,
      },
      {
        title: '群体类型',
        value: enName,
      },
      {
        title: '创建方式',
        value: objName,
      },
      {
        title: '创建人',
        value: descr,
      },
      {
        title: '创建时间',
        value: <Time timestamp={lastTime} />,
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
                <span style={{marginRight: '16px'}}>大额优惠卷刺激会员</span>
              </Fragment>
            )}
            // descr={descr}
            btnMinWidth={230}
            baseInfo={baseInfo}
            tag={tagMap[status]}
            actions={actions}
          />
          {/* <a className="pat21" href>查看规则</a> */}
          <div className="detail-action">
            <span className="fz24">{1234}</span>
            <span>人</span>
            <div className="detail-time"><Time timestamp={lastTime} /></div>
          </div>
        </Spin>
        <Fragment>
          <Tabs defaultActiveKey="1" animated={false} onChange={this.onTabChange}>
            <TabPane tab="历史记录" key="1">
              <TagHistory store={store} />
            </TabPane>
            <TabPane tab="API列表" key="2">
              <TabApi store={store} />
            </TabPane>
          </Tabs>
          {/* <ModalEditScene store={store} /> */}
        </Fragment>
      </div>
    )
  }
}
