import intl from 'react-intl-universal'
import { Component, Fragment } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Modal, Spin } from 'antd'
import { ModalForm } from '../../component'
import { debounce } from '../../common/util'

@observer
class ApiModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent = () => {
    const { apiGroupList = [] } = this.store
    return [
      {
        label: intl
          .get('ide.src.page-group.group-detail.apiModal.qmpxjtv0okp')
          .d('API名称'),
        key: 'apiName',
        component: 'input',
        rules: [
          '@namePattern',
          '@nameUnderline',
          '@nameShuQi',
          '@transformTrim',
          '@required',
          { validator: this.checkName },
        ],
      },

      {
        label: intl
          .get('ide.src.page-group.group-detail.apiModal.7ahbhozrn99')
          .d('API分组'),
        key: 'apiGroupId',
        rules: ['@requiredSelect'],

        control: {
          options: apiGroupList,
        },

        component: 'select',
      },
      {
        label: intl
          .get('ide.src.page-group.group-detail.apiModal.6x247exi6cr')
          .d('API路径'),
        key: 'apiPath',
        rules: [
          '@transformTrim',
          '@required',
          {
            pattern: /^\/[\w+/-]{0,}$/,
            message: intl
              .get('ide.src.page-group.group-detail.apiModal.7us26s2rs6h')
              .d('路径格式错误！支持英文、数字、下划线、连线符'),
          },
          // {pattern: /^\/[a-zA-Z0-9!@]{0,}/, message: '请以/开头，支持英文、数字、下划线、连线符'},
          { validator: this.checkName },
        ],

        placeholder: intl
          .get('ide.src.page-group.group-detail.apiModal.ccvjjupujyb')
          .d('请输入以/开头的API路径'),
        component: 'input',
      },
      {
        label: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        key: 'descr',
        component: 'textArea',
        rules: ['@max128'],
      },
    ]
  }

  @action handleCancel = () => {
    this.store.visible = false
  }

  @action checkName = (rule, value, callback) => {
    const isName = rule.field === 'apiName'
    // debounce(() => this.store.checkName(isName, value, callback), 500)
    this.store.checkName(isName, value, callback)
  }

  submit = () => {
    const { store } = this
    this.form.validateFields((err, values) => {
      if (!err) {
        store.createApi(values)
      }
    })
  }

  render() {
    const { visible, confirmLoading } = this.store

    const modalConfig = {
      title: intl
        .get('ide.src.page-group.group-detail.apiModal.dkcjh0h4zic')
        .d('新建API'),
      visible,
      maskClosable: false,
      closable: true,
      onCancel: this.handleCancel,
      onOk: this.submit,
      confirmLoading,
      width: 525,
      destroyOnClose: true,
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
export default ApiModal
