import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'
import {limitSelect} from '../../common/util'

@observer
export default class ApiModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    const {
      apiGroupList = [],
    } = this.store
    console.log(toJS(apiGroupList))
    return [{
      label: 'API名称',
      key: 'apiName',
      component: 'input',
      rules: [
        '@transformTrim',
        '@required',
      ],
    }, {
      label: 'API分组',
      key: 'apiGroupId',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: apiGroupList,
      },
      component: 'select',
    }, {
      label: 'API路径',
      key: 'apiPath',
      rules: [
        '@transformTrim',
        '@required',
        {pattern: /^\//, message: '请以/开头'},
      ],
      placeholder: '请输入以/开头的API路径',
      component: 'input',
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
    this.store.visible = false
  }

  submit = () => {
    const {store} = this
    this.form.validateFields((err, values) => {
      if (!err) {
        store.createApi(values)
        console.log(values)
      }
    })
  }

  render() {
    const {
      visible,
    } = this.store

    const modalConfig = {
      title: '新建API',
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
      <Modal {...modalConfig} className="add-group">
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
