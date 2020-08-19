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

  @action.bound selectDataTypeSource(storageTypeId) {
    this.form.setFieldsValue({storageId: undefined})
    this.store.getDataSource(storageTypeId)
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
      config,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      placeholder: '请选择',
      initialValue: config.dataStorageType || undefined,
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
      initialValue: config.dataStorageId || undefined,
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataSource,
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
    }]
  }

  @action handleCancel = () => {
    this.store.visible = false
    this.store.isInit = true
  }

  @action submit = () => {
    this.form.validateFields((err, value) => {
      if (!err) {
        this.store.confirmLoading = true
        if (this.store.isInit) {
          this.store.groupInit(value)
        } else {
          this.store.updateInit(value)
        }
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
      isInit,
    } = this.store

    const modalConfig = {
      title: isInit ? '初始化' : '修改初始化',
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
