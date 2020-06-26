import {useState} from 'react'
import {Select, Input, Form, Button} from 'antd'
import {IconDel} from '../../icon-comp'

const {Option} = Select
const FormItem = Form.Item

const formItemLayout = null

const ruleFunctionList = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}]

const functionList = [{
  name: '标签值',
  value: '标签值',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}, {
  name: '绝对值',
  value: 'abs',
  tagTypeList: [2, 3],
}, {
  name: '总记录数',
  value: 'count',
  tagTypeList: [1, 2, 3, 4, 5, 6],
}, {
  name: '求和',
  value: 'sum',
  tagTypeList: [2, 3],
}, {
  name: '平均数',
  value: 'avg',
  tagTypeList: [2, 3],
}, {
  name: '最小值',
  value: 'min',
  tagTypeList: [2, 3],
}, {
  name: '最大值',
  value: 'max',
  tagTypeList: [2, 3],
}]

const condition = [{
  value: '=',
  name: '等于',
}, {
  value: '>',
  name: '大于',
}, {
  value: '>=',
  name: '大于等于',
}, {
  value: '<',
  name: '小于',
}, {
  value: '=<',
  name: '小于等于',
}, {
  value: '!=',
  name: '不等于',
}, 
// {
//   value: 'in',
//   name: '在集合',
// }, {
//   value: 'not in',
//   name: '不在集合',
// }, {
//   value: 'is null',
//   name: '为空',
// }
]

const RuleItem = ({
  id,
  tagList,
  pos = [],
  // delCon,
  info,
  type,
  ml,
  key,
  showLine,
  delCon,
}) => {
  const [form] = Form.useForm()
  const [leftFunction, changeLeftFunction] = useState()
  const [typeList, changeTypeList] = useState([1, 2, 3, 4, 5, 6])
  const [leftTagId, changeLeftTagId] = useState([1, 2, 3, 4, 5, 6])

  const onSelect = e => {
    const [fun] = functionList.filter(d => d.value === e)

    if (fun) {
      if (e === 'count') {
        const tag = tagList.filter(d => d.objMainTag === 1)

        form.setFieldsValue({leftTagId: tag[0] && tag[0].objIdTagId})
      } else {
        form.resetFields(['leftTagId'])
      }
     
      changeLeftFunction(e)
      changeTypeList(fun.tagTypeList)
      changeLeftTagId()
    }
  }

  const add = () => {
    console.log(info)
  }

  const del = () => {
    console.log(info)
  }

  const style = {
    marginLeft: `${ml}px`,
  }

  return (  
    <div className="rule-item" style={style} id={id}>
      {
        showLine ? <div className="rule-item-line" /> : null 
      }
      <Form
        name={key}
        {...formItemLayout}
      > 
        <Input.Group compact>
          <FormItem
          // {...formItemLayout}
            label={null}
            name={[key, 'leftFunction']}
            rules={[{required: true, message: '请选择函数'}]}
            // initialValue={info.leftFunction || '标签值'}
          >
            <Select 
              showSearch
              style={{width: 100}}
              optionFilterProp="children"
              placeholder="选择函数"
              onSelect={onSelect}
            >
              {
                true
                // 'setRule' === 'setRule' 
                  ? ruleFunctionList.map(d => <Option value={d.value}>{d.name}</Option>)
                  : functionList.map(d => <Option value={d.value}>{d.name}</Option>)
              }
            </Select>
          </FormItem>
          <FormItem
          // {...formItemLayout}
            label={null}
            name={[key, 'leftTagId']}
            rules={[{required: true, message: '请选择标签'}]}
            // initialValue={leftTagId}
          >
            <Select 
              showSearch
              style={{width: 180}}
              optionFilterProp="children"
              placeholder="选择标签"
            >
              {
                [].map(d => (
                  <Option value={d.objIdTagId}>
                    <div title={d.objNameTagName} className="omit">{d.objNameTagName}</div>
                  </Option>
                ))}
         
            </Select>
          </FormItem>
          <FormItem
          // {...formItemLayout}
            label={null}
            // initialValue={leftTagId}
            name={[key, 'comparision']}
          >
            <Select 
              showSearch
              style={{width: 100}}
              optionFilterProp="children"
            >
              {
                condition.map(d => <Option value={d.value}>{d.name}</Option>)
              }
         
            </Select>
          </FormItem>
          <FormItem
          // {...formItemLayout}
            label={null}
            name={[key, 'rightFunction']}
            // initialValue={info.rightFunction || '固定值'}
          >
            <Select style={{width: 100}}>
              <Option value="固定值">固定值</Option>
            </Select>
          </FormItem>

          <FormItem
          // {...formItemLayout}
            label={null}
            name="rightParams"
            rules={[{required: true, message: '不能为空'}]}
            // initialValue={info.rightParams}
          >
            <Input placeholder="请输入" style={{width: 120}} />
          </FormItem>
          <FormItem>
            <IconDel size="16" className="rule-item-action" onClick={del} style={{right: '0px'}} />
            <Button onClick={add}>➕</Button>
          </FormItem>
        </Input.Group>
      </Form>
      {/* {
        level[level.length - 1] > 0 && type !== 'detail' ? <IconDel size="16" className="rule-item-action" onClick={() => delCon()} style={{right: '0px'}} /> : null
      } */}
       
    </div>
  )
}
export default RuleItem
