import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Modal} from 'antd'
import {ModalForm} from '../../../component'

@observer
export default class ModalEdit extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    const {detail} = this.store

    return [{
      label: '数据查询名称',
      key: 'name',
      initialValue: detail.name,
      component: 'input',
      rules: [
        '@transformTrim',
        '@required',
        '@max32',
        {validator: this.checkName}, // here warning
      ],
    }, {
      label: '描述',
      key: 'descr',
      initialValue: detail.descr,
      component: 'textArea',
      rules: [
        '@max128',
      ],
    }]
  }

  @action handleCancel = () => {
    this.store.detail = {}
    this.store.visibleEdit = false
  }

  submit = () => {
    const {detail} = this.store
    const t = this

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
    const {detail} = this.store

    const params = {
      id: detail.id,
      name: value,
    }

    this.store.checkName(params, callback)
  }

  render() {
    const {
      visibleEdit,
    } = this.store

    const modalConfig = {
      title: '编辑数据查询',
      visible: visibleEdit,
      onCancel: this.handleCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
    }
    
    const formConfig = {
      selectContent: visibleEdit && this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
      formItemLayout: {
        labelCol: {span: 5},
        wrapperCol: {span: 19},
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
