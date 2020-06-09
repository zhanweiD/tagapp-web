import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'

@observer
export default class ConfigModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action.bound selectDataSource(storageId) {
    // this.form.resetFields(['engineId'])
    // this.store.getEnginesSource(storageId)
    console.log(storageId)
  }
  @action.bound selectDataTypeSource(storageTypeId) {
    // this.form.resetFields(['engineId'])
    // this.store.getEnginesSource(storageId)
    console.log(storageTypeId)
    // this.store.getDataTypeSource()
  }

  formItemLayout = () => {
    return ({
      labelCol: {span: 6},
      wrapperCol: {span: 18},
      colon: false,
    })
  }

  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      // initialValue: detail.type,
      placeholder: '请选择',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataTypeSource,
        onSelect: v => this.selectDataTypeSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '数据源',
      key: 'storageId',
      // initialValue: detail.dataStorageId,
      placeholder: '请选择',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataSource,
        onSelect: v => this.selectDataSource(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
    }]
  }

  @action handleCancel = () => {
    this.store.visible = false
    this.store.closeModal()
  }

  @action submit = () => {
    this.form.validateFields((err, value) => {
      if (!err) {
        // this.store.groupInit(value)
        this.store.initVisible = false
        this.store.visible = false
        this.store.closeModal()
      }
    })
  }

  render() {
    console.log(this)
    const {
      visible, 
      confirmLoading,
    } = this.store
    const modalConfig = {
      title: '初始化',
      visible,
      onCancel: this.handleCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
    }
    
    const formConfig = {
      selectContent: visible && this.selectContent(),
      formItemLayout: visible && this.formItemLayout(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
