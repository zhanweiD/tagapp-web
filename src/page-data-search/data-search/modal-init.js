import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Modal} from 'antd'
import {ModalForm} from '../../component'

@observer
export default class ModalInit extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    return [{
      label: '用户名',
      key: 'memberId',
      component: 'select',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: [],
      },
    }, {
      label: '角色',
      key: 'roleId',
      component: 'select',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: [],
      },
    }]
  }

  @action handleCancel = () => {
    this.store.visibleInit = false
  }

  submit = () => {
    const t = this
    const {store} = t
    this.store.isInit = true
    // this.form.validateFields((err, values) => {
    //   if (!err) {
    //     // store.editList(params, () => {
    //     //   t.handleCancel()
    //     // })
    //   }
    // })
  }

  render() {
    const {
      visibleInit,
    } = this.store
    const modalConfig = {
      title: '初始化',
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
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
