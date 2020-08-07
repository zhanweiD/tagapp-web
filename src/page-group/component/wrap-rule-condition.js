import {useState} from 'react'
import {Button, Popconfirm} from 'antd'
import {IconDel} from '../../icon-comp'

const RuleCondition = ({
  flag,
  logic = 1,
  changeCondition,
  pos = [],
  id,
  showLine,
  page,
  canDelete,
  delCon,
}) => {
  const [isAnd, changeIsAnd] = useState(logic === 1)
  const change = () => {
    const data = !isAnd
    const result = data === false ? 2 : 1

    changeCondition(result)
    changeIsAnd(data)
  }

  const height = pos[2] || 50

  const posStyle = {
    left: pos[0],
    top: pos[1],
    height: `${height}px`,
  }

  const childPosStyle = {
    top: `${height / 2 - 16}px`,
  }

  return (
    <div style={posStyle} className="wrap-rule-condition" id={id}>
      <div style={childPosStyle} className="wrap-rule-condition-btn">
        {
          page === 'detail' ? (
            <Button>
              {isAnd ? '且' : '或'}
            </Button>
          ) : (
            <Button onClick={change}>
              {isAnd ? '且' : '或'}
            </Button>
          )
        }
        {
          canDelete && page !== 'detail' && flag !== '0' ? (
            <Popconfirm
              placement="topLeft"
              title="确认删除？"
              onConfirm={() => delCon()} 
              okText="确认"
              cancelText="取消"
            >
              <IconDel size="16" className="delete-icon" />
            </Popconfirm>
          ) : null
        }
      </div>
      {
        showLine ? <div className="wrap-rule-condition-line" style={{top: height / 2}} /> : null 
      }
    </div>
  )
}

export default RuleCondition
