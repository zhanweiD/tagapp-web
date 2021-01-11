import intl from 'react-intl-universal'
import { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Modal, Spin, Button, Popconfirm } from 'antd'
import { ModalForm } from '../../component'
import { errorTip } from '../../common/util'

@observer
class ConfigModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  componentDidMount() {
    this.store.selecStorageType = this.selectDataTypeSource
    this.store.getDefaultStorage()
  }

  @action.bound selectDataTypeSource(storageTypeId) {
    // this.form.setFieldsValue({storageId: undefined})
    this.store.getDataSource(storageTypeId, v =>
      this.form.setFieldsValue({ storageId: v })
    )
  }

  formItemLayout = () => {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      colon: false,
    }
  }

  selectContent = () => {
    const {
      selectLoading,
      dataSource = [],
      dataTypeSource = [],
      projectId,
      config,
      defaultStorage,
    } = this.store
    return [
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
          .d('数据源类型'),
        key: 'type',
        initialValue: config.dataStorageType || defaultStorage.storageType,
        disabled: defaultStorage.storageType,
        rules: ['@requiredSelect'],

        control: {
          options: dataTypeSource,
          onSelect: v => this.selectDataTypeSource(v),
          notFoundContent: selectLoading ? <Spin size="small" /> : null,
        },

        component: 'select',
      },
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.emv6widuog')
          .d('数据源'),
        key: 'storageId',
        initialValue: config.dataStorageId || defaultStorage.storageId,
        disabled: defaultStorage.storageId,
        rules: ['@requiredSelect'],

        control: {
          options: dataSource,
          notFoundContent: selectLoading ? <Spin size="small" /> : null,
        },

        selectLoading, // 下拉框loading效果
        component: 'select',
        extra: (
          <span>
            {intl
              .get('ide.src.component.group-provider.configModal.0mwcc6wfg5wg')
              .d('若无可用的数据源，请到')}

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/project/index.html?projectId=${projectId}#/detail/env`}
            >
              {intl
                .get('ide.src.component.group-provider.configModal.q91fhtwldmm')
                .d('项目管理-环境配置')}
            </a>
            {intl
              .get('ide.src.component.group-provider.configModal.q8xp8rn929s')
              .d('中添加数据源')}
          </span>
        ),
      },
    ]
  }

  @action handleCancel = () => {
    this.store.visible = false
    this.store.isInit = true
  }

  @action submit = () => {
    this.form.validateFields((err, value) => {
      if (!err) {
        this.store.confirmLoading = true
        if (this.store.isInit) {
          this.store.groupInit(value)
        } else {
          this.store.updateInit(value)
        }
      } else {
        this.store.confirmLoading = false
        errorTip(err)
      }
    })
  }

  render() {
    const { visible, confirmLoading, isInit, defaultStorage } = this.store

    const modalConfig = {
      title: isInit
        ? intl
            .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
            .d('初始化')
        : intl
            .get('ide.src.page-config.group-config.configModal.ei8tqkc9hsq')
            .d('修改初始化'),
      visible,
      onCancel: this.handleCancel,
      // onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
      footer: [
        <Button onClick={this.handleCancel}>
          {intl
            .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
            .d('取消')}
        </Button>,
        <Popconfirm
          title={intl
            .get('ide.src.page-config.group-config.configModal.1344afvlxyxo')
            .d('更改后原数据源中的群体及群体下的API都将会失效，请谨慎操作。')}
          disabled={defaultStorage.storageId}
          onCancel={() => {}}
          onConfirm={this.submit}
          okText={intl
            .get('ide.src.page-config.group-config.configModal.ib8g44r6o1')
            .d('确认')}
          cancelText={intl
            .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
            .d('取消')}
        >
          <Button disabled={defaultStorage.storageId} type="primary">
            {intl
              .get('ide.src.page-config.group-config.configModal.pub6abalqca')
              .d('确定')}
          </Button>
        </Popconfirm>,
      ],
    }

    const modalConfigC = {
      title: isInit
        ? intl
            .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
            .d('初始化')
        : intl
            .get('ide.src.page-config.group-config.configModal.ei8tqkc9hsq')
            .d('修改初始化'),
      visible,
      onCancel: this.handleCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
    }

    const formConfig = {
      selectContent: visible && this.selectContent(),
      formItemLayout: visible && this.formItemLayout(),
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
    }

    return isInit ? (
      <Modal {...modalConfigC}>
        <ModalForm {...formConfig} />
      </Modal>
    ) : (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
export default ConfigModal
