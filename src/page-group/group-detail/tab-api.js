import intl from 'react-intl-universal'
import { Component } from 'react'
import { action } from 'mobx'
import { Button } from 'antd'

import { ListContent, Authority } from '../../component'
import { Time } from '../../common/util'

import ApiModal from './apiModal'
import apiStore from './store-api-list'

export default class TabApi extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
  }
  columns = [
    {
      key: 'apiName',
      title: intl
        .get('ide.src.page-group.group-detail.apiModal.qmpxjtv0okp')
        .d('API名称'),
      dataIndex: 'apiName',
    },
    {
      key: 'apiPath',
      title: intl
        .get('ide.src.page-group.group-detail.apiModal.6x247exi6cr')
        .d('API路径'),
      dataIndex: 'apiPath',
    },
    {
      key: 'cuserName',
      title: intl
        .get('ide.src.page-group.group-detail.main.tg0l783b39a')
        .d('创建人'),
      dataIndex: 'cuserName',
    },
    {
      key: 'ctime',
      title: intl
        .get('ide.src.page-group.group-detail.main.z2pk6fwpxdm')
        .d('创建时间'),
      dataIndex: 'ctime',
      render: text => <Time timestamp={text} />,
    },
  ]

  componentWillMount() {
    // const {frameChange} = this.props
    // frameChange('nav', navList)
  }

  @action openModal = () => {
    this.store.getApiGroup()
    this.store.visible = true
  }

  render() {
    const { id } = this.store

    const listConfig = {
      columns: this.columns,
      initParams: { id, projectId: this.store.projectId },
      buttons: [
        <Authority authCode="tag_app:create_group_api[c]">
          <Button type="primary" onClick={() => this.openModal()}>
            {intl
              .get('ide.src.page-group.group-detail.apiModal.dkcjh0h4zic')
              .d('新建API')}
          </Button>
        </Authority>,
      ],
      store: apiStore, // 必填属性
    }

    return (
      <div className="page-group mt16">
        <div className="list-content">
          <ListContent {...listConfig} />
        </div>
        <ApiModal store={this.store} />
      </div>
    )
  }
}
