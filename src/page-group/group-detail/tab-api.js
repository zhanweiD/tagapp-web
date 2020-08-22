import {Component} from 'react'
import {action} from 'mobx'
import {Button} from 'antd'

import {ListContent, Authority} from '../../component'
import {Time} from '../../common/util'

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
      title: 'API名称',
      dataIndex: 'apiName',
    }, {
      key: 'apiPath',
      title: 'API路径',
      dataIndex: 'apiPath',
    }, {
      key: 'cuserName',
      title: '创建人',
      dataIndex: 'cuserName',
    }, {
      key: 'ctime',
      title: '创建时间',
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
    const {id} = this.store

    const listConfig = {
      columns: this.columns,
      initParams: {id, projectId: this.store.projectId},
      buttons: [<Authority authCode="tag_app:create_group_api[c]"><Button type="primary" onClick={() => this.openModal()}>新建API</Button></Authority>],
      store: apiStore, // 必填属性
    }

    return (
      <div className="page-group">
        <div className="list-content">
          <ListContent {...listConfig} />
        </div>
        <ApiModal store={this.store} />
      </div>
    )
  }
}
