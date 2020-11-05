import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'
import {debounce} from '../../common/util'

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
    return [{
      label: 'API名称',
      key: 'apiName',
      component: 'input',
      rules: [
        '@namePattern',
        '@nameUnderline',
        '@nameShuQi',
        '@transformTrim',
        '@required',
        {validator: this.checkName},
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
        {pattern: /^\/[\w+/-]{0,}$/, message: '路径格式错误！支持英文、数字、下划线、连线符'},
        // {pattern: /^\/[a-zA-Z0-9!@]{0,}/, message: '请以/开头，支持英文、数字、下划线、连线符'},
        {validator: this.checkName},
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

  @action checkName = (rule, value, callback) => {
    const isName = rule.field === 'apiName'
    // debounce(() => this.store.checkName(isName, value, callback), 500)
    this.store.checkName(isName, value, callback)
  }

  submit = () => {
    const {store} = this
    this.form.validateFields((err, values) => {
      if (!err) {
        store.createApi(values)
      }
    })
  }

  render() {
    const {
      visible,
      confirmLoading,
    } = this.store

    const modalConfig = {
      title: '新建API',
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
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    
    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
