
import React, {useState} from 'react'

import {
  Form,
  Input,
  Select,
  Popconfirm,
} from 'antd'

import {outValueLogic} from './util'
import {IconDel, IconTreeAdd} from '../../../icon-comp'

const {Option} = Select

const OutItem = ({
  id, 
  expressionTag,
  delOutConfig,
  addOutConfig,
  index,
  info = {},
  outNameBlur,
  outNameMap,
}) => {
  const [tagList, changeTagList] = useState(expressionTag)
  const [showSelect, changeShowSelect] = useState(!((info.conditionUnit && info.conditionUnit.function) === 'count' || (info.conditionUnit && info.conditionUnit.function) === '固定值'))
  const [showInput, changeShowInput] = useState((info.conditionUnit && info.conditionUnit.function) === '固定值')
  const [showLeftInput, changeShowLeftInput] = useState((info.conditionUnit && info.conditionUnit.function) === 'date_format')

  const onSelect = e => {
    const [obj] = outValueLogic.filter(d => d.value === e)

    const newTagList = expressionTag.filter(d => obj.tagTypeList.includes(d.tagType))
   
    if (obj.value === '固定值') {
      changeShowInput(true)
      changeShowSelect(false)
    } else if (obj.value === 'count') {
      changeShowInput(false)
      changeShowSelect(false)
    } else {
      changeTagList(newTagList)
      changeShowSelect(true)
      changeShowInput(false)
    }

    if (obj.value === 'date_format') {
      changeShowLeftInput(true)
    } else {
      changeShowLeftInput(false)
    }
  }

  function onBlur(e) {
    outNameBlur(e.target.value, id)
  }

  const {alias, conditionUnit} = info

  const obj = {...outNameMap}

  delete obj[id]

  return (
    <Form.Item key={id}>
      <Input.Group compact>
        <Form.Item
          name={[id, 'function']}
          noStyle
          size="small"
          rules={[{required: true, message: '请选择取值逻辑'}]}
          initialValue={(conditionUnit && conditionUnit.function) || '标签值'}
        >
          <Select placeholder="请选择取值逻辑" style={{width: '200px'}} showSearch onSelect={onSelect} optionFilterProp="children">
            {
              outValueLogic.map(({name, value}) => <Option value={value}>{name}</Option>)
            }
          </Select>
        </Form.Item>

        {
          showInput ? (
            <Form.Item
              name={[id, 'params']}
              noStyle
              rules={[{required: true, message: '请输入'}]}
              initialValue={(conditionUnit && conditionUnit.params && conditionUnit.params[0])}
            >
              <Input size="small" style={{width: '200px'}} placeholder="请输入" />

            </Form.Item>
          ) : null
        }

        {
          showSelect ? (
            <Form.Item
              name={[id, 'params']}
              noStyle
              rules={[{required: true, message: '请选择标签'}]}
              initialValue={(conditionUnit && conditionUnit.params && conditionUnit.params[0])}
            >
              <Select placeholder="请选择标签" style={{width: '200px'}} showSearch optionFilterProp="children">
                {
                  tagList.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
                } 
              </Select>

            </Form.Item>
          ) : null
        }

        {
          showLeftInput ? (

            <Form.Item
              name={[id, 'params1']}
              noStyle
              rules={[{required: true, message: '请输入'}]}
              initialValue={(conditionUnit && conditionUnit.params && conditionUnit.params[1])}
            >
              <Input size="small" style={{width: '200px'}} placeholder="请输入" />
            </Form.Item>
          ) : null
        }
       
        <Form.Item
          name={[id, 'alias']}
          noStyle
          rules={[{
            required: true, message: '请输入显示名称',
          }, {
            pattern: /[^0-9]/, message: '显示名称禁止输入数字',
          }, 
          {
            validator: (rule, value) => {
              if (Object.values(obj).includes(value)) {
                return Promise.reject('显示名称重复')
              }

              return Promise.resolve()
            },
          }, 
          {
            validateFirst: true,
          },
          ]}
          initialValue={alias}
        >
          <Input size="small" style={{width: '30%', marginLeft: '16px'}} placeholder="请输入显示名称" onBlur={onBlur} />
        </Form.Item>
        <Form.Item>
          <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
            <Popconfirm
              placement="bottomLeft"
              title="确认删除"
              onConfirm={() => delOutConfig(index, id)}
              okText="确实"
              cancelText="取消"
            >
              <IconDel size="14" className="ml8 mr4" />
            </Popconfirm>

            <IconTreeAdd size="14" onClick={() => addOutConfig(index)} />
          </div>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

export default OutItem
