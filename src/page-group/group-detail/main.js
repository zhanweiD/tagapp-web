import intl from 'react-intl-universal'
/**
 * @description 群体详情
 */
import { Component, Fragment, useEffect } from 'react'
import { action, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Tabs } from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import { Time } from '../../common/util'
import { Tag, DetailHeader, Authority } from '../../component'
import TagHistory from './tab-history'
import TabApi from './tab-api'
import store from './store'

const { TabPane } = Tabs

@observer
class GroupDetail extends Component {
  defStartTime = moment()
    .subtract(7, 'day')
    .format('YYYY-MM-DD')
  defEndTime = moment()
    .subtract(1, 'day')
    .format('YYYY-MM-DD')

  constructor(props) {
    super(props)
    // store.projectId = props.projectId
    const {
      match: { params },
    } = props
    store.id = parseInt(params.id)
    store.objId = parseInt(params.objId)

    store.projectId = parseInt(params.projectId)
  }

  componentWillMount() {
    store.getDetail()
  }

  @action.bound viewRule() {
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/manage/rule/${store.id}/${store.objId}/${store.projectId}`
  }

  render() {
    const { modeType, groupDetial } = store
    const {
      name,
      type,
      ctime,
      objName,
      mode,
      cuserName,
      descr,
      lastCount,
      status,
      periodTime,
      scheduleType,
    } = groupDetial
    // 详情信息
    const baseInfo = [
      {
        title: intl.get('ide.src.common.dict.eppgpvyn3fp').d('实体'),
        value: objName,
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.dhufx44wnvm')
          .d('群体类型'),
        value:
          type === 1
            ? intl
                .get('ide.src.page-group.group-detail.main.lgff4rqo5h')
                .d('离线群体')
            : intl
                .get('ide.src.page-group.group-detail.main.23jks5f432c')
                .d('实时群体'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.nd04r8rg67c')
          .d('创建方式'),
        value:
          mode === 1
            ? intl
                .get('ide.src.page-group.group-detail.main.g7lv1owdkxp')
                .d('规则创建')
            : intl
                .get('ide.src.page-group.group-detail.main.3swfo8itq8b')
                .d('ID集合创建'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.tg0l783b39a')
          .d('创建人'),
        value: cuserName,
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.z2pk6fwpxdm')
          .d('创建时间'),
        value: <Time timestamp={ctime} />,
      },

      // // {
      // //   title: '描述',
      // //   value: descr,
      // // },
      // {
      //   title: '调度类型',
      //   value: '立即执行',
      // },
    ]

    const baseInfo1 = [
      {
        title: intl.get('ide.src.common.dict.eppgpvyn3fp').d('实体'),
        value: objName,
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.dhufx44wnvm')
          .d('群体类型'),
        value:
          type === 1
            ? intl
                .get('ide.src.page-group.group-detail.main.lgff4rqo5h')
                .d('离线群体')
            : intl
                .get('ide.src.page-group.group-detail.main.23jks5f432c')
                .d('实时群体'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.nd04r8rg67c')
          .d('创建方式'),
        value:
          mode === 1
            ? intl
                .get('ide.src.page-group.group-detail.main.g7lv1owdkxp')
                .d('规则创建')
            : intl
                .get('ide.src.page-group.group-detail.main.3swfo8itq8b')
                .d('ID集合创建'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.tg0l783b39a')
          .d('创建人'),
        value: cuserName,
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.z2pk6fwpxdm')
          .d('创建时间'),
        value: <Time timestamp={ctime} />,
      },

      // {
      //   title: '描述',
      //   value: descr,
      // },
      {
        title: intl
          .get('ide.src.page-group.group-detail.main.5fhr6nv1p9a')
          .d('调度类型'),
        value: intl
          .get('ide.src.page-group.group-detail.main.zkvirspmw2c')
          .d('周期调度'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.crkya9il1lf')
          .d('调度周期'),
        value: intl
          .get('ide.src.page-group.group-detail.main.gpy28ttps6o')
          .d('天'),
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.nz0v7mfueqj')
          .d('调度时间'),
        value: periodTime,
      },
    ]

    // 不同状态的相应map
    const tagMap = {
      1: (
        <Tag
          status="success"
          text={intl
            .get('ide.src.page-group.group-detail.main.ulrohoasnsh')
            .d('正常')}
        />
      ),
      2: (
        <Tag
          status="error"
          text={intl
            .get('ide.src.page-group.group-detail.main.atzzx8akyq6')
            .d('失败')}
        />
      ),
      3: (
        <Tag
          status="process"
          text={intl
            .get('ide.src.page-group.group-detail.main.ldpbvdq4x7r')
            .d('计算中')}
        />
      ),
    }

    const actions = [
      // <a onClick={} className="mr8" href>查看配置参数</a>,
      <Authority authCode="tag_app:group_rule[r]">
        {/* <a className="mr8" target="_blank" onClick={this.viewRule}>查看规则</a> */}
        <a
          className="mr8"
          target="_blank"
          href={`${window.__keeper.pathHrefPrefix}/group/manage/rule/${store.id}/${store.objId}/${store.projectId}`}
        >
          {intl
            .get('ide.src.page-group.group-detail.main.27fjptcfga')
            .d('查看规则')}
        </a>
      </Authority>,
    ]

    return (
      <div className="group-detail">
        <div className="detail-h">
          <DetailHeader
            name={
              <Fragment>
                <span style={{ marginRight: '16px' }}>{name}</span>
              </Fragment>
            }
            descr={descr}
            btnMinWidth={230}
            baseInfo={scheduleType === 1 ? baseInfo1 : baseInfo}
            tag={tagMap[status]}
            actions={modeType === 0 ? [] : actions}
          />

          <div className="detail-action">
            <span className="fz24">{lastCount}</span>
            <span>
              {intl
                .get('ide.src.page-group.group-detail.main.vcxyv5xqdw')
                .d('人')}
            </span>
            <div className="detail-time">
              <Time timestamp={ctime} />
            </div>
          </div>
        </div>
        <Fragment>
          {modeType === 1 ? (
            <Tabs
              className="header-page h-264"
              defaultActiveKey="1"
              animated={false}
            >
              <TabPane
                tab={intl
                  .get('ide.src.page-group.group-detail.main.si3pay3ppjs')
                  .d('历史记录')}
                key="1"
              >
                <TagHistory store={store} />
              </TabPane>
              <TabPane
                tab={intl
                  .get('ide.src.page-group.group-detail.main.t4g3ps17pfk')
                  .d('API列表')}
                key="2"
              >
                <TabApi store={store} />
              </TabPane>
            </Tabs>
          ) : (
            <Tabs
              className="header-page h-264"
              defaultActiveKey="1"
              animated={false}
            >
              <TabPane
                tab={intl
                  .get('ide.src.page-group.group-detail.main.t4g3ps17pfk')
                  .d('API列表')}
                key="1"
              >
                <TabApi store={store} />
              </TabPane>
            </Tabs>
          )}
        </Fragment>
      </div>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()

  useEffect(() => {
    ctx.useProject(true, null, { visible: false })
  }, [])

  return <GroupDetail {...props} />
}
