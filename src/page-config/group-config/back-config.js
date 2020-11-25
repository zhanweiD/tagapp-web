import {Component, Fragment} from 'react'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {Button, Popconfirm, Badge, message} from 'antd'
import {FormOutlined} from '@ant-design/icons'
import {ModalForm, ListContent, Authority} from '../../component'
import {Time} from '../../common/util'

import EntityModal from './entityModal'
import ConfigModal from './configModal'

@inject('store')
@observer
export default class BackConfig extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
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
      render: text => (text || '-'),
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
            <a 
              className="mr16"
              href
              onClick={() => this.openModal('edit', record)}
            >
              编辑
            </a>
            {/* <span className="table-action-line" /> */}
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
    this.store.getDataSource(this.store.config.dataStorageType)
    this.store.visible = true
    this.store.isInit = false
  }

  // 添加实体弹窗
  @action openModal = (type, data = {}) => {
    if (type === 'edit') {
      this.store.getTagList(data.objId)
      this.store.getEntityInfo(data.objId)
      this.store.getAnalyzeTags(data.objId)
      this.store.getCompareTags(data.objId)
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
      dataSource = [],
      dataTypeSource = [],
      config,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: config.dataStorageType,
      disabled: true,
      control: {
        options: dataTypeSource,
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      initialValue: config.dataStorageId,
      disabled: true,
      control: {
        options: dataSource,
      },
      component: 'select',
    }]
  }
  render() {
    const {store} = this
    const {projectId} = store
    const formConfig = {
      labelAlign: 'left',
      selectContent: this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    const listConfig = {
      initParams: {projectId},
      columns: this.columns,
      buttons: [<Button type="primary" onClick={() => this.openModal('add')}>添加实体</Button>],
      store, // 必填属性
    }

    return (
      <Fragment>
        {/* <div className="content-header">群体洞察配置</div> */}
        <div className="herder-page back-config">
          <div>
            <div className="config-title config-df">
              <span>数据源配置</span>
              {/* <FormOutlined className="action" onClick={this.editClick} /> */}
              <Authority authCode="tag_config:group_config[u]">
                {/* <Popconfirm
                  title="更改后原数据源中的群体及群体下的API都将会失效，请谨慎操作。"
                  onConfirm={this.editClick}
                  onCancel={() => {}}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button type="primary">编辑</Button>
                </Popconfirm> */}
                <Button type="primary" onClick={this.editClick}>编辑</Button>
              </Authority>
              
            </div>
            <ModalForm className="cloud-config" {...formConfig} />
          </div>

          <div className="entity-config mt12">
            <p className="config-title">实体配置</p>
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
          </div>
          <EntityModal store={store} />
          <ConfigModal store={store} />
        </div>
      </Fragment>
    )
  }
}
