import React, {Component, Fragment} from 'react'
import {action, observe, toJS} from 'mobx'
import {observer, inject} from 'mobx-react'

import {NoData} from '../../component'

@inject('store')
@observer
export default class LabelTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  render() {
    const {allLabels} = this.store
    console.log(toJS(allLabels))
    return (
      <div className="pl24 pt-0">
        {
          allLabels.length ? (
            toJS(allLabels)
          ) : (
            <NoData />
            // isLoading={tableLoading}
          )
        }
      </div>
    )
  }
}
