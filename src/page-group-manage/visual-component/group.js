import {Component} from 'react'
import {Button} from 'antd'
import RuleCondition from './wrap-rule-condition'
import {RuleIfBox} from '../component'

const titleMap = {
  1: '实体属性满足',
  2: '实体关系满足',
}

const mrMap = {
  3: 80,
  4: 120,
  5: 180,
}

export default class Group extends Component {
  state = {
    conditionH: 210,
  }

  componentDidMount() {
    this.refreshLineH()
  }

  refreshLineH = () => {
    const {flag} = this.props

    this.heightFirst = $(`#group-combine-${flag}-0`).height()
    this.heightEnd = $(`#group-combine-${flag}-1`).height()

    const conditionH = this.heightFirst + 24
 

    this.setState({
      conditionH,
    })
  }

  addGroupItem = type => {
    const {index} = this.props

    this.props.addGroupItem({
      type,
      index,
    }, () => {
      console.log(123)
      this.refreshLineH()
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

  renderCondition = () => {
    const {entityCon} = this.props

    return entityCon.map(d => {
      return <RuleCondition pos={[d.mr, 21, 80 * (d.childLen - 1)]} showLine={false} />
    })
  }

  render() {
    const {
      ml, 
      id, 
      flag, 
      level, 
      entity,
      entityCon,
      rel,
      relCon,
      logic,
      showLine,
    } = this.props
    const {conditionH} = this.state

    console.log(this.props)

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
            {/* <Button onClick={() => this.addGroupItem('entity')}>添加</Button> */}
          </div>
          <div className="group-item-content">
            <RuleIfBox />
          </div>
        </div>

        <div className="group-item" style={{marginLeft: `${ml}px`}} id={`group-combine-${flag}-1`}>
          <div className="line" />
          <div className="group-item-header">
            <span>
              {titleMap[2]}
            </span>
            {/* <Button onClick={() => this.addGroupItem('rel')}>添加</Button> */}
          </div>
          <div className="group-item-content">
            <RuleIfBox />
          </div>
        </div>

        <RuleCondition pos={[24, 21, conditionH]} id={`second-rule-condition${flag}`} showLine={showLine} />
      </div>
    )
  }
}
