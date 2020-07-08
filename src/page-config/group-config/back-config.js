import {Component, Fragment} from 'react'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Spin, Popconfirm, Badge} from 'antd'
import {FormOutlined} from '@ant-design/icons'
import {ModalForm, ListContent, AuthBox, NoData} from '../../component'
import {Time} from '../../common/util'

import EntityModal from './entityModal'
import ConfigModal from './configModal'

@inject('store')
@observer
export default class BackConfig extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.store.getPortrayal()
    this.store.getEntityPage()
  }

  columns = [
    {
      key: 'objName',
      title: '实体名称',
      dataIndex: 'objName',
    }, {
      key: 'objDescr',
      title: '实体描述',
      dataIndex: 'objDescr',
    }, {
      key: 'addTime',
      title: '添加时间',
      dataIndex: 'addTime',
      render: text => <Time timestamp={text} />,
    }, {
      key: 'isUsed',
      title: '使用状态',
      dataIndex: 'isUsed',
      render: use => <Badge status={use ? 'success' : 'default'} text={use ? '使用中' : '未使用'} />,
    }, {
      key: 'action',
      title: '操作',
      width: 200,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            <a href onClick={() => this.openModal('edit', record)} style={{marginRight: '6px'}}>编辑</a>
            <span className="table-action-line" />
          </Fragment>
          <Fragment>
            <Popconfirm placement="topRight" title="你确认要移除该实体吗？" onConfirm={() => this.delItem(record.objId)}>
              <a disabled={record.isUsed} href>移除</a>
            </Popconfirm>
          </Fragment>
        </div>
      ),
    },
  ]

  // 修改配置弹窗
  @action editClick = () => {
    this.store.visible = true
  }

  // 添加实体弹窗
  @action openModal = (type, data = {}) => {
    if (type === 'edit') {
      this.store.getTagList(data.objId)
      this.store.getEntityInfo(data.objId)
    }
    this.store.getEntityList()
    this.store.entityVisible = true
    this.store.modalType = type
  }

  // 删除实体
  delItem = id => {
    this.store.delEntity(id)
  }

  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [],
      dataTypeSource = [],
      dataStorageTypeId,
      dataStorageId,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: dataStorageTypeId,
      disabled: true,
      control: {
        options: dataTypeSource,
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      initialValue: dataStorageId,
      disabled: true,
      control: {
        options: dataSource,
      },
      component: 'select',
    }]
  }
  render() {
    const {store} = this
    const {
      tableLoading,
      list,
    } = store

    const formConfig = {
      labelAlign: 'left',
      selectContent: this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    const listConfig = {
      tableLoading,
      columns: this.columns,
      buttons: [<AuthBox code="asset_tag_project_add" type="primary" onClick={() => this.openModal('add')}>添加实体</AuthBox>],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    const noDataConfig = {
      btnText: '添加实体',
      onClick: () => this.openModal('add'),
      noAuthText: '暂无实体',
    }

    return (
      <Fragment>
        {/* <div className="content-header">群体洞察配置</div> */}
        <div className="herder-page back-config">
          <div className="cloud-config">
            <p className="config-title">
              <span style={{marginRight: '8px'}}>数据源配置</span>
              {/* <FormOutlined className="action" onClick={this.editClick} /> */}
            </p>
            <ModalForm {...formConfig} />
          </div>

          <div className="entity-config">
            <p className="config-title">实体配置</p>
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
            {/* {
              list.length ? (
                <div className="list-content">
                  <ListContent {...listConfig} />
                </div>
              ) : (
                <NoData {...noDataConfig} />
              )
            } */}
            {/* <div className="list-content">
              <Spin spinning={loading} tip="Loading">
                <ListContent {...listConfig} />
              </Spin>
            </div> */}
          </div>
          <EntityModal store={store} />
          <ConfigModal store={store} />
        </div>
      </Fragment>
    )
  }
}
