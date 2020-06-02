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
              <a href>移除</a>
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
    console.log(1)
    this.store.entityVisible = true
    this.store.modalType = type
    // this.store.getDataSource()
    // if (type === 'edit') {
    //   this.store.getEnginesSource(data.dataStorageId)
    // }
    // this.store.getGroups()
  }

  /**
   * @description 删除项目
   * @param id 项目ID
   */
  delItem = id => {
    this.store.delList(id)
  }

  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataTypeSource = [],
      initVisible,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: 1,
      disabled: true,
      rules: [
        '@requiredSelect',
      ],
      control: {
        // options: dataTypeSource,
        options: [
          {
            value: 1,
            name: 'Mysql',
          },
          {
            value: 2,
            name: 'Oracle',
          },
          {
            value: 11,
            name: 'PostgreSQL',
          },
          {
            value: 10,
            name: 'Greenplum',
          },
          {
            value: 4,
            name: 'Hive',
          },
        ],
        onSelect: v => this.selectDataTypeSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      initialValue: '1583289421353fdnk',
      disabled: true,
      rules: [
        '@requiredSelect',
      ],
      control: {
        // options: dataSource,
        options: [
          {
            value: "1583289421353fdnk",
            name: "testdatasource",
          },
          {
            value: "15839289253985ouc",
            name: "1234",
          },
        ],
        onSelect: v => this.selectDataSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
    }]
  }
  render() {
    const {store} = this
    const {
      initVisible,
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
      <div style={{display: initVisible ? 'none' : 'block'}} className="back-config">
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
