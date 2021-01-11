import intl from 'react-intl-universal'
import React, { Fragment } from 'react'
import { Form, Select, Radio, Button, DatePicker } from 'antd'
import { CycleSelect } from '@dtwave/uikit'
import { toJS } from 'mobx'

const { Option } = Select
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 10 },
  colon: false,
}

const StepThree = ({
  current,
  configTagList,
  prev,
  save,
  loading,
  detail,
  type,
}) => {
  const onFinish = value => {
    const {
      scheduleType,
      scheduleExpression,
      isStart,
      rangePicker,
      outputTags,
    } = value
    const params = {
      outputTags,
    }

    if (type === 1) {
      params.scheduleType = scheduleType
      params.scheduleExpression = scheduleExpression
      // params.isStart = isStart ? +isStart : undefined
      params.startTime = rangePicker && +moment(rangePicker[0]).format('x')
      params.endTime = rangePicker && +moment(rangePicker[1]).format('x')
    }

    params.isStart = +params.scheduleType === 2 ? 1 : isStart

    save(params)
  }

  return (
    <div
      className="step-three"
      style={{ display: current === 2 ? 'block' : 'none' }}
    >
      <Form name="three" onFinish={onFinish}>
        {type === 1 ? (
          <Fragment>
            <Form.Item
              label={intl
                .get('ide.src.page-group.rule-create.step-three.zlmezyead1t')
                .d('更新类型')}
              name="scheduleType"
              rules={[
                {
                  required: true,
                  message: intl
                    .get(
                      'ide.src.page-group.rule-create.step-three.zfs5xdw9kpt'
                    )
                    .d('请选择更新类型'),
                },
              ]}
              initialValue={detail.scheduleType || 1}
              {...formItemLayout}
            >
              <Select showSearch allowClear optionFilterProp="children">
                <Option value={1}>
                  {intl
                    .get('ide.src.page-group.rule-create.step-three.xry76dcxa2')
                    .d('周期更新')}
                </Option>
                <Option value={2}>
                  {intl
                    .get(
                      'ide.src.page-group.rule-create.step-three.15re8vbxfsz'
                    )
                    .d('立即运行')}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.scheduleType !== currentValues.scheduleType
              }
            >
              {({ getFieldValue }) => {
                return getFieldValue('scheduleType') === 1 ? (
                  <div>
                    <Form.Item
                      label=""
                      name="scheduleExpression"
                      rules={[
                        {
                          required: true,
                          message: intl
                            .get(
                              'ide.src.page-group.rule-create.step-three.vp1n49r6eq9'
                            )
                            .d('更新周期不能为空'),
                        },
                      ]}
                      initialValue={
                        detail.scheduleExpression || '0 10 0 * * ? *'
                      }
                      style={{ marginBottom: '0px' }}
                    >
                      <CycleSelect
                        cycleList={['day']}
                        cycleText={intl
                          .get(
                            'ide.src.page-group.rule-create.step-three.qwz3ugbcwol'
                          )
                          .d('更新')}
                        disabled={false}
                        required
                        layout="horizontal"
                        formItemLayout={formItemLayout}
                      />
                    </Form.Item>
                    <Form.Item
                      name="isStart"
                      label={intl
                        .get(
                          'ide.src.page-group.rule-create.step-three.uvpyxt3jz0m'
                        )
                        .d('是否立即执行')}
                      {...formItemLayout}
                      initialValue={detail.name ? detail.isStart : 1}
                    >
                      <Radio.Group>
                        <Radio value={1}>
                          {intl
                            .get('ide.src.component.form-component.qzk44dlnid')
                            .d('是')}
                        </Radio>
                        <Radio value={0}>
                          {intl
                            .get('ide.src.component.form-component.5lxtuor5tix')
                            .d('否')}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label={intl
                        .get(
                          'ide.src.page-group.rule-create.step-three.wxexdmd255f'
                        )
                        .d('更新有效时间')}
                      name="rangePicker"
                      rules={[
                        {
                          type: 'array',
                          required: true,
                          message: intl
                            .get(
                              'ide.src.page-group.rule-create.step-three.yildzlf8jg'
                            )
                            .d('请选择更新有效时间'),
                        },
                      ]}
                      {...formItemLayout}
                      initialValue={[
                        detail.startTime ? moment(detail.startTime) : moment(),
                        detail.endTime
                          ? moment(detail.endTime)
                          : moment().add(7, 'd'),
                      ]}
                    >
                      <RangePicker />
                    </Form.Item>
                  </div>
                ) : null
              }}
            </Form.Item>
          </Fragment>
        ) : null}

        <Form.Item
          label={intl
            .get('ide.src.page-group.rule-create.step-three.5wf9jrek2tk')
            .d('输出标签设置')}
          name="outputTags"
          validateFirst
          rules={[
            {
              required: true,
              message: intl
                .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
                .d('请选择标签'),
            },
            {
              validator: (rule, value) => {
                if (value && value.length < 20) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  intl
                    .get('ide.src.page-group.rule-create.step-three.ozw7hja4ne')
                    .d('最多可选择20个标签')
                )
              },
            },
          ]}
          {...formItemLayout}
          initialValue={toJS(detail.outputTags)}
        >
          <Select
            mode="multiple"
            size="small"
            showSearch
            optionFilterProp="children"
            placeholder={intl
              .get('ide.src.page-group.component.ruleItem.7lfmm8bv64')
              .d('请选择标签')}
          >
            {configTagList.map(d => (
              <Option value={d.tagId}>{d.tagName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="steps-action mb0"
          style={{ marginBottom: '0px', padding: '6px 16px' }}
        >
          <Button style={{ marginRight: 16 }} onClick={() => prev()}>
            {intl
              .get('ide.src.page-group.rule-create.step-three.mje6316ys4')
              .d('上一步')}
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {intl
              .get('ide.src.page-group.rule-create.step-three.qh4z2ga6u4l')
              .d('保存')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default StepThree
