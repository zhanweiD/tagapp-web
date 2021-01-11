import intl from 'react-intl-universal'
import { Component } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Modal } from 'antd'
import { ModalForm } from '../../component'

@observer
class ModalInit extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action.bound selectStorageType(type) {
    this.form.resetFields(['dataStorageId'])
    this.store.getStorageList({
      dataStorageType: type,
    })
  }

  selectContent = () => {
    const { storageType, storageList } = this.store

    return [
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
          .d('数据源类型'),
        key: 'dataStorageType',
        component: 'select',
        rules: ['@requiredSelect'],

        control: {
          options: toJS(storageType),
          onSelect: v => this.selectStorageType(v),
        },
      },

      {
        label: intl
          .get('ide.src.component.group-provider.configModal.emv6widuog')
          .d('数据源'),
        key: 'dataStorageId',
        component: 'select',
        rules: ['@requiredSelect'],

        control: {
          options: toJS(storageList),
        },
      },
    ]
  }

  @action handleCancel = () => {
    this.store.visibleInit = false
    this.store.loadingInit = false
  }

  submit = () => {
    this.store.isInit = true
    this.form.validateFields((err, values) => {
      if (!err) {
        this.store.initSearch(values)
      }
    })
  }

  render() {
    const { visibleInit } = this.store
    const modalConfig = {
      title: intl
        .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
        .d('初始化'),
      visible: visibleInit,
      onCancel: this.handleCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      // confirmLoading,
    }

    const formConfig = {
      selectContent: visibleInit && this.selectContent(),
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
export default ModalInit
