import React, {Component} from 'react'
import {Form, Select, Radio, message} from 'antd'
import {observer, inject, Spin} from 'mobx-react'
import {action} from 'mobx'
import moment from 'moment'

import {ModalForm, ListContent, NoData, AuthBox} from '../../component'
import {limitSelect} from '../../common/util'

const {Item} = Form
const {Option} = Select
const format = 'HH:mm'
const dateFormat = 'YYYY/MM/DD'

@inject('store')
@observer
export default class StepThree extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentWillMount() {
    this.props.threeRef(this)
  }
  formItemLayout = () => {
    return ({
      labelCol: {span: 2, offset: 8},
      wrapperCol: {span: 6},
      colon: false,
    })
  }
  selectContent1= () => {
    const {
      // selectLoading, 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '更新类型',
      key: 'scheduleType',
      initialValue: '1',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: [
          {name: '周期更新', value: '1'},
          {name: '立即运行', value: '2'},
        ],
        onSelect: v => console.log(v),
        // notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '更新周期',
      key: 'scheduleExpression',
      initialValue: '1',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: [
          {name: '天', value: '1'},
        ],
        onSelect: v => console.log(v),
        // notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '是否立即执行',
      key: 'isStart',
      initialValue: '1',
      control: {
        radios: [
          <Radio value="1">是</Radio>,
          <Radio value="2">否</Radio>,
        ],
        onChange: v => console.log(v),
      },
      rules: [
        '@required',
      ],
      component: 'radioGroup',
    }, {
      label: '更新时间',
      key: 'time',
      initialValue: moment('00:10', format),
      format,
      rules: [
        '@timeRequired',
      ],
      component: 'timePicker',
    }, {
      label: '更新有效时间',
      key: 'setTime',
      initialValue: [moment('2020/01/01', dateFormat), moment('2020/01/01', dateFormat)],
      rules: [
        '@rangeRequired',
      ],
      component: 'rangePicker',
    }, {
      label: '输出标签设置',
      key: 'outputTags',
      // initialValue: '',
      placeholder: '请选择输出标签',
      rules: [
        '@requiredSelect',
        {validator: (rule, values, callback) => limitSelect(rule, values, callback, 3)},
      ],
      mode: 'multiple',
      control: {
        options: dataTypeSource,
        // onSelect: v => this.labelChange(v),
        // notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }]
  }
  selectContent2= () => {
    const {
      // selectLoading, 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '输出标签设置',
      key: 'outputTags',
      // initialValue: '',
      placeholder: '请选择输出标签',
      rules: [
        '@requiredSelect',
        {validator: (rule, values, callback) => limitSelect(rule, values, callback, 3)},
      ],
      mode: 'multiple',
      control: {
        options: dataTypeSource,
        // onSelect: v => this.labelChange(v),
        // notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }]
  }
  // 输出label选择
  labelChange = (rule, value, callback) => {
    const {setFieldsValue} = this.form
    let newArr
    if (value.length > 2) {
      newArr = [].concat(value.slice(0, 2), value.slice(-1))
      callback('最多可选择20个标签')
      setFieldsValue({
        outputTags: newArr,
      })
    } else {
      newArr = value
      callback()
    }
    callback()
  }

  render() {
    this.store.stepThreeForm = this.form
    const {current, type} = this.store
    const formConfig = {
      selectContent: type === 1 ? this.selectContent1() : this.selectContent2(),
      formItemLayout: this.formItemLayout(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    return (
      <div className="step-three mt100" style={{display: current === 2 ? 'block' : 'none'}}>
        <ModalForm {...formConfig} />
      </div>
    )
  }
}
