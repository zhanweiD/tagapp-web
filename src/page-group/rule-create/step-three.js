import React from 'react'
import {Form, Select, Radio, Button, DatePicker} from 'antd'
import {CycleSelect} from '@dtwave/uikit'
import {limitSelect} from '../../common/util'

const {Option} = Select
const {RangePicker} = DatePicker

const formItemLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 10},
  colon: false,
}

const StepThree = ({current, configTagList, prev, save, loading, detail}) => {
  const onFinish = value => {
    const {scheduleType, scheduleExpression, isStart, rangePicker} = value
    const params = {
      scheduleType,
      scheduleExpression,
      isStart,
      startTime: moment(rangePicker[0]).format('x'),
      endTime: moment(rangePicker[1]).format('x'),
    }
    save(params)
  }

  return (
    <div className="step-three" style={{display: current === 2 ? 'block' : 'none'}}>
      <Form
        name="three"
        onFinish={onFinish}
      >
        <Form.Item
          label="更新类型"
          name="scheduleType"
          rules={[{required: true, message: '请选择更新类型'}]}
          initialValue={detail.scheduleType || 1}
          {...formItemLayout}
        >
          <Select
            showSearch
            allowClear
          >
            <Option value={1}>周期更新</Option>
            <Option value={2}>立即运行</Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.scheduleType !== currentValues.scheduleType}>
          {({getFieldValue}) => {
            return getFieldValue('scheduleType') === 1 ? (
              <div>
                <Form.Item
                  label=""
                  name="scheduleExpression"
                  rules={[{required: true, message: '更新周期不能为空'}]}
                  initialValue={detail.scheduleExpression || CycleSelect.formatCron({
                    cycle: 'day',
                  })
                  }
                >
                  <CycleSelect
                    cycleList={['day']}
                    cycleText="更新"
                    disabled={false}
                    required
                    layout="horizontal"
                    formItemLayout={formItemLayout}
                  />
                </Form.Item>
                <Form.Item
                  name="isStart"
                  label="是否立即执行"
                  {...formItemLayout}
                  initialValue={detail.isStart || '1'}
                >
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="更新有效时间"
                  name="rangePicker"
                  rules={[{type: 'array', required: true, message: '请选择更新有效时间'}]}
                  {...formItemLayout}
                  initialValue={[moment(detail.startTime), moment(detail.endTime)]}
                >
                  <RangePicker />
                </Form.Item>
              </div>
            ) : null
          }}
        </Form.Item>

         
        <Form.Item
          label="输出标签设置"
          name="outputTags"
          validateFirst
          rules={[{
            required: true,
            message: '请选择标签',
          }, {
            validator: (rule, value) => {
              if (value && value.length < 20) {
                return Promise.resolve()
              }
              return Promise.reject('最多可选择20个标签')
            },
          }]}
          {...formItemLayout}
          initialValue={detail.outputTags}
        >
          <Select
            mode="multiple"
            showSearch
            placeholder="请选择标签"
          >
            {
              configTagList.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
            }
            <Option value="1">周期更新</Option>
            <Option value="2">立即运行</Option>
          </Select>
        </Form.Item>

        <Form.Item className="steps-action mb0">
          <Button
            style={{marginRight: 16}}
            onClick={() => prev()}
          >
            上一步

          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default StepThree