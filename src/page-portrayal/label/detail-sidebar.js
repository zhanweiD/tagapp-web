import React, {Component, Fragment} from 'react'
import {Tooltip} from 'antd'
import {action, observe} from 'mobx'
import {observer, inject} from 'mobx-react'

@inject('store')
@observer
export default class DetailSidebar extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentWillMount() {

  }
  render() {
    const {basicLabel} = this.store
    return (
      <div>
        <div className="content-header sidebar-header">基本特征</div>
        <div className="p24 pt-0">
          {/* <p>{`${'姓名'}： ${'张三'}`}</p> */}
          {/* <p>
            <span className="basicName">{`${'会员ID'}：`}</span>
            <span>{`${123456}`}</span>
          </p>
          <p>
            <span style={{color: 'rgba(0,0,0,.45)'}}>{`${'姓名'}：`}</span>
            <span>{`${'张三'}`}</span>
          </p>
          <p>
            <span style={{color: 'rgba(0,0,0,.45)'}}>{`${'性别'}：`}</span>
            <span>{`${'男'}`}</span>
          </p> */}
          {basicLabel}
        </div>
      </div>
    )
  }
}
