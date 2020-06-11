import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Modal} from 'antd'
import {ModalForm} from '../../../component'

@observer
export default class ModalSave extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    return [{
      label: '数据查询名称',
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

  @action handleCancel = () => {
    this.store.visibleSave = false
  }

  submit = () => {
    const t = this
    const {store} = t

    this.form.validateFields((err, values) => {
      if (!err) {
        // 编辑 
        // if (store.modalType === 'edit') {
        //   const params = {id: store.detail.id, ...values}
        //   store.editList(params, () => {
        //     t.handleCancel()
        //   })
        // } else {
        //   // 新增
        //   store.addList(values, () => {
        //     t.handleCancel()
        //   })
        // }
      }
    })
  }

  render() {
    const {
      visibleSave, modalSaveLoading,
    } = this.store
    const modalConfig = {
      title: '保存数据查询',
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
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
