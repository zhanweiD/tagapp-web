import intl from 'react-intl-universal'
import React, { Component } from 'react'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Drawer, Button, Form, Input, Tabs, Table, Select } from 'antd'
import ApiResponseParams from './api-response-params'
import ApiRequsetParams from './api-request-params'
import { getNamePattern } from '../../../common/util'

const FormItem = Form.Item
const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 },
}

@observer
class DrewerApi extends Component {
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
          ...this.getConfigData(),
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
    const { apiParamsInfo = {} } = this.store

    let requestData = []
    let responseData = []
    if (this.request.current && this.request.current.state) {
      requestData = this.request.current.state.dataSource
    } else {
      requestData = toJS(apiParamsInfo).varList
    }

    if (this.response.current && this.response.current.state) {
      responseData = this.response.current.state.dataSource
    } else {
      responseData = toJS(apiParamsInfo).filedList
    }

    return {
      varList: requestData,
      filedList: responseData,
    }
  }

  apiNameCheck = async (rule, value) => {
    const res = await this.store.apiNameCheck(value)
    if (res) {
      return Promise.reject(
        intl
          .get(
            'ide.src.page-search.page-data-search.visual.modal-api.5qxsslztb8g'
          )
          .d('API???????????????')
      )
    }
    return Promise.resolve()
  }

  apiPathCheck = async (rule, value) => {
    const res = await this.store.apiPathCheck(value)
    if (res) {
      return Promise.reject(
        intl
          .get(
            'ide.src.page-search.page-data-search.visual.modal-api.3pkpv1m3c3f'
          )
          .d('API???????????????')
      )
    }
    return Promise.resolve()
  }

  render() {
    const {
      visibleApi,
      modalApiLoading,
      apiParamsInfo = {},
      apiGroup,
    } = this.store

    const drawerConfig = {
      width: 1120,
      title: intl
        .get('ide.src.page-search.page-data-search.tql.tql.a8guqmo8wg5')
        .d('??????API'),
      maskClosable: false,
      destroyOnClose: true,
      visible: visibleApi,
      onClose: this.handleCancel,
      className: 'create-api',
    }

    return (
      <Drawer {...drawerConfig}>
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          ref={this.formRef}
        >
          <FormItem
            label={intl
              .get('ide.src.page-group.group-detail.apiModal.qmpxjtv0okp')
              .d('API??????')}
            name="apiName"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.modal-api.sp4ag6gjm7p'
                  )
                  .d('?????????API??????'),
              },
              {
                validator: this.apiNameCheck,
              },
              {
                validateFirst: true,
              },

              ...getNamePattern(),
            ]}
          >
            <Input
              size="small"
              placeholder={intl
                .get(
                  'ide.src.page-search.page-data-search.visual.modal-api.sp4ag6gjm7p'
                )
                .d('?????????API??????')}
            />
          </FormItem>
          <FormItem
            label={intl
              .get('ide.src.page-group.group-detail.apiModal.7ahbhozrn99')
              .d('API??????')}
            name="apiGroupId"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.modal-api.ur7dcyoo2pl'
                  )
                  .d('?????????API??????'),
              },
            ]}
          >
            <Select
              placeholder={intl
                .get(
                  'ide.src.page-search.page-data-search.visual.modal-api.ur7dcyoo2pl'
                )
                .d('?????????API??????')}
            >
              {apiGroup.map(d => (
                <Option value={d.apiGroupId}>{d.apiGroupName}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label={intl
              .get('ide.src.page-group.group-detail.apiModal.6x247exi6cr')
              .d('API??????')}
            name="apiPath"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.modal-api.eoac29380zk'
                  )
                  .d('?????????API??????'),
              },
              {
                pattern: /^\/[A-Za-z0-9_/-]*$/g,
                message: intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.modal-api.b2yfvg5uuqo'
                  )
                  .d('API?????????/?????????????????????????????????????????????????????????-???'),
              },
              {
                validateFirst: true,
              },
              {
                validator: this.apiPathCheck,
              },
            ]}
          >
            <Input
              size="small"
              placeholder={intl
                .get(
                  'ide.src.page-search.page-data-search.visual.modal-api.eoac29380zk'
                )
                .d('?????????API??????')}
            />
          </FormItem>
          <FormItem
            label={intl
              .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
              .d('??????')}
            name="descr"
            rules={[
              {
                required: true,
                message: intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.modal-api.a2tc08011zl'
                  )
                  .d('???????????????'),
              },
              {
                max: 128,
                message: intl
                  .get('ide.src.page-group.group-manage.id-create.8ratru3a8qt')
                  .d('???????????????128?????????'),
              },
            ]}
          >
            <TextArea
              placeholder={intl
                .get(
                  'ide.src.page-search.page-data-search.visual.modal-api.a2tc08011zl'
                )
                .d('???????????????')}
            />
          </FormItem>
        </Form>
        <h3>
          {intl
            .get(
              'ide.src.page-search.page-data-search.visual.modal-api.zyt1lv0jpfm'
            )
            .d('????????????')}
        </h3>
        <Tabs defaultActiveKey="1" style={{ paddingBottom: '50px' }}>
          <TabPane
            tab={intl
              .get(
                'ide.src.page-search.page-data-search.visual.modal-api.2kpogdj1y2s'
              )
              .d('????????????')}
            key="1"
          >
            <ApiRequsetParams
              ref={this.request}
              data={toJS(apiParamsInfo).varList}
            />
          </TabPane>
          <TabPane
            tab={intl
              .get(
                'ide.src.page-search.page-data-search.visual.modal-api.3x0e725qlxt'
              )
              .d('????????????')}
            key="2"
          >
            <ApiResponseParams
              ref={this.response}
              data={toJS(apiParamsInfo).filedList}
            />
          </TabPane>
        </Tabs>
        <div
          style={{
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
          <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>
            {intl
              .get('ide.src.page-config.group-config.configModal.y7eepkatpi')
              .d('??????')}
          </Button>
          <Button
            type="primary"
            loading={modalApiLoading}
            onClick={this.submit}
            htmlType="submit"
          >
            {intl
              .get('ide.src.page-config.group-config.configModal.pub6abalqca')
              .d('??????')}
          </Button>
        </div>
      </Drawer>
    )
  }
}
export default DrewerApi
