import React, {Component} from 'react'
import WrapRuleCondition from './wrap-rule-condition'
import RuleIfBox from './ruleIfBox'

const titleMap = {
  1: '实体属性满足',
  2: '实体关系满足',
}

export default class Group extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  posData = {}

  state = {
    conditionH: 210,
  }

  componentDidMount() {
    const {flag} = this.props
    this.refreshLineH()

    this.posData = {
      [`${flag}-0`]: [{
        type: 2,
        flag: '0',
        level: [0],
        x: 20,
        y: 0,
        source: null,
        target: null,
      }],
      [`${flag}-1`]: [{
        type: 2,
        flag: '0',
        level: [0],
        x: 20,
        y: 0,
        source: null,
        target: null,
      }],
    }
  }

  refreshLineH = (data, id) => {
    this.posData[id] = data
    console.log(this.posData)
    const {flag} = this.props

    this.heightFirst = $(`#group-combine-${flag}-0`).height()
    this.heightEnd = $(`#group-combine-${flag}-1`).height()

    const conditionH = this.heightFirst + 24
 
    this.setState({
      conditionH,
    }, () => {
      this.props.refreshLineH(this.posData)
    })
  }

  delGroupItem = type => {
    const {index, flag, level} = this.props

    this.props.delGroupItem({
      type,
      index,
      flag,
      level,
    }, () => {
      this.refreshLineH()
    })
  }

  render() {
    const {
      ml, 
      id, 
      flag, 
      showLine,
    } = this.props
    const {conditionH} = this.state

    const style = {
      marginLeft: `${ml}px`,
    }

    return (
      <div className="group-combine" style={style} id={id}>
        <div className="group-item" style={{marginLeft: `${ml}px`}} id={`group-combine-${flag}-0`}>
          <div className="line" />
          <div className="group-item-header">
            <span>
              {titleMap[1]}
            </span>
          </div>
          <div className="group-item-content">
            <RuleIfBox 
              refreshLineH={this.refreshLineH} 
              ruleIfBoxKey={`${flag}-0`}
              changeCondition={data => this.props.changeCondition(data, `${flag}-0`)}
            />
          </div>
        </div>

        <div className="group-item" style={{marginLeft: `${ml}px`}} id={`group-combine-${flag}-1`}>
          <div className="line" />
          <div className="group-item-header">
            <span>
              {titleMap[2]}
            </span>
          </div>
          <div className="group-item-content">
            <RuleIfBox 
              refreshLineH={this.refreshLineH} 
              ruleIfBoxKey={`${flag}-1`}
              changeCondition={data => this.props.changeCondition(data, `${flag}-0`)}
            />
          </div>
        </div>

        <WrapRuleCondition 
          pos={[24, 21, conditionH]} 
          id={`second-rule-condition${flag}`}
          showLine={showLine}
          changeCondition={this.props.changeSelfCondition}
        />
 
      </div>
    )
  }
}
