import React, {Component, Fragment} from 'react'
import {observer, inject} from 'mobx-react'

import {NoData} from '../../component'

@inject('store')
@observer
export default class DetailSidebar extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  render() {
    const {basicLabel} = this.store
    return (
      <div>
        <div className="content-header sidebar-header">基本特征</div>
        <div className="p24 pt-0">
          {basicLabel.length ? basicLabel : <NoData />}
        </div>
      </div>
    )
  }
}
