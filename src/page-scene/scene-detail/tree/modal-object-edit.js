import intl from 'react-intl-universal'
/**
 * 场景详情标签树-选择对象弹窗
 */
import {Component} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Form} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import {Modal, Spin, Cascader, Tooltip} from 'antd'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'

const FormItem = Form.Item

@inject('bigStore')
@observer
class ModalObjectEdit extends Component {
  constructor(props) {
    super(props)
    this.bigStore = props.bigStore
    this.store = this.bigStore.categoryStore
  }

  @action.bound handleOnCancel() {
    const {form} = this.props
    // this.store.objectDetail = false
    this.store.modalVisible.editObject = false
    form.resetFields()
  }

  @action.bound handleOnOk() {
    const {
      form: {validateFields},
    } = this.props

    validateFields((err, values) => {
      if (err) {
        return
      }
      const params = {
        objId: values.objIds[1],
      }

      this.store.saveObj(params)
    })
  }

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props
    const {modalVisible, confirmLoading, selectObj} = this.store

    // 场景对象操作包括：选择对象; 没有编辑对象
    const modalProps = {
      title: intl
        .get(
          'ide.src.page-scene.scene-detail.tree.modal-object-edit.xv4ml9fcak'
        )
        .d('选择对象'),
      visible: modalVisible.editObject,
      onCancel: this.handleOnCancel,
      onOk: this.handleOnOk,
      maskClosable: false,
      width: 520,
      destroyOnClose: true,
      confirmLoading,
    }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 19},
      colon: false,
    }

    return (
      <Modal {...modalProps}>
        <Form>
          <Spin spinning={this.store.detailLoading}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  {intl
                    .get(
                      'ide.src.page-scene.scene-detail.tree.modal-object-edit.4k26i5ecduj'
                    )
                    .d('对象名称')}

                  <Tooltip
                    title={intl
                      .get(
                        'ide.src.page-scene.scene-detail.tree.modal-object-edit.n9c9nnbmue'
                      )
                      .d(
                        '选择对象时，只能单选一个实体/关系，以便场景里的标签可合成一张数据表，通过一个API输出'
                      )}
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('objIds', {
                rules: [
                  {
                    required: true,
                    message: intl
                      .get(
                        'ide.src.page-scene.scene-detail.tree.modal-object-edit.lzsv0ohp9d'
                      )
                      .d('请选择对象'),
                  },
                ],
              })(
                <Cascader
                  size="small"
                  options={selectObj.slice()}
                  expandTrigger="hover"
                  placeholder={intl
                    .get(
                      'ide.src.page-scene.scene-detail.tree.modal-object-edit.lzsv0ohp9d'
                    )
                    .d('请选择对象')}
                />
              )}
            </FormItem>
          </Spin>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ModalObjectEdit)
