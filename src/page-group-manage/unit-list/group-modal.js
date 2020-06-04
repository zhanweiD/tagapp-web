import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin, Icon} from 'antd'
import {ModalForm} from '../../component'

@observer
export default class GroupModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    const {
      detail, 
      selectLoading, 
      selectEnginesLoading,
      selectGroupsLoading,
      dataSource = [], 
      dataEnginesSource = [], 
      dataGroupData = [],
    } = this.store
    return [{
      label: '群体名称',
      key: 'name',
      component: 'input',
      rules: [
        '@transformTrim',
        '@required',
        '@max32',
        {validator: this.checkName},
      ],
    }, {
      label: '群体标识',
      key: 'queueName',
      component: 'input',
      rules: [
        '@transformTrim',
        '@required',
        '@max32',
      ],
    }, {
      label: '描述',
      key: 'descr',
      component: 'textArea',
      rules: [
        '@max128',
      ],
    }]
  }

  submit = () => {
    const {store} = this
    this.form.validateFields((err, values) => {
      if (!err) {
        store.addList(values, () => {
          this.handleCancel()
        })
      }
    })
  }

  @action handleCancel = () => {
    this.store.visible = false
  }

  checkName = (rule, value, callback) => {
    const params = {
      name: value,
    }

    if (this.store.detail.id) {
      params.id = this.store.detail.id
    }

    this.store.checkName(params, callback)
  }

  render() {
    const {
      visible,
    } = this.store
    const modalConfig = {
      title: '保存群体',
      visible,
      maskClosable: false,
      closable: true,
      onCancel: this.handleCancel,
      onOk: this.submit,
      width: 525,
      destroyOnClose: true,
    }

    const formConfig = {
      selectContent: visible && this.selectContent(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
