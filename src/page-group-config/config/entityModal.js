import {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Form, Icon as LegacyIcon} from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css' 
import {Modal, Spin, Select, Button, Upload, message} from 'antd'
import {ModalForm} from '../../component'
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

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.store.uploadLoading = true
      return
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.store.imageUrl = imageUrl
        this.store.uploadLoading = false 
      })
    }
  }

  beforeUpload(file) {
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
    return isJpgOrPng && isLt2M
  }

  @action modalCancel = () => {
    this.store.entityVisible = false
    this.store.uploadLoading = false
    this.store.imageUrl = null
    this.form.resetFields()
    this.store.closeModal()
  }

  submit = () => {
    const {store} = this
    this.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          // groupIdList: [values.groupIdList],
        }
        console.log(values)
        this.modalCancel()
        // 编辑 
        if (store.modalType === 'edit') {
          const params = {id: store.detail.objId, ...data}
          // store.editEntity(params, () => {
          //   this.modalCancel()
          // })
        } else {
          // 新增
          // store.addEntity(data, () => {
          //   this.modalCancel()
          // })
        }
      }
    })
  }

  // 基本特征选择
  @action basicChange = value => {
    if (value.length > 19) {
      message.warning('最多可选择20个标签')
      this.store.basicFeatureTags = value.slice(0, 20)
    } else {
      this.store.basicFeatureTags = value
    }
  }
  // 显著特征选择
  @action obviousChange = value => {
    if (value.length > 19) {
      message.warning('最多可选择20个标签')
      this.store.markedFeatureTag = value.slice(0, 20)
    } else {
      this.store.markedFeatureTag = value
    }
  }

  render() {
    const {
      entityVisible, 
      modalType, 
      confirmLoading, 
      imageUrl, 
      uploadLoading,
      basicFeatureTags,
      markedFeatureTag,
      detail,
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="实体名称">
            {getFieldDecorator('objId', {
              initialValue: detail.objName,
              rules: [{required: true, message: '请选择实体名称！'}],
            })(
              <Select
                placeholder="请选择实体名称"
                disabled={modalType !== 'add'}
                onChange={value => console.log(value)}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
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
                className="h96"
                placeholder="请选择实体下的标签"
                // value={basicFeatureTags}
                // onChange={value => console.log(value)}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
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
                className="h96"
                placeholder="请选择实体下的标签"
                // value={markedFeatureTag}
                // onChange={value => console.log(value)}
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
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
