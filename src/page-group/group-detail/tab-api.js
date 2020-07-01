import {Component} from 'react'
import {action} from 'mobx'
import {TimeRange, NoData, ListContent, AuthBox} from '../../component'
import {Time} from '../../common/util'

import ApiModal from './apiModal'

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
    // store.getGroupList()
  }

  @action openModal = () => {
    this.store.getTagList()
    this.store.visible = true
  }


  render() {
    const {store} = this
    const {
      list, tableLoading, searchParams,
    } = store

    const listConfig = {
      columns: this.columns,
      buttons: [<AuthBox code="asset_tag_project_add" type="primary" onClick={() => this.openModal()}>新建API</AuthBox>],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="page-group">
        {
          list.length || JSON.stringify(searchParams) !== '{}' ? (
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
          ) : (
            <NoData />
            // isLoading={tableLoading}
          )
        }
        <ApiModal store={store} />
      </div>
    )
  }
}