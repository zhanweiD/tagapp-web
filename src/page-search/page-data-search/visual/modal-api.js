import React, {Component} from 'react'
import {action, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Drawer, Button, Form, Input, Tabs, Table, Select} from 'antd'
import ApiResponseParams from './api-response-params'
import ApiRequsetParams from './api-request-params'

const FormItem = Form.Item
const {TabPane} = Tabs
const {TextArea} = Input
const {Option} = Select

const formItemLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 12},
}

@observer
export default class DrewerApi extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.response = React.createRef()
    this.request = React.createRef()
    this.formRef = React.createRef()
  }

  @action handleCancel = () => {
    this.store.visibleApi = false
    this.store.modalApiLoading = false
  }

  submit = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        const params = {
          ...values, 
          ...toJS(this.store.saveParams),
          ...this.getConfigData()
        }
        this.store.createApi(params, () => {
          this.handleCancel()
        })
      })
      .catch(info => {
        console.log(info)
      })
  }

  getConfigData = () => {
    const {
      apiParamsInfo = {}
    } = this.store

    let requestData = []
    let responseData = []
    if(this.request.current && this.request.current.state) {
      requestData = this.request.current.state.dataSource
    } else {
      requestData = toJS(apiParamsInfo).filedList
    }

    if( this.response.currentt && this.response.current.state) {
      responseData = this.response.current.state.dataSource
    } else {
      responseData = toJS(apiParamsInfo).varList
    }

    return {
      filedList: requestData,
      varList: responseData
    }
  }

  render() {
    const {
      visibleApi, modalApiLoading, apiParamsInfo = {}, apiGroup,
    } = this.store

    const drawerConfig = {
      width: 1120,
      title: '生成API',
      maskClosable: false,
      destroyOnClose: true,
      visible: visibleApi,
      onClose: this.handleCancel,
      className: 'create-api',
    }

    return (
      <Drawer
        {...drawerConfig}
      >
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
        >
          <FormItem
            label="API名称"
            name="apiName"
            rules={[
              {
                required: true,
                message: '请输入API名称',
              },
            ]}
          >
            <Input  placeholder="请输入API名称"/>
          </FormItem>
          <FormItem
            label="API分组"
            name="apiGroupId"
            rules={[
              {
                required: true,
                message: '请选择API分组',
              },
            ]}
          >
            <Select placeholder="请选择API分组">
              {
                apiGroup.map(d => <Option value={d.apiGroupId}>{d.apiGroupName}</Option>)
              }
            </Select>
          </FormItem>
          <FormItem
            label="API路径"
            name="apiPath"
            rules={[
              {
                required: true,
                message: '请输入API路径',
              }, {
                pattern: /^\/[A-Za-z0-9_-]*$/g, message: 'API路径以/开头，支持英文、数字、下划线、连线符（-）'
              }
            ]}
          >
            <Input placeholder="请输入API路径"/>
          </FormItem>
          <FormItem
            label="描述"
            name="descr"
            rules={[
              {
                required: true,
                message: '请输入描述',
              },
            ]}
          >
            <TextArea  placeholder="请输入描述"/>
          </FormItem>

        </Form>
        <div className="chart-title">配置参数</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="请求参数" key="1">
            <ApiRequsetParams ref={this.request} data={toJS(apiParamsInfo).filedList} />
          </TabPane>
          <TabPane tab="返回参数" key="2">
            <ApiResponseParams ref={this.response} data={toJS(apiParamsInfo).varList} />
          </TabPane>
        </Tabs>
        <div style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
        >
          <Button style={{marginRight: 8}} onClick={this.handleCancel}>取消</Button>
          <Button type="primary" loading={modalApiLoading} onClick={this.submit} htmlType="submit">确定</Button>
        </div>
      </Drawer>
    )
  }
}
