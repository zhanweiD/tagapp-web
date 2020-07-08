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
  dataSource}) => {
  const [form] = Form.useForm()

  const onChange = e => {
    selectDataType(e)
  }

  return (
    <Modal
      visible={visible}
      title="初始化"
      onCancel={onCancel}
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
      destroyOnClose
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
