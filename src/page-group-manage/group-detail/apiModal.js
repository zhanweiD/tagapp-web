import {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {PlusCircleFilled} from '@ant-design/icons'
import {Modal, Spin} from 'antd'
import {ModalForm} from '../../component'

@observer
export default class ApiModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  selectContent= () => {
    const {
      selectLoading, 
      dataSource = [], 
      dataEnginesSource = [], 
      dataGroupData = [],
    } = this.store
    return [{
      label: 'API名称',
      key: 'name',
      component: 'input',
      rules: [
        '@transformTrim',
        '@required',
      ],
    }, {
      label: 'API路径',
      key: 'path',
      rules: [
        '@transformTrim',
        '@required',
      ],
      component: 'input',
    }, {
      label: '数据源',
      key: 'dataStorageId',
      mode: 'multiple',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataSource,
        onSelect: v => console.log(v),
        notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      selectLoading, // 下拉框loading效果
      component: 'select',
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
        const data = {
          ...values,
          groupIdList: [values.groupIdList],
        }

        // 编辑 
        if (store.modalType === 'edit') {
          const params = {id: store.detail.id, ...data}
          store.editList(params, () => {
            this.handleCancel()
          })
        } else {
          // 新增
          store.addList(data, () => {
            this.handleCancel()
          })
        }
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
