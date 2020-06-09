import React, {Component, Fragment} from 'react'
import {Tooltip} from 'antd'
import {action, observe} from 'mobx'
import {observer, inject} from 'mobx-react'

@inject('store')
@observer
export default class AnalyzeTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentWillMount() {

  }
  render() {
    return (
      <Fragment>
        <div className="ml24">标签分析</div>
      </Fragment>
    )
  }
}
