import React, {useState} from 'react'
import {Modal, Form, Select, Input} from 'antd'

const {Option} = Select
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
}

const ConfigModal = ({
  visible, 
  onCreate, 
  onCancel,
  selectDataType, 
  dataType, 
  projectId,
  dataSource}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e)
  }

  return (
    <Modal
      visible={visible}
      title="初始化"
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      destroyOnClose
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            // form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
      maskClosable={false}
    >
      <Form
        form={form}
        name="form"

        {...formItemLayout}
      >
        <Form.Item
          name="dataStorageType"
          label="数据源类型"
          rules={[
            {
              required: true,
              message: '请选择数据源类型',
            },
          ]}
        >
          <Select placeholder="请选择数据源类型" onChange={onChange}>
            {
              dataType.map(d => <Option value={d.type}>{d.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item 
          name="dataStorageId" 
          label="数据源"
          rules={[
            {
              required: true,
              message: '请选择数据源',
            },
          ]}
          extra={(
            <span>
              若无可用的数据源，请到
              <a target="_blank" rel="noopener noreferrer" href={`/project/index.html?projectId=${projectId}#/detail/env`}>项目管理-环境配置</a>
              中添加数据源
            </span>
          )}
        >
          <Select placeholder="请选择数据源">
            {
              dataSource.map(d => <Option value={d.storageId}>{d.storageName}</Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ConfigModal
