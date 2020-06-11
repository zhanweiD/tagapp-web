import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
export default class StepTwo extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  render() {
    const {current} = this.store
    return (
      <div className="step-two mt100" style={{display: current === 1 ? 'block' : 'none'}}>
        two
      </div>
    )
  }
}
