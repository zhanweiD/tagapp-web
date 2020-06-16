import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Form, Icon as LegacyIcon} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css' 
import {Modal, Spin, Select, Button, Upload, message} from 'antd'
import {
  errorTip,
  limitSelect,
} from '../../common/util'

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

  @action modalCancel = () => {
    this.store.entityVisible = false
    this.store.uploadLoading = false
    this.store.imageUrl = null
    this.store.detail = {}
    this.form.resetFields()
  }

  submit = () => {
    const {store} = this
    this.form.validateFields((err, values) => {
      values.picture = store.imageUrl
      values.basicFeatureTag = values.basicFeatureTag.toString()
      values.markedFeatureTag = values.markedFeatureTag.toString()
      console.log(values)
      if (!err) {
        const data = {
          ...values,
        }
        // 编辑 
        if (store.modalType === 'edit') {
          const params = {objId: store.detail.objId, ...data}
          store.editEntity(params)
        } else {
          // 新增
          store.addEntity(data)
        }
        this.modalCancel()
      }
    })
  }
  @action selectEntity = value => {
    this.store.getTagList(value)
    this.form.resetFields(['basicFeatureTag', 'markedFeatureTag'])
  }

  render() {
    const {
      entityVisible, 
      modalType, 
      confirmLoading, 
      imageUrl, 
      uploadLoading,
      entityList,
      tagList,
      detail,
      optionKey,
    } = this.store
    const {getFieldDecorator} = this.form
    const modalConfig = {
      title: modalType === 'edit' ? '编辑实体' : '添加实体',
      visible: entityVisible,
      onCancel: this.modalCancel,
      onOk: this.submit,
      maskClosable: false,
      width: 525,
      destroyOnClose: true,
      confirmLoading,
    }

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16},
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
                placeholder="请选择实体名称"
                disabled={modalType !== 'add'}
                onChange={value => this.selectEntity(value)}
              >
                {entityList}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="基本特征"
            extra="在个体画像中显示，最多可选择20个"
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
                placeholder="请选择实体下的标签"
                // defaultValue={detail.basicFeatureTag}
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="显著特征" 
            extra="常关注的特征，最多可选择20个"
          >
            {getFieldDecorator('markedFeatureTag', {
              initialValue: detail.markedFeatureTag,
              rules: [
                {required: true, message: '请选择标签！'},
                {validator: (rule, values, callback) => limitSelect(rule, values, callback, 20)},
              ],
            })(
              <Select
                mode="multiple"
                placeholder="请选择实体下的标签"
                // defaultValue={detail.markedFeatureTag}
              >
                {tagList}
              </Select>
            )}
          </Form.Item>
          <Form.Item 
            label="图片"
            extra="图片在个体画像中显示"
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
