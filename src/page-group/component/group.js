import React, {Component} from 'react'
import WrapRuleCondition from './wrap-rule-condition'
import RuleIfBox from './ruleIfBox'

const titleMap = {
  0: '实体属性满足',
  1: '实体关系满足',
}

export default class Group extends Component {
  constructor(props) {
    super(props)
    this.posData = props.pos || {
      [`${props.flag}-0`]: [{
        type: 2,
        flag: '0',
        level: [0],
        x: 20,
        y: 0,
        source: null,
        target: null,
      }],
      [`${props.flag}-1`]: [{
        type: 2,
        flag: '0',
        level: [0],
        x: 20,
        y: 0,
        source: null,
        target: null,
      }],
    }

    this.state = {
      conditionH: 210,
    }
  }

  componentDidMount() {
    this.refreshLineH()
  }

  refreshLineH = (data, id) => {
    const {flag, type, refreshContentLineH} = this.props

    this.posData[id] = data

    this.heightFirst = $(`#${type}-group-combine-${flag}-0`).height()
    this.heightEnd = $(`#${type}-group-combine-${flag}-1`).height()

    const conditionH = this.heightFirst + 24

    this.setState({
      conditionH,
    }, () => {
      refreshContentLineH(this.posData)
    })
  }

  delGroupItem = type => {
    // const {index, flag, level} = this.props

    // this.props.delGroupItem({
    //   type,
    //   index,
    //   flag,
    //   level,
    // }, () => {
    //   this.refreshLineH()
    // })
  }

  render() {
    const {
      ml, 
      id, 
      flag, 
      showLine,
      changeCondition,
      changeSelfCondition,
      type,
      logic,
      pos,
      page,
    } = this.props

    const {conditionH} = this.state

    const style = {
      marginLeft: `${ml}px`,
    }

    return (
      <div className="group-combine" style={style} id={id}>
        {
          [0, 1].map(d => (
            <div className="group-item" style={{marginLeft: `${ml}px`}} id={`${type}-group-combine-${flag}-${d}`}>
              <div className="line" />
              <div className="group-item-header">
                <span>
                  {titleMap[d]}
                </span>
              </div>
              <div className="group-item-content">
                <RuleIfBox 
                  {...this.props}
                  refreshLineH={this.refreshLineH} 
                  ruleIfBoxKey={`${flag}-${d}`}
                  changeCondition={data => changeCondition(data, `${flag}-${d}`)}
                  pos={pos ? pos[`${+flag}-${d}`] : this.posData[`${+flag}-${d}`]}
                />
              </div>
            </div>
          ))
        }
        <WrapRuleCondition 
          logic={logic}
          pos={[54, 21, conditionH]} 
          id={`${type}-second-rule-condition${flag}`}
          showLine={showLine}
          changeCondition={changeSelfCondition}
          page={page}
        />

      </div>
    )
  }
}
