/**
 * @description 群体详情
 */
import {Component, Fragment, useEffect} from 'react'
import {action, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Tabs} from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import {Time} from '../../common/util'
import {Tag, DetailHeader, Authority} from '../../component'
import TagHistory from './tab-history'
import TabApi from './tab-api'
import store from './store'

const {TabPane} = Tabs

@observer
class GroupDetail extends Component {
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
    store.getDetail()
  }

  @action.bound viewRule() {
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/manage/rule/${store.id}/${store.objId}`
  }

  render() {
    const {modeType, groupDetial} = store
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
    } = groupDetial
    // 详情信息
    const baseInfo = [
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
      // {
      //   title: '描述',
      //   value: descr,
      // },
    ]

    // 不同状态的相应map
    const tagMap = {
      1: <Tag status="success" text="正常" />,
      2: <Tag status="error" text="失败" />,
      3: <Tag status="process" text="计算中" />,
    }

    const actions = [
      <Authority
        authCode="tag_app:group_rule[r]"
      >
        <a className="mr8" onClick={this.viewRule}>查看规则</a>

      </Authority>,
    ]
    return (
      <div className="group-detail">
        <div className="detail-h">
          <DetailHeader
            name={(
              <Fragment>
                <span style={{marginRight: '16px'}}>{name}</span>
              </Fragment>
            )}
            descr={descr}
            btnMinWidth={230}
            baseInfo={baseInfo}
            tag={tagMap[status]}
            actions={modeType === 0 ? [] : actions}
          />
          <div className="detail-action">
            <span className="fz24">{lastCount}</span>
            <span>人</span>
            <div className="detail-time"><Time timestamp={ctime} /></div>
          </div>
        </div>
        <Fragment>
          {
            modeType === 1 ? (
              <Tabs className="header-page h-264" defaultActiveKey="1" animated={false}>
                <TabPane tab="历史记录" key="1">
                  <TagHistory store={store} />
                </TabPane>
                <TabPane tab="API列表" key="2">
                  <TabApi store={store} />
                </TabPane>
              </Tabs>
            ) : (
              <Tabs className="header-page h-264" defaultActiveKey="1" animated={false}>
                <TabPane tab="API列表" key="1">
                  <TabApi store={store} />
                </TabPane>
              </Tabs>
            ) 
          }
        </Fragment>
      </div>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()

  useEffect(() => {
    ctx.useProject(false)
  }, [])

  return (
    <GroupDetail {...props} projectId={projectId} />
  )
}
