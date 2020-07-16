import {Component} from 'react'
import {action} from 'mobx'
import {Button} from 'antd'

import {ListContent} from '../../component'
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
      key: 'name',
      title: 'API名称',
      dataIndex: 'name',
    }, {
      key: 'objName',
      title: 'API路径',
      dataIndex: 'objName',
    }, {
      key: 'lastCount',
      title: '创建人',
      dataIndex: 'lastCount',
    }, {
      key: 'lastTime',
      title: '创建时间',
      dataIndex: 'lastTime',
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
      initParams: {id},
      buttons: [<Button type="primary" onClick={() => this.openModal()}>新建API</Button>],
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
