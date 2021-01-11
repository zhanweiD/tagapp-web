import intl from 'react-intl-universal'
import { Component, Fragment, useEffect } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import OnerFrame from '@dtwave/oner-frame'
import { Tabs, Button, Icon, Spin, Alert } from 'antd'

import { Time } from '../../common/util'
import { Authority, Tag, DetailHeader, TabRoute } from '../../component'
import ModalEditScene from '../scene/modal'

import SelectTag from './select-tag'

import store from './store-scene-detail'

const { TabPane } = Tabs

@observer
class SceneDetail extends Component {
  constructor(props) {
    super(props)

    // store.projectId = props.projectId
    const {
      match: { params },
    } = props
    store.sceneId = params.sceneId
    store.projectId = params.projectId
  }

  componentWillMount() {
    if (store.projectId) {
      store.getDetail()
      // store.getAuthCode()
    }
  }

  @action.bound sceneDetailVisible() {
    store.isEdit = true
    store.modalVisible = true
  }

  // @action.bound onTabChange(e) {
  //   store.currentKey = e
  // }

  componentWillUnmount() {
    store.info = {}
  }

  render() {
    const info = toJS(store.info)
    const {
      storageType,
      dataStorageName,
      cuser,
      cdate,
      descr,
      used,
      name,
    } = info

    // 详情信息
    const baseInfo = [
      {
        title: intl
          .get('ide.src.page-scene.scene-detail.main.13xru7vjhjuj')
          .d('创建者'),
        value: cuser,
      },

      {
        title: intl
          .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
          .d('数据源类型'),
        value: storageType,
      },

      {
        title: intl
          .get('ide.src.component.group-provider.configModal.emv6widuog')
          .d('数据源'),
        value: dataStorageName,
      },

      {
        title: intl
          .get('ide.src.page-group.group-detail.main.z2pk6fwpxdm')
          .d('创建时间'),
        value: <Time timestamp={cdate} />,
      },
    ]

    // 不同状态的相应map
    const tagMap = {
      0: (
        <Tag
          status="wait"
          text={intl.get('ide.src.component.tag.tag.sz5nencfou8').d('未使用')}
        />
      ),
      1: (
        <Tag
          status="success"
          text={intl
            .get('ide.src.page-config.group-config.back-config.ec2lmau5zn')
            .d('使用中')}
        />
      ),
    }

    const actions = [
      <Button>
        <a
          target="_blank"
          href={`${window.__keeper.pathHrefPrefix}/scene/${store.sceneId}/tags/${store.projectId}`}
        >
          {intl.get('ide.src.common.navList.vgo3kjy265').d('标签列表')}
        </a>
      </Button>,
      <Authority authCode="tag_app:config_data_service[c]">
        <Button type="primary" className="ml8">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/data/index.html#/api-development"
          >
            {intl
              .get('ide.src.page-scene.scene-detail.main.rqlxgc5nt6')
              .d('数据服务')}
          </a>
        </Button>
      </Authority>,
    ]

    const tabConfig = {
      tabs: [
        {
          name: intl
            .get('ide.src.page-scene.scene-detail.main.6714pynqvkc')
            .d('标签选择'),
          value: 1,
        },
      ],
      changeUrl: false,
    }

    return (
      <div className="scene-detail">
        {used ? (
          <Alert
            showIcon
            closable
            type="warning"
            className="fs12"
            message={intl
              .get('ide.src.page-scene.scene-detail.main.77t2xss8z3')
              .d(
                '场景使用中，无法在场景中继续选择或移除对象，添加、编辑或删除类目，选择或移除标签，只能查看类目与标签详情。'
              )}
          />
        ) : null}

        <Spin spinning={store.loading}>
          <DetailHeader
            name={name}
            // name={(
            //   <Fragment>
            //     <span>{name}</span>
            //     {/* <AuthBox code="asset_tag_project_occ_operator" myFunctionCodes={store.functionCodes} isButton={false}> */}
            //     {
            //       !used && <Icon className="ml8" type="edit" onClick={this.sceneDetailVisible} style={{color: 'rgba(0,0,0, .45)'}} />
            //     }
            //     {/* </AuthBox> */}
            //   </Fragment>
            // )}
            descr={descr}
            btnMinWidth={230}
            baseInfo={baseInfo}
            tag={tagMap[used]}
            actions={actions}
          />
        </Spin>
        <div>
          <TabRoute {...tabConfig} />
          <SelectTag
            sceneId={store.sceneId}
            projectId={store.projectId}
            sceneDetailStore={store}
          />

          <ModalEditScene store={store} />
        </div>
      </div>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()

  useEffect(() => {
    ctx.useProject(true, null, { visible: false })
  }, [])

  return <SceneDetail {...props} />
}
