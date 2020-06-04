import {Component, Fragment} from 'react'
import {action, toJS, observe} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin, Popconfirm} from 'antd'
import {ModalForm, ListContent, NoData, AuthBox} from '../../component'
import {Time} from '../../common/util'

import EntityModal from './entityModal'

@observer
export default class GroupBackConfig extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    console.log(this.props)
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
      render: text => <span style={{color: text ? 'green' : ''}}>{text ? '使用中' : '未使用'}</span>,
    }, {
      key: 'action',
      title: '操作',
      width: 250,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            <a href onClick={() => this.openModal('edit', record)} style={{marginRight: '6px'}}>编辑</a>
          </Fragment>
          <Fragment>
            <Popconfirm placement="topRight" title="你确认要移除该实体吗？" onConfirm={() => this.delItem(record.id)}>
              <a disabled={record.isUsed} href>移除</a>
            </Popconfirm>
          </Fragment>
        </div>
      ),
    },
  ]

  /**
   * @description 打开弹窗
   * @param type 弹窗类型 编辑 / 添加(edit / add)
   */
  @action openModal = (type, data = {}) => {
    // this.store.detail = data
    this.store.entityVisible = true
    this.store.modalType = type
    if (type === 'add') {
      // this.store.getEntityList(data.objId)
      // this.store.getTagList(data.objId)
    }
    if (type === 'edit') {
      // this.store.getEntityInfo(data.objId)
    }
  }

  /**
   * @description 删除项目
   * @param id 项目ID
   */
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
      dataStorageTypeName,
      dataStorageName,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: dataStorageTypeName,
      disabled: true,
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataTypeSource,
        onSelect: v => this.selectDataTypeSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      initialValue: dataStorageName,
      disabled: true,
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataSource,
        onSelect: v => this.selectDataSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }]
  }
  render() {
    const {store} = this
    const {
      list,
    } = store

    const formConfig = {
      // selectContent: visible && this.selectContent(),
      labelAlign: 'right',
      selectContent: this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    const listConfig = {
      columns: this.columns,
      bordered: true,
      buttons: [<AuthBox code="asset_tag_project_add" type="primary" onClick={() => this.openModal('add')}>添加实体</AuthBox>],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="back-config">
        <div className="cloud-config">
          <p className="config-title">云资源配置</p>
          <ModalForm {...formConfig} />
        </div>
        <div className="entity-config">
          <p className="config-title">实体配置</p>
          {
            list.length ? (
              <div className="list-content">
                <ListContent {...listConfig} />
              </div>
            ) : (
              <NoData />
            )
          }
        </div>
        <EntityModal store={store} />
      </div>
    )
  }
}
