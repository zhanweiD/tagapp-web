import React, {Component, Fragment} from 'react'
import {Progress} from 'antd'
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
  componentWillMount() {

  }
  tooltipTitle(i) {
    const {tooltipLabel} = this.store
    return (
      <div>
        <div>
          <span>{tooltipLabel[i].x}</span>
        </div>
        <Progress 
          showInfo 
          strokeWidth={4} 
          strokeColor="#00d5af" 
          percent={tooltipLabel[i].y2} 
          color="#fff"
          style={{color: '#fff'}}
        />
      </div>
    )
  }
  render() {
    const {allLabels} = this.store
    return (
      <div className="pl24 pt-0">
        {
          allLabels.length ? (
            toJS(allLabels)
          ) : (
            <NoData />
            // isLoading={tableLoading}
            // {...noDataConfig}
          )
        }
        {/* <div className="tab-content">
          <div>
            <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
            <span>{`默认类目（${11}）`}</span>
          </div>
          {markedLabel}
        </div> */}
      </div>
    )
  }
}
