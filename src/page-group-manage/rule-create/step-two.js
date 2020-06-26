import React, {Component} from 'react'
import {action} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {RuleContent} from '../visual-component'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @action pre = () => {
    this.store.current -= 1
  }

  @action next = () => {
    this.store.current += 1
  }

  render() {
    const {current} = this.store
    return (
      <div className="step-two" style={{display: current === 1 ? 'block' : 'none'}}>
        {/* <div className="mb24">
          <Button type="primary" icon={<PlusOutlined />}>添加</Button>
          <Button className="ml8">重置条件</Button>
        </div> */}
        <RuleContent />
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
