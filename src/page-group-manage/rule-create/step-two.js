import React, {Component} from 'react'
import {action, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'
import {RuleContent} from '../component'
import {formatData} from '../component/util'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
    this.ruleContentRef = React.createRef()
  }

  @action pre = () => {
    this.store.current -= 1
  }

  @action next = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        console.log(values)
        console.log(this.ruleContentRef)
        formatData(values, this.ruleContentRef)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  render() {
    const {current} = this.store
    return (
      <div className="step-two" style={{display: current === 1 ? 'block' : 'none'}}>
        <RuleContent 
          formRef={this.formRef} 
          changeCondition={this.changeCondition} 
          onRef={ref => { this.ruleContentRef = ref }}
        />
        <div className="steps-action">
          <Button style={{marginRight: 16}} onClick={this.pre}>上一步</Button>
          <Button
            type="primary"
            onClick={this.next}
          >
            下一步
          </Button>
        </div>
      </div>
    )
  }
}
