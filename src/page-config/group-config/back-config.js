import intl from 'react-intl-universal'
import { Component, Fragment } from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Button, Popconfirm, Badge, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { ModalForm, ListContent, Authority } from '../../component'
import { Time } from '../../common/util'

import EntityModal from './entityModal'
import ConfigModal from './configModal'

@inject('store')
@observer
class BackConfig extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  columns = [
    {
      key: 'objName',
      title: intl
        .get('ide.src.page-config.group-config.back-config.6j9sxet7f2h')
        .d('实体名称'),
      dataIndex: 'objName',
    },
    {
      key: 'objDescr',
      title: intl
        .get('ide.src.page-config.group-config.back-config.ka08nk7y2t')
        .d('实体描述'),
      dataIndex: 'objDescr',
      render: text => text || '-',
    },
    {
      key: 'addTime',
      title: intl
        .get('ide.src.page-config.group-config.back-config.by767u9t23')
        .d('添加时间'),
      dataIndex: 'addTime',
      render: text => <Time timestamp={text} />,
    },
    {
      key: 'isUsed',
      title: intl
        .get('ide.src.page-config.group-config.back-config.hs0z3ao22hu')
        .d('使用状态'),
      dataIndex: 'isUsed',
      render: use => (
        <Badge
          status={use ? 'success' : 'default'}
          text={
            use
              ? intl
                  .get(
                    'ide.src.page-config.group-config.back-config.ec2lmau5zn'
                  )
                  .d('使用中')
              : intl.get('ide.src.component.tag.tag.sz5nencfou8').d('未使用')
          }
        />
      ),
    },
    {
      key: 'action',
      title: intl
        .get('ide.src.page-config.group-config.back-config.0pwwx1kvm4p')
        .d('操作'),
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
              {intl
                .get('ide.src.component.label-item.label-item.hemrpkpmmb8')
                .d('编辑')}
            </a>
            {/* <span className="table-action-line" /> */}
          </Fragment>
          <Fragment>
            <Popconfirm
              placement="topRight"
              title={intl
                .get(
                  'ide.src.page-config.group-config.back-config.0iv90gap73qb'
                )
                .d('你确认要移除该实体吗？')}
              onConfirm={() => this.delItem(record.objId)}
            >
              <a disabled={record.isUsed} href>
                {intl
                  .get(
                    'ide.src.page-config.group-config.back-config.kovby4adjrk'
                  )
                  .d('移除')}
              </a>
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
      this.store.getAnalyzeTags(data.objId)
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

  selectContent = () => {
    const { dataSource = [], dataTypeSource = [], config } = this.store
    return [
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
          .d('数据源类型'),
        key: 'type',
        initialValue: config.dataStorageType,
        disabled: true,
        control: {
          options: dataTypeSource,
        },

        component: 'select',
      },
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.emv6widuog')
          .d('数据源'),
        key: 'storageId',
        initialValue: config.dataStorageId,
        disabled: true,
        control: {
          options: dataSource,
        },

        component: 'select',
      },
    ]
  }
  render() {
    const { store } = this
    const { projectId, visible } = store
    const formConfig = {
      labelAlign: 'left',
      selectContent: this.selectContent(),
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
    }

    const listConfig = {
      initParams: { projectId },
      columns: this.columns,
      buttons: [
        <Button type="primary" onClick={() => this.openModal('add')}>
          {intl
            .get('ide.src.page-config.group-config.back-config.igp34mpq7dm')
            .d('添加实体')}
        </Button>,
      ],
      store, // 必填属性
    }

    return (
      <Fragment>
        {/* <div className="content-header">群体洞察配置</div> */}
        <div className="herder-page back-config">
          <div>
            <div className="config-title config-df">
              <span>
                {intl
                  .get(
                    'ide.src.page-config.group-config.back-config.o8x5qevsg0e'
                  )
                  .d('数据源配置')}
              </span>
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
                <Button type="primary" onClick={this.editClick}>
                  {intl
                    .get('ide.src.component.label-item.label-item.hemrpkpmmb8')
                    .d('编辑')}
                </Button>
              </Authority>
            </div>
            <ModalForm className="cloud-config" {...formConfig} />
          </div>

          <div className="entity-config mt12">
            <p className="config-title">
              {intl
                .get('ide.src.page-config.group-config.back-config.5pgk1wh6w6x')
                .d('实体配置')}
            </p>
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
          </div>
          <EntityModal store={store} />
          {visible ? <ConfigModal store={store} /> : null}

          {/* <ConfigModal store={store} /> */}
        </div>
      </Fragment>
    )
  }
}
export default BackConfig
