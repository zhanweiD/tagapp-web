import React, {Component, Fragment} from 'react'
import {Tooltip, Button, Progress} from 'antd'
import {action, observe} from 'mobx'
import {observer, inject} from 'mobx-react'
import {TagFilled} from '@ant-design/icons'

@inject('store')
@observer
export default class LabelTab extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentWillMount() {

  }
  tooltipTitle() {
    return (
      <div>
        <div>
          <span>{`${'姓名'}：${'张三'}`}</span>
        </div>
        <Progress 
          showInfo 
          strokeWidth={4} 
          strokeColor="#00d5af" 
          percent={75} 
          color="#fff"
          style={{color: '#fff'}}
        />
      </div>
    )
  }
  render() {
    return (
      <div className="pl24 pt-0">
        <div className="tab-content">
          <div>
            <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
            <span>{`默认类目（${11}）`}</span>
          </div>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">张三</Button>
          </Tooltip>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">李四王二</Button>
          </Tooltip>
        </div>
        <div>
          <div className="mt16">
            <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
            <span>{`兴趣偏好（${11}）`}</span>
          </div>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">竞技游戏</Button>
          </Tooltip>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">国外游</Button>
          </Tooltip>
        </div>
        <div>
          <div className="mt16">
            <TagFilled rotate={270} style={{color: 'rgba(0,0,0,.65)', marginRight: '12px'}} />
            <span>{`购物偏好（${11}）`}</span>
          </div>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">垃圾食品爱好者</Button>
          </Tooltip>
          <Tooltip title={this.tooltipTitle()} color="#639dd1">
            <Button className="label-btn">徒步</Button>
          </Tooltip>
        </div>
      </div>
    )
  }
}
