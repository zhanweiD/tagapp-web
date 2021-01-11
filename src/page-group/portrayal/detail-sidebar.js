import intl from 'react-intl-universal'
import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import { NoData } from '../../component'

@inject('store')
@observer
class DetailSidebar extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  render() {
    const { basicLabel } = this.store
    return (
      <div className="h-100">
        <div className="content-header sidebar-header">
          {intl
            .get('ide.src.page-config.group-config.entityModal.90cpt5e1ovd')
            .d('基本特征')}
        </div>
        <div className="p24 pt16 h-97">
          {basicLabel.length ? (
            basicLabel
          ) : (
            <NoData
              text={intl
                .get('ide.src.component.no-data.noData.rwnouwn2p1f')
                .d('暂无数据')}
              size="small"
            />
          )}
        </div>
      </div>
    )
  }
}
export default DetailSidebar
