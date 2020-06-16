import React, {Component} from 'react'
import {Form, Select} from 'antd'
import {observer, inject, Spin} from 'mobx-react'

import {observe, action} from 'mobx'
import {ModalForm, ListContent, NoData, AuthBox} from '../../component'

const {Item} = Form
const {Option} = Select

@inject('store')
@observer
export default class StepOne extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentDidMount() {
    this.props.oneRef(this)
    // this.store.getEntityList()
  }

  formItemLayout = () => {
    return ({
      labelCol: {span: 2, offset: 8},
      wrapperCol: {span: 6},
      colon: false,
    })
  }
  selectContent= () => {
    const {
      // selectLoading, 
      dataTypeSource = [],
    } = this.store
    return [{
      label: '所属实体',
      key: 'objId',
      // initialValue: '',
      rules: [
        '@requiredSelect',
      ],
      control: {
        options: dataTypeSource,
        onSelect: v => console.log(v),
        // notFoundContent: selectLoading ? <Spin size="small" /> : null, 
      },
      component: 'select',
    }, {
      label: '群体名称',
      key: 'name',
      initialValue: '',
      rules: [
        '@transformTrim',
        '@required',
        '@max32',
        {validator: this.checkName},
      ],
      component: 'input',
    }, {
      label: '描述',
      key: 'descr',
      initialValue: '',
      rules: [
        '@transformTrim',
      ],
      component: 'textArea',
    }]
  }

  checkName = (rule, value, callback) => {
    const params = {
      name: value,
    }
    console.log(value)
    // if (this.store.detail.id) {
    //   params.id = this.store.detail.id
    // }

    // this.store.checkName(params, callback)
    callback()
  }

  render() {
    const {current} = this.store
    const formConfig = {
      selectContent: this.selectContent(),
      formItemLayout: this.formItemLayout(),
      wrappedComponentRef: form => { this.form = form ? form.props.form : form },
    }
    
    return (
      <div className="step-one mt100" style={{display: current === 0 ? 'block' : 'none'}}>
        <ModalForm {...formConfig} />
      </div>
    )
  }
}
