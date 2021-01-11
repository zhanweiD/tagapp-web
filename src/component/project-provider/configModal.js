import intl from 'react-intl-universal'
import { Component } from 'react'
import { Modal } from 'antd'
import ModalForm from '../modal-form'
// import {errorTip} from '../../common/util'

export default class ConfigModal extends Component {
  selectContent = () => {
    const { workspace = [] } = this.props
    return [
      {
        label: intl
          .get('ide.src.component.project-provider.back-config.vn924v29v1k')
          .d('环境'),
        key: 'workspaceId',
        placeholder: intl
          .get('ide.src.component.project-provider.configModal.weidrlhbqho')
          .d('请选择'),
        rules: ['@requiredSelect'],

        control: {
          options: workspace,
        },

        component: 'select',
      },
    ]
  }

  submit = () => {
    this.form.validateFields((err, value) => {
      if (!err) {
        this.props.submit(value)
      }
    })
  }

  render() {
    const {
      visible,
      handleCancel,
      // confirmLoading,
    } = this.props
    const modalConfig = {
      title: intl
        .get('ide.src.component.group-provider.configModal.bfrmtpmvxw')
        .d('初始化'),
      visible,
      onCancel: () => handleCancel(),
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      // confirmLoading,
    }

    const formConfig = {
      selectContent: visible && this.selectContent(),
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
