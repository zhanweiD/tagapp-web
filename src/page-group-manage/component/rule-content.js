import {Component} from 'react'
import {Button, Form} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import Group from './group'
import WrapRuleCondition from './wrap-rule-condition'
import './index.styl'

const originalData = [{
  type: 0,
  flag: '0',
  level: [0],
  logic: 1,
}]

export default class RuleContent extends Component {
  state = {
    renderData: originalData,
    firstConditionH: 0,
    firstConditionT: 21,
  }

  renderData = originalData

  pos = {}
  selfCon = 1
  logicMap = {}

  componentDidMount() {
    this.props.onRef(this)
  }

  refreshLineH = d => {
    this.pos = {...this.pos, ...d}
    const data = this.renderData

    const len = data.length

    this.heightFirst = document.getElementById('second-rule-condition0').getBoundingClientRect()
    this.heightEnd = document.getElementById(`second-rule-condition${len - 1}`).getBoundingClientRect()

    const firstConditionT = 21 + this.heightFirst.height / 2
    const firstConditionH = (this.heightEnd.top + this.heightEnd.height / 2) - (this.heightFirst.top + this.heightEnd.height / 2)

    this.setState({
      firstConditionT,
      firstConditionH,
    })
  }

  changeSelfCondition = (data, i) => {
    if (typeof i === 'undefined') {
      this.selfCon = data.logic
    } else {
      this.renderData[i].logic = data.logic
    }
  }

  changeCondition = (data, flag) => {
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

  render() {
    const {firstConditionH, firstConditionT, renderData} = this.state

    return (
      <div>
        <div className="mb24">
          <Button type="primary" icon={<PlusOutlined />} onClick={this.addGroup}>添加</Button>
          <Button className="ml8">重置条件</Button>
        </div>
        <div className="group">
          <Form
            ref={this.props.formRef}
          > 
            {
              renderData.map((d, i) => (
                <Group 
                  ml={50} 
                  id={`group-combine${d.flag}`}
                  {...d} 
                  index={i} 
                  showLine={renderData.length > 1}
                  refreshLineH={this.refreshLineH}
                  changeSelfCondition={d => this.changeSelfCondition(d, i)}
                  changeCondition={this.changeCondition}
                />
              ))
            }
          </Form>
          {
            renderData.length > 1 ? (
              <WrapRuleCondition 
                pos={[4, firstConditionT, firstConditionH]}
                id="first-rule-condition"
                showLine={false}
                changeCondition={this.changeSelfCondition}
              />
            ) : null
          }
       
        </div>
      </div>
     
    )
  }
}
