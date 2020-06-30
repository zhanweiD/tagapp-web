import {Component} from 'react'
import {Button, Form} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import Group from './group'
import WrapRuleCondition from './wrap-rule-condition'

import './index.styl'

const originalData = {
  whereMap: {},
  selfCon: 1,
  rule: [{
    flag: '0',
    logic: 1,
    pos: {
      '0-0': [{
        flag: '0',
        level: [0],
        source: null,
        target: null,
        type: 1,
        x: 0,
        y: 32,
        logic: 1,
      }, {
        flag: '0-0',
        level: [0, 0],
        source: [22, 48],
        target: [88, 16],
        type: 2,
        x: 88,
        y: 0,
        comparision: '=',
        leftFunction: '标签值',
        leftTagId: '7205390117788992.7205454747884864',
        rightFunction: '固定值',
        rightParams: '1',
      }, {
        flag: '0-1',
        level: [0, 1],
        source: [22, 48],
        target: [88, 80],
        type: 2,
        x: 88,
        y: 64,
        comparision: '=',
        leftFunction: '标签值',
        leftTagId: '7205390117788992.7205454747884864',
        rightFunction: '固定值',
        rightParams: '1',
      }],
      '0-1': [{
        flag: '0',
        level: [0],
        source: null,
        target: null,
        type: 2,
        x: 20,
        y: 0,
        comparision: '=',
        leftFunction: '标签值',
        leftTagId: '7205390117788992.7205454747884864',
        rightFunction: '固定值',
        rightParams: '1',
      }],
    },
  }],
}

export default class RuleContent extends Component {
  state = {
    renderData: originalData.rule,
    firstConditionH: 0,
    firstConditionT: 21,
    key: 0,
  }

  renderData = originalData.rule

  pos = originalData.pos || {}
  selfCon = originalData.selfCon || 1
  logicMap = originalData.logicMap || {}

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  refreshLineH = d => {
    const {type} = this.props
    this.pos = {...this.pos, ...d}

    const data = this.renderData

    const len = data.length

    this.heightFirst = document.getElementById(`${type}-second-rule-condition0`).getBoundingClientRect()
    this.heightEnd = document.getElementById(`${type}-second-rule-condition${len - 1}`).getBoundingClientRect()

    const firstConditionT = 21 + this.heightFirst.height / 2
    const firstConditionH = (this.heightEnd.top + this.heightEnd.height / 2) - (this.heightFirst.top + this.heightFirst.height / 2)

    this.setState({
      firstConditionT,
      firstConditionH,
    })
  }

  changeSelfCondition = (data, i) => {
    if (typeof i === 'undefined') {
      this.selfCon = data
    } else {
      this.renderData[i].logic = data

      this.setState({
        renderData: this.renderData,
      })
    }
  }

  changeCondition = (data, flag) => {
    console.log(data, flag)
    const currentFlag = `${flag}-${data.flag}`
    this.logicMap[currentFlag] = data.logic
  }

  addGroup = () => {
    const {renderData} = this.state
    const current = _.cloneDeep(renderData)

    const obj = {
      type: 0,
      flag: renderData.length,
      logic: 1,
    }

    current.push(obj)

    this.renderData = current

    this.setState({
      renderData: current,
    }, () => {
      this.refreshLineH(current)
    })
  }

  reset = () => {
    this.setState({
      renderData: originalData.rule,
      key: Math.random(),
    }, () => {
      this.renderData = originalData.rule
      this.refreshLineH()
    }) 
  }

  render() {
    const {firstConditionH, firstConditionT, renderData, key} = this.state

    return (
      <div>
        <div className="mb24">
          <Button type="primary" icon={<PlusOutlined />} onClick={this.addGroup}>添加</Button>
          <Button className="ml8" onClick={this.reset}>重置条件</Button>
        </div>
        <div className="group">
          <Form
            key={key}
            ref={this.props.formRef}
          > 
            {
              renderData.map((d, i) => (
                <Group 
                  ml={80} 
                  id={`group-combine${d.flag}`}
                  showLine={renderData.length > 1}
                  changeCondition={this.changeCondition}
                  refreshContentLineH={this.refreshLineH}
                  changeSelfCondition={d => this.changeSelfCondition(d, i)}
                  flag={d.flag}
                  logic={d.logic}
                  {...this.props}
                  pos={d.pos}
                />
              ))
            }
          </Form>
          {
            renderData.length > 1 ? (
              <WrapRuleCondition 
                showLine={false}
                logic={this.selfCon}
                pos={[34, firstConditionT, firstConditionH]}
                changeCondition={this.changeSelfCondition}
              />
            ) : null
          }
       
        </div>
      </div>
     
    )
  }
}
