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
  }],
}

export default class RuleContent extends Component {
  constructor(props) {
    super(props)

    const {posList = {}} = props

    const {rule, pos, selfCon, logicMap} = originalData

    this.state = {
      renderData: posList.rule || rule,
      firstConditionH: 0,
      firstConditionT: 21,
      key: 0,
    }

    this.renderData = posList.rule || rule || {}
    this.pos = posList.pos || pos || {}
    this.selfCon = posList.selfCon || selfCon || 1
    this.logicMap = posList.logicMap || logicMap || {}
  }

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
    const {type, reset} = this.props

    if (type === 'config') {
      reset()
    }

    this.setState({
      renderData: originalData.rule,
      key: Math.random(),
    }, () => {
      this.renderData = originalData.rule
      this.refreshLineH()
    }) 
  }

  render() {
    const {
      key,
      renderData, 
      firstConditionH, 
      firstConditionT, 
    } = this.state

    const {
      type,
      formRef,
      relList,
      openDrawer,
      otherEntity,
      configTagList,
      page,
    } = this.props

    return (
      <div>
        {
          page === 'detail' ? null : (
            <div className="mb24">
              <Button type="primary" icon={<PlusOutlined />} onClick={this.addGroup}>添加</Button>
              <Button className="ml8" onClick={this.reset}>重置条件</Button>
            </div>
          )
        }
    
        <div className="group">
          <Form
            key={key}
            ref={formRef}
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
                  openDrawer={openDrawer}
                  pos={d.pos}
                  flag={d.flag}
                  logic={d.logic}
                  configTagList={configTagList}
                  relList={relList}
                  otherEntity={otherEntity}
                  type={type}
                  page={page}
                />
              ))
            }
          </Form>
          {
            renderData.length > 1 ? (
              <WrapRuleCondition 
                showLine={false}
                logic={this.selfCon}
                pos={[64, firstConditionT, firstConditionH]}
                changeCondition={this.changeSelfCondition}
                page={page}
              />
            ) : null
          }
       
        </div>
      </div>
     
    )
  }
}
