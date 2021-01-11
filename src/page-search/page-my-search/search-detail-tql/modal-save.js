import intl from 'react-intl-universal'
import { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import { Modal } from 'antd'
import { ModalForm } from '../../../component'
import { debounce } from '../../../common/util'

@observer
class ModalSave extends Component {
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
        component: 'input',
        initialValue: detail.name,
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
        component: 'textArea',
        initialValue: detail.descr,
        rules: ['@max128'],
      },
    ]
  }

  @action handleCancel = () => {
    this.store.visibleSave = false
    this.store.modalSaveLoading = false
    // this.store.log = ''
    // this.store.tql = ''
  }

  @action submit = () => {
    const t = this
    const { store } = t

    this.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          id: store.searchId,
        }

        store.saveSearch(params, () => {
          t.handleCancel()
        })
      }
    })
  }

  @action checkName = (rule, value, callback) => {
    const params = {
      id: +this.store.searchId,
      name: value,
    }

    debounce(() => this.store.checkName(params, callback), 500)
    // this.store.checkName(params, callback)
  }

  render() {
    const { visibleSave, modalSaveLoading } = this.store
    const modalConfig = {
      title: intl
        .get('ide.src.page-search.page-data-search.tql.modal-save.6nv9c6pianp')
        .d('保存数据查询'),
      visible: visibleSave,
      onCancel: this.handleCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading: modalSaveLoading,
    }

    const formConfig = {
      selectContent: visibleSave && this.selectContent(),
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
export default ModalSave
