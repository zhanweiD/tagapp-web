import intl from 'react-intl-universal'
import { Component } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Modal, Spin } from 'antd'
import { ModalForm } from '../../component'

@observer
class ModalAdd extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  componentDidMount() {
    this.store.selecStorageType = this.selectStorageType
    this.store.selectStorage = this.selectStorage
    this.store.getDefaultStorage && this.store.getDefaultStorage()
  }

  @action.bound selectStorageType(type) {
    this.form.resetFields(['objId'])
    this.store.getStorageList(
      {
        storageType: type,
      }
      // v => this.form.setFieldsValue({ storageId: v })
    )
  }

  @action.bound selectStorage(id) {
    this.form.resetFields(['objId'])
    this.store.getObjList({
      storageId: id,
    })
  }

  selectContent = () => {
    const {
      info,
      storageType,
      storageSelectList,
      storageTypeLoading,
      storageSelectLoading,
      objList,
      defaultStorage,
    } = this.store

    return [
      {
        label: intl
          .get('ide.src.page-scene.scene.modal.u64o3kawqi')
          .d('场景名称'),
        key: 'name',
        initialValue: info.name,
        component: 'input',
        rules: [
          '@namePattern',
          '@nameUnderline',
          '@nameShuQi',
          '@transformTrim',
          '@required',
          '@max32',
          { validator: this.handleNameValidator },
        ],
      },

      {
        label: intl
          .get('ide.src.component.group-provider.configModal.lr6a4qimbzk')
          .d('数据源类型'),
        key: 'dataStorageType',
        initialValue: info.dataStorageType || defaultStorage.storageType,
        disabled: defaultStorage.storageType,
        rules: ['@requiredSelect'],

        control: {
          options: toJS(storageType),
          onSelect: v => this.selectStorageType(v),
          notFoundContent: storageTypeLoading ? <Spin size="small" /> : null,
        },

        component: 'select',
      },
      {
        label: intl
          .get('ide.src.component.group-provider.configModal.emv6widuog')
          .d('数据源'),
        key: 'storageId',
        initialValue: info.dataStorageId || defaultStorage.storageId,
        disabled: defaultStorage.storageId,
        rules: ['@requiredSelect'],

        control: {
          options: toJS(storageSelectList),
          onSelect: v => this.selectStorage(v),
          notFoundContent: storageSelectLoading ? <Spin size="small" /> : null,
        },

        component: 'select',
        // extra: <span>
        //   若无可用的数据源，请先
        //   <a target="_blank" rel="noopener noreferrer" href={`/asset-tag/index.html#/project/${this.store.projectId}`}>去项目配置中添加目的数据源</a>
        // </span>,
      },
      {
        label: intl.get('ide.src.page-scene.scene.modal.j1g9cmsu22g').d('对象'),
        key: 'objId',
        initialValue: info.objId,
        rules: ['@requiredSelect'],

        control: {
          options: toJS(objList),
        },

        component: 'select',
        extra: (
          <span>
            {intl
              .get('ide.src.page-scene.scene.modal.aoebr92r1pd')
              .d('若无可用的对象，请先')}

            <a
              className="ml4"
              target="_blank"
              rel="noopener noreferrer"
              href="/tag-model/index.html#/manage/tag-sync"
            >
              {intl
                .get('ide.src.page-scene.scene.modal.duucwqiuddf')
                .d('去标签同步中添加同步计划')}
            </a>
          </span>
        ),
      },
      {
        label: intl
          .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
          .d('描述'),
        key: 'descr',
        initialValue: info.descr,
        component: 'textArea',
        rules: ['@max128'],
      },
    ]
  }

  @action handleCancel = () => {
    this.store.modalVisible = false
    this.handleReset()
  }

  @action handleReset = () => {
    this.form.resetFields()
    this.store.info = {}
    this.store.isEdit = false
  }

  @action handleSubmit = e => {
    const { store } = this.props

    this.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      if (store.isEdit) {
        store.editScene(
          {
            occasionId: store.info.id,
            ...values,
          },
          () => {
            this.handleReset()
          }
        )
      } else {
        store.addScene(values, () => {
          this.handleReset()
        })
      }
    })
  }

  checkName = (rule, value, callback) => {
    const params = {
      name: value,
    }

    if (this.store.info && this.store.info.id) {
      params.id = this.store.info.id
    }

    this.store.checkName(params, callback)
  }

  // 名称查重校验
  @action handleNameValidator = (rule, value = '', callback) => {
    const { info } = this.store

    // 后端校验
    const params = {
      name: value,
    }

    if (info.id) {
      params.occasionId = info.id
    }

    this.store.checkName(params, callback)
  }

  render() {
    const {
      store: { modalVisible: visible, isEdit, confirmLoading },
    } = this.props

    const modalConfig = {
      title: isEdit
        ? intl.get('ide.src.page-scene.scene.modal.jzwmor14h5').d('编辑场景')
        : intl.get('ide.src.page-scene.scene.main.k292pc7w0no').d('添加场景'),
      visible,
      onCancel: this.handleCancel,
      onOk: this.handleSubmit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
    }

    const formConfig = {
      selectContent: visible && this.selectContent(),
      wrappedComponentRef: form => {
        this.form = form ? form.props.form : form
      },
    }

    return (
      <Modal {...modalConfig}>
        <ModalForm {...formConfig} />
      </Modal>
    )
  }
}
export default ModalAdd
