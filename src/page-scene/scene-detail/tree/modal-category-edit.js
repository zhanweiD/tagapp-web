import intl from 'react-intl-universal'
/**
 * 场景详情标签树-类目(编辑/添加)弹窗
 */
import {Component} from 'react'
import {Form} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import {Modal, Input, Spin} from 'antd'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {getNamePattern, trimFormValues} from '../../../common/util'

const FormItem = Form.Item

@inject('bigStore')
@observer
class ModalEditCategory extends Component {
  constructor(props) {
    super(props)
    this.bigStore = props.bigStore
    this.store = this.bigStore.categoryStore
  }

  @action.bound handleOnCancel() {
    const {form} = this.props
    this.store.cateDetail = false
    this.store.modalVisible.editCategory = false
    form.resetFields()
  }

  @action.bound handleOnOk() {
    const {
      form: {validateFields},
    } = this.props
    const {
      eStatus: {editCategory},
      cateDetail,
      currentTreeItemKey,
    } = this.store
    // const {typeCode} = this.bigStore

    validateFields((err, values) => {
      if (!err) {
        values = trimFormValues(values)
        const params = {
          name: values.name,
          descr: values.descr,
        }

        // 判断节点父级是否为对象
        let parentIsObj = false

        // cateDetail.type = 2; 对象下添加类目; 父id字段为objId
        if (cateDetail.type) {
          params.objId = currentTreeItemKey
          parentIsObj = true
        } else {
          params.catId = currentTreeItemKey
        }

        // if (editCategory) {
        //   param.id = cateDetail.id
        //   param.parentId = cateDetail && cateDetail.parentId
        // } else {
        //   param.parentId = currentTreeItemKey
        // }

        this.store.updateCategory(params, parentIsObj)
      }
    })
  }

  @action.bound handleNameValidator(rule, value, callback) {
    const {
      currentTreeItemKey,
      eStatus: {editCategory},
    } = this.store
    if (value) {
      const params = {
        catId: currentTreeItemKey,
        name: value,
        isCatAdd: editCategory ? 0 : 1,
      }

      this.store.checkIsExist(params, res => {
        if (!res) {
          return callback(
            intl
              .get(
                'ide.src.page-scene.scene-detail.tree.modal-category-edit.1qbkwjgm0bg'
              )
              .d('名称已经存在')
          )
        }
        callback()
      })
    } else {
      callback()
    }
  }

  render() {
    const {
      form: {getFieldDecorator},
    } = this.props
    const {
      cateDetail,
      eStatus: {editCategory},
      modalVisible,
      confirmLoading,
    } = this.store

    const modalProps = {
      title: editCategory
        ? intl
          .get(
            'ide.src.page-scene.scene-detail.tree.modal-category-edit.jjahghtlt6'
          )
          .d('编辑类目')
        : intl
          .get('ide.src.page-scene.scene-detail.tree.main.xdj5y85lf1')
          .d('添加类目'),
      visible: modalVisible.editCategory,
      onCancel: this.handleOnCancel,
      onOk: this.handleOnOk,
      maskClosable: false,
      width: 520,
      destroyOnClose: true,
      confirmLoading,
    }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      colon: false,
    }

    return (
      <Modal {...modalProps}>
        <Form>
          <Spin spinning={this.store.detailLoading}>
            <FormItem
              {...formItemLayout}
              label={intl
                .get('ide.src.component.modal-stroage-detail.main.edltvfgaao8')
                .d('名称')}
            >
              {getFieldDecorator('name', {
                initialValue: editCategory ? cateDetail.name : undefined,
                rules: [
                  {
                    required: true,
                    message: intl
                      .get(
                        'ide.src.page-scene.scene-detail.tree.modal-category-edit.36a8m7v3e37'
                      )
                      .d('名称不可为空'),
                  },
                  ...getNamePattern(),
                  {validator: this.handleNameValidator},
                ],

                validateFirst: true,
              })(
                <Input
                  size="small"
                  autoComplete="off"
                  placeholder={intl
                    .get(
                      'ide.src.page-scene.scene-detail.tree.modal-category-edit.ma2xdd1yg1'
                    )
                    .d('不超过32个字，允许中文、英文、数字或下划线')}
                />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl
                .get(
                  'ide.src.page-scene.scene-detail.tree.modal-category-detail.mvsl0jh3vv'
                )
                .d('所属类目')}
            >
              {cateDetail.fullName || '--'}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl
                .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                .d('描述')}
            >
              {getFieldDecorator('descr', {
                rules: [
                  {transform: value => value && value.trim()},
                  {
                    max: 128,
                    message: intl
                      .get(
                        'ide.src.page-scene.scene-detail.tree.modal-category-edit.ko49x26yax'
                      )
                      .d('描述不能超过128个字符'),
                  },
                ],

                initialValue: editCategory ? cateDetail.descr : undefined,
              })(
                <Input.TextArea
                  size="small"
                  autoComplete="off"
                  rows="3"
                  placeholder={intl
                    .get(
                      'ide.src.page-scene.scene-detail.tree.modal-category-edit.n8kudtixc'
                    )
                    .d('不超过128个字')}
                />
              )}
            </FormItem>
          </Spin>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ModalEditCategory)
