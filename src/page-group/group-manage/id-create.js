import intl from 'react-intl-universal'
import React, { Component, Fragment } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { UploadOutlined } from '@ant-design/icons'
import { Drawer, Form, Select, Input, Upload, Button, Modal, Alert } from 'antd'

import {
  errorTip,
  baseApi,
  debounce,
  failureTip,
  getNamePattern,
} from '../../common/util'

const { Item } = Form
const { TextArea } = Input

@observer
class IdCreate extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  formRef = React.createRef()
  componentWillMount() {
    this.props.onRef(this)
  }

  // 设置输出标签
  setOutputTags = value => {
    this.formRef.current.setFieldsValue({
      outputTags: value,
    })
  }

  // 自定义验证上传
  validateUpload = (rule, value, callback) => {
    const { uploadData } = this.store
    if (!uploadData) {
      callback(
        intl
          .get('ide.src.page-group.group-manage.id-create.dduw1hddire')
          .d('请上传文件')
      )
    }
    callback()
  }

  // 上传状态发生变化
  uploadChange = ({ file, fileList }) => {
    if (fileList.length === 0) return
    this.store.uploadList = fileList.slice(-1)

    if (file.status !== 'uploading') {
      const { success, content } = file.response

      if (success) {
        // 返回正确
        if (!content.importKey) {
          failureTip(
            intl
              .get('ide.src.page-group.group-manage.id-create.z9ck07j014i')
              .d('请上传有效文件')
          )
          this.store.uploadList = []
          return
        }

        this.store.uploadData = true
        this.formRef.current.validateFields(['excel'])
        this.store.fileRes = file.response.content
        this.store.modalVisible = true
      } else {
        this.store.uploadList = []
        errorTip(file.response.message)
      }
    }
  }

  // 文件大小限制
  @action beforeUpload = file => {
    const isLt10M = file.size / 1024 / 1024 < 100
    if (!isLt10M) {
      errorTip(
        intl
          .get('ide.src.page-group.group-manage.id-create.e6lmpl6q7ze')
          .d('文件不能大于100MB!')
      )
    }
    return isLt10M
  }

  @action removeFile = file => {
    this.store.uploadList = []
  }

  @action checkName = (rule, value, callback) => {
    if (value) {
      // 防抖设计
      debounce(() => this.store.checkName(value, callback), 500)
    } else {
      callback()
    }
  }

  @action onOK = () => {
    const { isAdd, mode, type, fileRes, recordObj } = this.store

    this.formRef.current
      .validateFields()
      .then(value => {
        this.store.confirmLoading = true

        // 请求前处理参数
        value.outputTags = value.outputTags.map(Number)
        value.objId = parseInt(value.objId)
        value.mode = mode || recordObj.mode
        value.type = type || recordObj.type
        value.importKey = fileRes.importKey || ''

        if (isAdd) {
          this.store.addIdGroup(value)
        } else {
          this.store.editIdGroup(value)
        }
      })
      .catch(err => {
        this.store.confirmLoading = false
        errorTip(err)
      })
  }

  @action uploadCancel = () => {
    this.store.modalVisible = false
  }

  // 实体改变重置选项
  @action selectEntity = objId => {
    this.store.objId = objId
    this.store.getTagList()
    this.formRef.current.resetFields(['outputTags', 'name'])
  }

  render() {
    const {
      drawerVisible,
      modalVisible,
      entityOptions,
      recordObj,
      objId,
      tagOptions,
      uploadList,
      projectId,
      fileRes,
      isAdd,
      confirmLoading,
      handleCancel,
    } = this.store

    const fileResTotal = fileRes.total
    const fileResDuplicateCount = fileRes.duplicateCount
    const fileResSuccessCount = fileRes.successCount
    const fileResFailedCount = fileRes.failedCount

    const { tenantId, userId } = window.frameInfo.sessioninfo.userInfoVO
    const props = {
      accept: '.xls, .xlsx',
      method: 'post',
      data: file => ({
        fileName: file.name,
        fileData: file,
        projectId,
        objId,
        tenantId,
        userId,
      }),

      fileList: uploadList,
      action: `${baseApi}/import/import_id_collection`,
      onChange: this.uploadChange,
      onRemove: file => this.removeFile(file),
      beforeUpload: file => this.beforeUpload(file),
    }

    const drawerConfig = {
      title: intl
        .get('ide.src.page-group.group-manage.id-create.y4wsf2vvog')
        .d('主标签上传列表'),
      visible: drawerVisible,
      placement: 'right',
      maskClosable: false,
      closable: true,
      width: 560,
      destroyOnClose: true,
      onClose: handleCancel,
      footer: (
        <div className="drawer-footer">
          <Button onClick={handleCancel}>
            {intl
              .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
              .d('取消')}
          </Button>
          <Button
            loading={confirmLoading}
            type="primary"
            className="footer-btn"
            onClick={this.onOK}
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.pub6abalqca')
              .d('确定')}
          </Button>
        </div>
      ),
    }

    const modalConfig = {
      title: intl
        .get('ide.src.page-group.group-manage.id-create.xl8mu2uuw1')
        .d('文件解析结果'),
      visible: modalVisible,
      maskClosable: false,
      closable: false,
      footer: (
        <Button
          type="primary"
          className="footer-btn"
          onClick={this.uploadCancel}
        >
          {intl
            .get('ide.src.page-group.group-manage.id-create.fgpthswwjxc')
            .d('知道了')}
        </Button>
      ),

      width: 525,
      destroyOnClose: true,
    }

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 },
    }

    return (
      <Fragment>
        <Drawer {...drawerConfig} className="drawer-create">
          {/* {
             isPerform ? (
               <Alert style={{marginBottom: '16px'}} message="请重新上传文件" type="info" showIcon />
             ) : null
            } */}
          <Form {...formItemLayout} ref={this.formRef} labelAlign="right">
            <Item
              name="objId"
              label={intl
                .get('ide.src.page-group.group-manage.id-create.pygrkxwrk4n')
                .d('所属实体')}
              initialValue={recordObj.objId}
              rules={[
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-group.group-manage.id-create.p21zfuks4dn'
                    )
                    .d('请选择实体'),
                },
              ]}
            >
              <Select
                disabled={!isAdd}
                placeholder={intl
                  .get('ide.src.page-group.group-manage.id-create.p21zfuks4dn')
                  .d('请选择实体')}
                onChange={value => this.selectEntity(value)}
                showSearch
                optionFilterProp="children"
              >
                {entityOptions}
              </Select>
            </Item>

            <Item
              name="name"
              label={intl
                .get('ide.src.page-group.group-analyze.search.2ll7wsjzshl')
                .d('群体名称')}
              initialValue={recordObj.name}
              // 去除前后空格
              getValueFromEvent={e => {
                return e.target.value.trim()
              }}
              rules={[
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-group.group-manage.id-create.0x7xc1d9gx1e'
                    )
                    .d('请输入名称'),
                },
                // {max: 32, message: '名称不能超过32字'},
                ...getNamePattern(),
                { validator: this.checkName },
              ]}
            >
              <Input
                size="small"
                disabled={!isAdd || !objId}
                placeholder={intl
                  .get('ide.src.page-group.group-manage.id-create.0x7xc1d9gx1e')
                  .d('请输入名称')}
              />
            </Item>

            <Item
              label={intl
                .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                .d('描述')}
              name="descr"
              initialValue={recordObj.descr}
              rules={[
                {
                  max: 128,
                  message: intl
                    .get(
                      'ide.src.page-group.group-manage.id-create.8ratru3a8qt'
                    )
                    .d('输入不超过128个字符'),
                },
              ]}
            >
              <TextArea
                style={{ minHeight: '6em' }}
                placeholder={intl
                  .get('ide.src.page-group.component.fixedValue.yf8vz03yizo')
                  .d('请输入')}
              />
            </Item>

            <Item
              label={intl
                .get('ide.src.page-group.group-manage.id-create.aq2c74ubnwc')
                .d('上传')}
              name="excel"
              rules={[{ validator: this.validateUpload }]}
            >
              <Upload {...props}>
                <Button disabled={!objId}>
                  <UploadOutlined />
                  Upload
                </Button>
              </Upload>
              <a
                style={{ marginTop: '4px', display: 'block' }}
                onClick={() => {
                  if (objId) {
                    window.open(
                      `${baseApi}/export/example?objId=${objId}&projectId=${projectId}`
                    )
                  } else {
                    this.formRef.current.validateFields(['objId'])
                  }
                }}
              >
                {intl
                  .get('ide.src.page-group.group-manage.id-create.2smuylnfc6l')
                  .d('下载模版')}
              </a>
            </Item>

            <Item
              name="outputTags"
              label={intl
                .get('ide.src.page-group.group-manage.id-create.lgcqiz4q09')
                .d('输出标签')}
              rules={[
                {
                  required: true,
                  message: intl
                    .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
                    .d('请选择标签'),
                },
              ]}
            >
              <Select
                size="small"
                placeholder={intl
                  .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
                  .d('请选择标签')}
                mode="multiple"
                showSearch
                optionFilterProp="children"
              >
                {tagOptions}
              </Select>
            </Item>
          </Form>
        </Drawer>
        <Modal {...modalConfig}>
          <p style={{ marginTop: '1em' }}>
            {intl
              .get('ide.src.page-group.group-manage.id-create.u2xl47fsz', {
                fileResTotal: fileResTotal,
                fileResDuplicateCount: fileResDuplicateCount,
                fileResSuccessCount: fileResSuccessCount,
                fileResFailedCount: fileResFailedCount,
              })
              .d(
                '总记录{fileResTotal}条，重复记录{fileResDuplicateCount}条，入库记录数{fileResSuccessCount}条，无效记录{fileResFailedCount}条'
              )}
            {fileRes.failedCount ? (
              <span>
                (
                <a
                  onClick={() =>
                    window.open(
                      `${baseApi}/export/failed?failedKey=${fileRes.failedKey}`
                    )
                  }
                >
                  {intl
                    .get(
                      'ide.src.page-group.group-manage.id-create.vd9akgs50wb'
                    )
                    .d('下载')}
                </a>
                )
              </span>
            ) : null}
          </p>
        </Modal>
      </Fragment>
    )
  }
}
export default IdCreate
