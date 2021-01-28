import intl from 'react-intl-universal'
import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Form, Icon as LegacyIcon} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import {Modal, Select, Button, Upload, message} from 'antd'
import {errorTip, limitSelect} from '../../common/util'

const {Option} = Select

@observer
class EModal extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.form = props.form
  }

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error(
        intl
          .get('ide.src.page-config.group-config.entityModal.fy1c6b67tvl')
          .d('请上传JPG/PNG格式图片!')
      )
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error(
        intl
          .get('ide.src.page-config.group-config.entityModal.24m2f4en7ug')
          .d('图片大小不能超过2MB!')
      )
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.store.imageUrl = reader.result
    }
    return false
  }

  submit = () => {
    const {store} = this

    this.form.validateFields((err, values) => {
      values.picture = store.imageUrl
      values.objId = +values.objId
      values.basicFeatureTag = values.basicFeatureTag.map(Number)
      values.markedFeatureTag = values.markedFeatureTag.map(Number)
      values.groupAnalyzeTag = values.groupAnalyzeTag.map(Number)
      values.groupCompareTag = values.groupCompareTag.map(Number)
      values.searchTag = values.searchTag.map(Number)

      if (!err) {
        store.confirmLoading = true
        // 编辑
        if (store.modalType === 'edit') {
          store.editEntity(values)
        } else {
          // 新增
          store.addEntity(values)
        }
      } else {
        store.confirmLoading = false
        errorTip(err)
      }
    })
  }
  @action selectEntity = value => {
    this.store.getTagList(value)
    this.store.getAnalyzeTags(value)
    this.form.resetFields()
    this.store.imageUrl = null
  }

  render() {
    const {getFieldDecorator} = this.form
    const {
      entityVisible,
      modalType,
      confirmLoading,
      imageUrl,
      uploadLoading,
      entityList,
      tagList,
      detail,
      modalCancel,
      analyzeTags,
      compareTags,
    } = this.store
    const modalConfig = {
      title:
        modalType === 'edit'
          ? intl
            .get('ide.src.page-config.group-config.entityModal.4dyf5xzjpvc')
            .d('编辑实体')
          : intl
            .get('ide.src.page-config.group-config.back-config.igp34mpq7dm')
            .d('添加实体'),
      visible: entityVisible,
      onCancel: modalCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
    }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      colon: false,
    }

    const uploadButton = (
      <div>
        <LegacyIcon type={uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <Modal {...modalConfig}>
        <Form {...formItemLayout}>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.back-config.6j9sxet7f2h')
              .d('实体名称')}
          >
            {getFieldDecorator('objId', {
              initialValue: detail.objId,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.h9r16mq3gr'
                    )
                    .d('请选择实体名称！'),
                },
              ],
            })(
              <Select
                size="small"
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.lfhhwzqa4i9'
                  )
                  .d('请选择实体名称')}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                disabled={modalType !== 'add'}
                onChange={value => this.selectEntity(value)}
              >
                {entityList}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.2olv0319cqn')
              .d('搜索条件')}
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.71fhshjv3xv')
              .d('在微观画像中使用，最多可选择2个。默认选中主标签')}
          >
            {getFieldDecorator('searchTag', {
              initialValue: detail.searchTag,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.4ozd08h6sae'
                    )
                    .d('请选择标签！'),
                },
                {
                  validator: (rule, values, callback) => limitSelect(rule, values, callback, 2),
                },
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.384eqs4ob2a'
                  )
                  .d('请选择实体下的标签')}
              >
                {/* {tagList} */}
                {analyzeTags.map(item => {
                  return (
                    <Option value={item.tagId.toString()}>
                      {item.tagName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.90cpt5e1ovd')
              .d('基本特征')}
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.7fmovnx486u')
              .d('在微观画像的基本信息中显示，最多可选择20个')}
          >
            {getFieldDecorator('basicFeatureTag', {
              initialValue: detail.basicFeatureTag,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.4ozd08h6sae'
                    )
                    .d('请选择标签！'),
                },
                {
                  validator: (rule, values, callback) => limitSelect(rule, values, callback, 20),
                },
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.384eqs4ob2a'
                  )
                  .d('请选择实体下的标签')}
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.5xr4yfob0fo')
              .d('显著特征')}
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.6g8x8kg408g')
              .d('在微观画像的标签分析中显示，最多可以选择20个')}
          >
            {getFieldDecorator('markedFeatureTag', {
              initialValue: detail.markedFeatureTag || undefined,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.4ozd08h6sae'
                    )
                    .d('请选择标签！'),
                },
                {
                  validator: (rule, values, callback) => limitSelect(rule, values, callback, 20),
                },
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.384eqs4ob2a'
                  )
                  .d('请选择实体下的标签')}
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.iicgr2gpu2')
              .d('群体分析')}
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.mqipn2uhz3r')
              .d('群体分析默认展示的标签，最多可以选择10个')}
          >
            {getFieldDecorator('groupAnalyzeTag', {
              initialValue: detail.groupAnalyzeTag || undefined,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.4ozd08h6sae'
                    )
                    .d('请选择标签！'),
                },
                {
                  validator: (rule, values, callback) => limitSelect(rule, values, callback, 10),
                },
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.384eqs4ob2a'
                  )
                  .d('请选择实体下的标签')}
              >
                {/* {tagList} */}
                {analyzeTags.map(item => {
                  return (
                    <Option value={item.tagId.toString()}>
                      {item.tagName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.zytkh3suvjo')
              .d('群体对比')}
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.k1ahcwrk2x')
              .d('群体对比默认展示的标签，最多可以选择10个')}
          >
            {getFieldDecorator('groupCompareTag', {
              initialValue: detail.groupCompareTag || undefined,
              rules: [
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-config.group-config.entityModal.4ozd08h6sae'
                    )
                    .d('请选择标签！'),
                },
                {
                  validator: (rule, values, callback) => limitSelect(rule, values, callback, 10),
                },
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.384eqs4ob2a'
                  )
                  .d('请选择实体下的标签')}
              >
                {/* {tagList} */}
                {analyzeTags.map(item => {
                  return (
                    <Option value={item.tagId.toString()}>
                      {item.tagName}
                    </Option>
                  )
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={intl
              .get('ide.src.page-config.group-config.entityModal.4r9ly6zxdbi')
              .d('图片')}
            className="img-tooltip"
            extra={intl
              .get('ide.src.page-config.group-config.entityModal.noglp2mmol')
              .d('图片在个体画像中显示，支持Jpg/Png格式，大小不超过2MB')}
          >
            {getFieldDecorator('picture', {
              initialValue: detail.picture,
            })(
              <Upload
                name={intl
                  .get(
                    'ide.src.page-config.group-config.entityModal.jftvrignd4o'
                  )
                  .d('上传画像')}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={intl
                      .get(
                        'ide.src.page-config.group-config.entityModal.jftvrignd4o'
                      )
                      .d('上传画像')}
                    style={{width: '100%'}}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const EntityModal = Form.create()(EModal)
export default EntityModal
