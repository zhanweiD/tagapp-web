import intl from 'react-intl-universal'
import { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Modal } from 'antd'
import { ModalForm } from '../../../component'
import { debounce } from '../../../common/util'

@observer
class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent = () => {
    const { detail } = this.store

    return [
      {
        label: intl
          .get('ide.src.page-search.page-data-search.tql.modal-save.z1eu3p4uvm')
          .d('数据查询名称'),
        key: 'name',
        initialValue: detail.name,
        component: 'input',
        rules: [
          '@namePattern',
          '@nameUnderline',
          '@nameShuQi',
          '@transformTrim',
          '@required',
          '@max32',
          { validator: this.checkName }, // here warning
        ],
      },
      {
        label: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        key: 'descr',
        initialValue: detail.descr,
        component: 'textArea',
        rules: ['@max128'],
      },
    ]
  }

  @action handleCancel = () => {
    this.store.detail = {}
    this.store.visibleEdit = false
  }

  submit = () => {
    const { detail } = this.store
    const t = this

    this.store.confirmLoading = true
    this.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          id: detail.id,
          ...values,
        }

        this.store.edit(params, () => {
          t.handleCancel()
          t.props.refresh()
        })
      }
    })
  }

  @action checkName = (rule, value, callback) => {
    const { detail } = this.store

    const params = {
      id: detail.id,
      name: value,
    }

    debounce(() => this.store.checkName(params, callback), 500)
    // this.store.checkName(params, callback)
  }

  render() {
    const { visibleEdit, confirmLoading } = this.store

    const modalConfig = {
      title: intl
        .get('ide.src.page-search.page-my-search.my-search.modal.ziyqo3w04dm')
        .d('编辑数据查询'),
      visible: visibleEdit,
      onCancel: this.handleCancel,
      onOk: this.submit,
      confirmLoading,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
    }

    const formConfig = {
      selectContent: visibleEdit && this.selectContent(),
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        colon: false,
      },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
export default ModalEdit
