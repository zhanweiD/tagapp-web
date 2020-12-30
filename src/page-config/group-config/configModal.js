import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Modal, Spin, Button, Popconfirm} from 'antd'
import {ModalForm} from '../../component'
import {errorTip} from '../../common/util'

@observer
export default class ConfigModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  componentDidMount() {
    this.store.selecStorageType = this.selectDataTypeSource
    this.store.getDefaultStorage()
  }

  @action.bound selectDataTypeSource(storageTypeId) {
    // this.form.setFieldsValue({storageId: undefined})
    this.store.getDataSource(storageTypeId, v => this.form.setFieldsValue({storageId: v}))
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
      projectId,
      config,
      defaultStorage,
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      initialValue: config.dataStorageType || defaultStorage.storageType,
      disabled: defaultStorage.storageType,
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
      initialValue: config.dataStorageId || defaultStorage.storageId,
      disabled: defaultStorage.storageId,
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataSource,
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
      extra: (
        <span>
          若无可用的数据源，请到
          <a target="_blank" rel="noopener noreferrer" href={`/project/index.html?projectId=${projectId}#/detail/env`}>项目管理-环境配置</a>
          中添加数据源
        </span>
      ),
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
      defaultStorage,
    } = this.store

    const modalConfig = {
      title: isInit ? '初始化' : '修改初始化',
      visible,
      onCancel: this.handleCancel,
      // onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
      footer: [
        <Button onClick={this.handleCancel}>取消</Button>,
        <Popconfirm
          title="更改后原数据源中的群体及群体下的API都将会失效，请谨慎操作。"
          disabled={defaultStorage.storageId}
          onCancel={() => {}}
          onConfirm={this.submit}
          okText="确认"
          cancelText="取消"
        >
          <Button disabled={defaultStorage.storageId} type="primary">确定</Button>
        </Popconfirm>,
      ],
    }

    const modalConfigC = {
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
      isInit ? (
        <Modal {...modalConfigC}>
          <ModalForm {...formConfig} />
        </Modal>
      ) : (
        <Modal {...modalConfig}>
          <ModalForm {...formConfig} />
        </Modal>
      )
    )
  }
}
