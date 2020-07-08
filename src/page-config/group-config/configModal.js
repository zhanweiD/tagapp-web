import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'
import {errorTip} from '../../common/util'

@observer
export default class ConfigModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action.bound selectDataSource(storageId) {
    this.store.dataStorageId = storageId
  }
  @action.bound selectDataTypeSource(storageTypeId) {
    this.form.resetFields(['storageId'])
    this.store.dataStorageTypeId = storageTypeId
    this.store.getDataSource()
  }

  formItemLayout = () => {
    return ({
      labelCol: {span: 5},
      wrapperCol: {span: 19},
      colon: false,
    })
  }

  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataTypeSource = [],
      dataStorageTypeId,
      dataStorageId,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      placeholder: '请选择',
      initialValue: dataStorageTypeId,
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
      placeholder: '请选择',
      initialValue: dataStorageId,
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
  }

  @action submit = () => {
    this.form.validateFields((err, value) => {
      if (!err) {
        this.store.confirmLoading = true
        this.store.groupInit(value)
      } else {
        this.store.confirmLoading = false
        errorTip(err)
      }
    })
  }

  render() {
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
