import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import { Tabs, Button, Spin, Alert } from 'antd';

import * as navListMap from '../../common/navList'
import {Time} from '../../common/util'
import {AuthBox, Tag, DetailHeader, TimeRange} from '../../component'
import TagHistory from './tab-history'

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

    return (
      <div className="group-detail">    
        <Spin spinning={false}>
          {/* <Spin> */}
          <DetailHeader
            name={(
              <Fragment>
                <p>大额优惠卷刺激会员</p>
                <div className="detail-action">
                  <span>3312</span>
                  <span className="detail-time"><Time timestamp={lastTime} /></span>
                  <a href>查看规则</a>
                </div>
              </Fragment>
            )}
            // descr={descr}
            btnMinWidth={230}
            baseInfo={baseInfo}
          />
        </Spin>
        <Fragment>
          <Tabs defaultActiveKey="1" animated={false} onChange={this.onTabChange}>
            <TabPane tab="历史记录" key="1">
              <TagHistory store={store} />
            </TabPane>
            <TabPane tab="API列表" key="2">
              2
            </TabPane>
          </Tabs>
          {/* <ModalEditScene store={store} /> */}
        </Fragment>
      </div>
    )
  }
}
