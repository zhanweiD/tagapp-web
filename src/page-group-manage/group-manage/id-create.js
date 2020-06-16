import React, {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {UploadOutlined} from '@ant-design/icons'
import {Drawer, Spin, Form, Select, Input, Upload, Button, Modal, message} from 'antd'

import {errorTip, baseApi, get, post} from '../../common/util'

const {Item} = Form
const {TextArea} = Input
const {Option} = Select

@observer
export default class IdCreate extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentWillMount() {
    // this.store.getEntityList()
  }
  formRef = React.createRef()

  // 自定义验证上传
  validateUpload = (rule, value, callback) => {
    const {uploadList} = this.store
    console.log(1)
    if (uploadList.length === 0) {
      callback('请上传文件')
    }
    callback()
  }

  // 上传状态发生变化
  uploadChange = ({file, fileList}) => {
    // fileList = fileList.slice(-1)
    console.log(file.status)
    this.store.uploadList = fileList.slice(-1)
    if (file.status !== 'uploading') {
      this.formRef.current.validateFields(['excel'])
      if (file.response.success) {
        // 返回正确
        this.store.modalVisible = true
      } else {
        errorTip(file.response.message)
      }
    }
  }

  @action removeFile() {
    // this.store.nextDisabled = true
    console.log(1)
  }

  @action beforeUpload = file => {
    const isLt10M = file.size / 1024 / 1024 < 100
    if (!isLt10M) {
      errorTip('文件不能大于100MB!')
    }
    // this.store.uploadData.fileData = file
    return isLt10M
  }

  @action checkName = (rule, value, callback) => {
    this.store.recheckName(value, callback)
  }
  
  @action handleCancel = () => {
    this.store.drawerVisible = false
    this.store.recordObj = {}
    this.store.uploadList = []
  }

  @action onOK = () => {
    this.form = this.formRef.current
    const {isAdd, mode, type} = this.store
    this.formRef.current.validateFields().then(value => {
      value.outputTags = value.outputTags.toString()
      value.objId = parseInt(value.objId)
      value.mode = mode
      value.type = type
      if (isAdd) {
        this.store.addGroup(value)
      } else {
        this.store.editGroup(value)
      }
      console.log(value)
      this.store.drawerVisible = false
      this.store.recordObj = {}
      this.store.uploadList = []
    }).catch(err => {
      errorTip(err)
    })
  }

  @action onUpload = () => {
    this.store.modalVisible = false
  }
  @action uploadCancel = () => {
    this.store.modalVisible = false
  }
  @action selectEntity = objId => {
    this.store.objId = objId
    this.store.getTagList()
    this.formRef.current.resetFields(['outputTags'])
  }

  render() {
    const {
      drawerVisible,
      modalVisible,
      entityOptions,
      recordObj,
      tagOptions,
      uploadList,
      projectId,
      objId,
    } = this.store

    const props = {
      accept: '.xls, .xlsx, .txt',
      method: 'post',
      data: file => ({
        fileName: file.name,
        fileData: file,
        projectId,
        objId,
      }),
      fileList: uploadList,
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      action: `${baseApi}/import/import_id_collection`,
      onChange: this.uploadChange,
      // onRemove: file => this.removeFile(file),
      beforeUpload: file => this.beforeUpload(file),
    }

    const drawerConfig = {
      title: '主标签上传列表',
      visible: drawerVisible,
      placement: 'right',
      maskClosable: false,
      closable: true,
      width: 600,
      destroyOnClose: true,
      onClose: this.handleCancel,
      footer: (
        <div className="drawer-footer">
          <Button onClick={this.handleCancel}>取消</Button>
          <Button type="primary" className="footer-btn" onClick={this.onOK}>确定</Button>
        </div>
      ),
    }

    const modalConfig = {
      title: '文件解析结果',
      visible: modalVisible,
      maskClosable: false,
      closable: true,
      onOk: this.uploadCancel,
      onCancel: this.uploadCancel,
      width: 525,
      destroyOnClose: true,
    }

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 18},
    }
    
    return (
      <Fragment>
        <Drawer {...drawerConfig} className="drawer-create">
          <Form 
            {...formItemLayout} 
            ref={this.formRef} 
            labelAlign="right"
            initialValues={{
              objName: recordObj.objName,
              name: recordObj.name,
              descr: recordObj.descr,
            }}
          >
            <Item
              name="objId"
              label="所属实体"
              rules={[
                {required: true, message: '请选择实体'},
              ]}
            >
              <Select placeholder="请选择实体" onChange={value => this.selectEntity(value)}>
                {entityOptions}
              </Select>
            </Item>
            <Item
              name="name"
              label="群体名称"
              rules={[
                {required: true, message: '请输入名称'},
                {validator: this.checkName},
              ]}
            >
              <Input placeholder="请输入名称" />
            </Item>
            
            <Item
              label="描述"
              name="descr"
              rules={[
              ]}
            >
              <TextArea style={{minHeight: '8em'}} placeholder="请输入" />
            </Item>
            <Item
              label="上传"
              name="excel"
              rules={[
                {validator: this.validateUpload},
              ]}
            >
              <Upload {...props}>
                <Button>
                  <UploadOutlined /> 
                  Upload
                </Button>
              </Upload>
              <a 
                style={{marginTop: '12px', display: 'block'}}
                onClick={() => {
                  if (objId) {
                    window.open(`${baseApi}/export/example?objId=${objId}&projectId=${projectId}`)
                  } else {
                    this.formRef.current.validateFields(['objId'])
                  }
                }}
              >
                下载模版
              </a>
            </Item>

            <Item
              name="outputTags"
              label="输出标签"
              rules={[
                {required: true, message: '请选择标签'},
              ]}
            >
              <Select placeholder="请选择标签" mode="multiple">
                {tagOptions}
              </Select>
            </Item>
          </Form>
          
        </Drawer>
        <Modal {...modalConfig}>
          <p style={{marginTop: '1em'}}>{`总记录${2340}条，重复记录${3}条，入库记录数${2337}条`}</p>
        </Modal>
      </Fragment>
    )
  }
}
