import {Component} from 'react'
import {action, toJS} from 'mobx'
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
      key: 'name',
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
      component: 'textArea',
      rules: [
        '@max128',
      ],
    }]
  }

  @action handleCancel = () => {
    this.store.saveParams = {}
    this.store.visibleSave = false
    this.store.modalSaveLoading = false
  }

  @action submit = () => {
    const t = this
    const {store} = t

    this.form.validateFields((err, values) => {
      if (!err) {
        const params = {
          ...values,
          ...toJS(store.saveParams),
        }

        store.saveSearch(params, () => {
          t.handleCancel()
        })
      }
    })
  }


  @action checkName = (rule, value, callback) => {
    const params = {
      name: value,
    }

    this.store.checkName(params, callback)
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
