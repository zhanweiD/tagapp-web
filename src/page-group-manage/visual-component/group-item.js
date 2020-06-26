import {Component} from 'react'
// import RuleCondition from './ruleCondition'
import {Button} from 'antd'
import RuleItem from './ruleItem'


const titleMap = {
  1: '实体属性满足',
  2: '实体关系满足',
}

export default class GroupItem extends Component {
  componentWillMount() {

  }

  addGroupItem = () => {
    console.log(this.props)
  }

  render() {
    const {type, mr, id, data} = this.props

    return (
      <div className="group-item" style={{marginLeft: `${mr}px`}} id={id}>
        <div className="line" />
        <div className="group-item-header">
          <span>
            {titleMap[type]}
          </span>
          <Button onClick={this.addGroupItem}>添加</Button>
        </div>
        <div className="group-item-content">
          {
            data.map(d => <RuleItem {...d} key={d.flag} />)
          }
        </div>
      </div>
    )
  }
}
