import React, {Component} from 'react'
import WrapRuleCondition from './wrap-rule-condition'
import RuleIfBox from './ruleIfBox'

const titleConfigMap = {
  0: '实体属性满足',
  1: '实体关系满足',
}

const titleSetMap = {
  0: '关系属性满足',
  1: '关联实体满足',
}

export default class Group extends Component {
  constructor(props) {
    super(props)

    this.posData = props.pos || {}
    this.state = {
      conditionH: 66,
    }
  }

  componentDidMount() {
    this.refreshLineH()
  }

  // componentDidUpdate(preProps, preState) {
  //   if (this.state.conditionH) {
  //     this.props.refreshContentLineH(this.posData)
  //   }
  // }

  refreshLineH = (data, id) => {
    const {refreshContentLineH, flag} = this.props

    if (id) {
      this.posData[id] = data
    }

    let conditionH = 66
    
    // 条件重置
    if (!this.posData[`${flag}-0`]) {
      this.setState({
        conditionH: 66,
      }, () => {
        refreshContentLineH(this.posData)
      })
      return 
    }

    if (id) {
      const renderData = id.slice(-1) === '0' ? data : this.posData[`${flag}-0`]
      const conList = renderData.filter(d => d.type === 2)
      conditionH = conList.length * 64 + 42 + 24
    } else {
      const renderData = this.posData[`${flag}-0`]
      const conList = renderData.filter(d => d.type === 2)
      conditionH = conList.length * 64 + 42 + 24
    }

    this.setState({
      conditionH,
    }, () => {
      refreshContentLineH(this.posData)
    })
  }

  delGroupItem = type => {
    const {groupIndex, flag, level} = this.props

    this.props.delGroupItem({
      type,
      groupIndex,
      flag,
      level,
    })
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
      changeRelWithRuleConfig,
      stepOneObjId,
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
                  {type === 'config' ? titleConfigMap[d] : titleSetMap[d] }
                </span>
              </div>
              <div className="group-item-content">
                <RuleIfBox 
                  key={`${flag}-${d}`}
                  {...this.props}
                  refreshLineH={this.refreshLineH} 
                  ruleIfBoxKey={`${flag}-${d}`}
                  changeCondition={data => changeCondition(data, `${flag}-${d}`)}
                  pos={pos ? pos[`${+flag}-${d}`] : this.posData[`${+flag}-${d}`]}
                  changeRelWithRuleConfig={changeRelWithRuleConfig}
                  stepOneObjId={stepOneObjId}
                />
              </div>
            </div>
          ))
        }
        <WrapRuleCondition 
          flag={flag}
          logic={logic}
          pos={[54, 21, conditionH]} 
          id={`${type}-second-rule-condition${flag}`}
          showLine={showLine}
          changeCondition={changeSelfCondition}
          page={page}
          canDelete
          delCon={this.delGroupItem}
        />

      </div>
    )
  }
}
