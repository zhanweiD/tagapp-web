import React, {Component, Fragment} from 'react'
import {Tabs} from 'antd'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'

import AnalyzeTab from './analyze-tab'
import LabelTab from './label-tab'

const {TabPane} = Tabs
@inject('store')
@observer
export default class ShowLabel extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  
  @action.bound tabSwitch(value) {
    // if (!this.store.mainLabel) return 
    this.store.allLabels = []
    if (value === '2') {
      this.store.getAllTags()
    } else {
      this.store.getLabel()
    }
  } 

  render() {
    return (
      <Fragment>
        <Tabs defaultActiveKey="1" onChange={this.tabSwitch} className="label-tab">
          <TabPane tab="标签分析" key="1" className="fz14">
            <AnalyzeTab />
          </TabPane>
          <TabPane tab="全部标签" key="2" className="fz14">
            <LabelTab />
          </TabPane>
        </Tabs>
      </Fragment>
    )
  }
}
