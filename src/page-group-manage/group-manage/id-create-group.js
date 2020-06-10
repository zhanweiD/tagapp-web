import React, {Component, Fragment} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {UploadOutlined} from '@ant-design/icons'
import {Drawer, Spin, Form, Select, Input, Upload, Button, Modal} from 'antd'

import {errorTip} from '../../common/util'

const {Item} = Form
const {TextArea} = Input
const {Option} = Select
const apiPrefix = ''

@observer
export default class IdCreateGroup extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
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
    if (file.status !== 'uploading') {
      console.log(file, fileList)
      this.store.uploadList = fileList
      this.formRef.current.validateFields(['excel'])
      if (fileList.length !== 0) {
        this.store.modalVisible = true
      }
    }
    console.log(1)
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
    return isLt10M
  }

  @action checkName = (rule, value, callback) => {
    console.log(value)
    // this.store.recheckName(value, callback)
    callback()
  }
  
  @action handleCancel = () => {
    this.store.drawerVisible = false
    this.store.recordObj = {}
    this.store.uploadList = []
  }

  @action onOK = () => {
    this.form = this.formRef.current
    this.formRef.current.validateFields().then(value => {
      this.store.drawerVisible = false
      this.store.recordObj = {}
      this.store.uploadList = []
      console.log(value)
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

  render() {
    const {
      drawerVisible,
      modalVisible,
      recordObj,
    } = this.store

    const props = {
      accept: '.xls, .xlsx',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      // action: `${apiPrefix}/import/import_id_collection`,
      onChange: this.uploadChange,
      onRemove: file => this.removeFile(file),
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
              name="objName"
              label="所属实体"
              
              rules={[
                {required: true, message: '请选择实体'},
              ]}
            >
              <Select placeholder="会员">
                <Option key="1">1</Option>
                <Option key="2">2</Option>
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
            {
              recordObj.objId ? (
                <Item
                  name="groupLog"
                  label="群体标识"
                  rules={[
                    {required: true, message: '请输入标识'},
                  ]}
                >
                  <Input placeholder="请输入标识" />
                </Item>
              ) : null
            }
            
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
                  window.open(`${apiPrefix}/import/import_id_collection?objId=${1}&projectId=${1}&userId${1}&tenantId=${1}&fileName=${1}`)
                }}
              >
                下载模版
              </a>
            </Item>
            {
              recordObj.objId ? (
                <Item
                  name="label"
                  label="输出标签"
                  rules={[
                    {required: true, message: '请选择标签'},
                  ]}
                >
                  <Select placeholder="请选择标签">
                    <Option key="1">1</Option>
                    <Option key="2">2</Option>
                  </Select>
                </Item>
              ) : null
            }
          </Form>
          
        </Drawer>
        <Modal {...modalConfig}>
          <p style={{marginTop: '1em'}}>{`总记录${2340}条，重复记录${3}条，入库记录数${2337}条`}</p>
        </Modal>
      </Fragment>
    )
  }
}
