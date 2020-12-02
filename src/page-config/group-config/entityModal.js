import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Form, Icon as LegacyIcon} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css' 
import {Modal, Select, Button, Upload, message} from 'antd'
import {
  errorTip,
  limitSelect,
} from '../../common/util'

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
      message.error('请上传JPG/PNG格式图片!')
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!')
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
      values.objId = parseInt(values.objId) 
      values.basicFeatureTag = values.basicFeatureTag.map(Number)
      values.markedFeatureTag = values.markedFeatureTag.map(Number)
      values.groupAnalyzeTag = values.groupAnalyzeTag.map(Number)
      values.groupCompareTag = values.groupCompareTag.map(Number)

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
    this.store.getCompareTags(value)
    this.form.resetFields(['basicFeatureTag', 'markedFeatureTag', 'groupAnalyzeTag', 'groupCompareTag'])
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
      title: modalType === 'edit' ? '编辑实体' : '添加实体',
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
          <Form.Item label="实体名称">
            {getFieldDecorator('objId', {
              initialValue: detail.objId,
              rules: [{required: true, message: '请选择实体名称！'}],
            })(
              <Select
                size="small"
                placeholder="请选择实体名称"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                disabled={modalType !== 'add'}
                onChange={value => this.selectEntity(value)}
              >
                {entityList}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="基本特征"
            extra="在个体画像中显示，最多可以选择20个"
          >
            {getFieldDecorator('basicFeatureTag', {
              initialValue: detail.basicFeatureTag,
              rules: [
                {required: true, message: '请选择标签！'},
                {validator: (rule, values, callback) => limitSelect(rule, values, callback, 20)},
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder="请选择实体下的标签"
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="显著特征" 
            extra="常关注的特征，最多可以选择20个"
          >
            {getFieldDecorator('markedFeatureTag', {
              initialValue: detail.markedFeatureTag || undefined,
              rules: [
                {required: true, message: '请选择标签！'},
                {validator: (rule, values, callback) => limitSelect(rule, values, callback, 20)},
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder="请选择实体下的标签"
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="群体分析"
            extra="群体分析默认展示的标签，最多可以选择20个"
          >
            {getFieldDecorator('groupAnalyzeTag', {
              initialValue: detail.groupAnalyzeTag || undefined,
              rules: [
                {required: true, message: '请选择标签！'},
                {validator: (rule, values, callback) => limitSelect(rule, values, callback, 20)},
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder="请选择实体下的标签"
              >
                {analyzeTags.map(item => <Option value={item.tagId}>{item.tagName}</Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label="群体对比"
            extra="群体对比默认展示的标签，最多可以选择20个"
          >
            {getFieldDecorator('groupCompareTag', {
              initialValue: detail.groupCompareTag || undefined,
              rules: [
                {required: true, message: '请选择标签！'},
                {validator: (rule, values, callback) => limitSelect(rule, values, callback, 20)},
              ],
            })(
              <Select
                mode="multiple"
                size="small"
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder="请选择实体下的标签"
              >
                {compareTags.map(item => <Option value={item.tagId}>{item.tagName}</Option>)}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="图片"
            className="img-tooltip"
            extra="图片在个体画像中显示，支持Jpg/Png格式，大小不超过2MB"
          >
            {getFieldDecorator('picture', {
              initialValue: detail.picture,
            })(
              <Upload
                name="上传画像"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeUpload}
              >
                {imageUrl ? <img src={imageUrl} alt="上传画像" style={{width: '100%'}} /> : uploadButton}
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
