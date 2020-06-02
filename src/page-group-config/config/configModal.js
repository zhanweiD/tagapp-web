import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
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

  /**
   * @description 选择数据源；请求计算引擎
   * @param {*} storageId 数据源id
   */
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


  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '数据源类型',
      key: 'type',
      // initialValue: 'hive',
      placeholder: '请选择',
      rules: [
        '@requiredSelect',
      ],
      control: {
        // options: dataTypeSource,
        options: [
          {
            value: 1,
            name: 'Mysql',
          },
          {
            value: 2,
            name: 'Oracle',
          },
          {
            value: 11,
            name: 'PostgreSQL',
          },
          {
            value: 10,
            name: 'Greenplum',
          },
          {
            value: 4,
            name: 'Hive',
          },
        ],
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
        // options: dataSource,
        options: [
          {
            value: "1583289421353fdnk",
            name: "testdatasource",
          },
          {
            value: "15839289253985ouc",
            name: "1234",
          },
        ],
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
    this.store.initVisible = false
    this.store.visible = false
    this.store.closeModal()
  }

  // checkName = (rule, value, callback) => {
  //   const params = {
  //     name: value,
  //   }

  //   if (this.store.detail.id) {
  //     params.id = this.store.detail.id
  //   }

  //   this.store.checkName(params, callback)
  // }

  render() {
    const {
      visible, confirmLoading,
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
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
