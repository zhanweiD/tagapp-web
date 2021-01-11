import intl from 'react-intl-universal'
import React, { Component, Fragment } from 'react'
import { Tabs } from 'antd'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'

import AnalyzeTab from './analyze-tab'
import LabelTab from './label-tab'

const { TabPane } = Tabs
@inject('store')
@observer
class ShowLabel extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  render() {
    const { mainLabel, objId } = this.store
    return (
      <Fragment>
        <Tabs defaultActiveKey="1" className="label-tab">
          <TabPane
            tab={intl
              .get('ide.src.page-group.portrayal.show-label.ur6dzrc812e')
              .d('标签分析')}
            key="1"
            className="fz14"
          >
            <AnalyzeTab idKey={this.props.idKey} key={`${mainLabel}${objId}`} />
          </TabPane>
          <TabPane
            tab={intl
              .get('ide.src.page-group.portrayal.show-label.lzwr5om4aao')
              .d('全部标签')}
            key="2"
            className="fz14 h-100"
          >
            <LabelTab className="h-100" />
          </TabPane>
        </Tabs>
      </Fragment>
    )
  }
}
export default ShowLabel
