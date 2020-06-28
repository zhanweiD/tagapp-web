import React, {Component} from 'react'
import {action, toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'
// import {PlusOutlined} from '@ant-design/icons'
import {RuleContent} from '../visual-component'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
    this.formRef = React.createRef()
  }

  @action pre = () => {
    this.store.current -= 1
  }

  @action changeCondition = (data, flag) => {
    const currentFlag = `${flag}-${data.flag}`
    this.store.logic[currentFlag] = data.logic
  }

  @action next = () => {
    this.formRef.current
      .validateFields()
      .then(values => {
        console.log(values)
        console.log(toJS(this.store.logic))
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
    // this.store.current += 1
  }

  render() {
    const {current} = this.store
    return (
      <div className="step-two" style={{display: current === 1 ? 'block' : 'none'}}>
        <RuleContent formRef={this.formRef} changeCondition={this.changeCondition} />
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
