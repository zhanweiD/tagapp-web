
import React, {useState} from 'react'

import {
  Form,
  Input,
  Select,
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
}) => {
  const [tagList, changeTagList] = useState(expressionTag)
  const [showSelect, changeShowSelect] = useState(true)
  const [showInput, changeShowInput] = useState(false)

  const onSelect = e => {
    const [obj] = outValueLogic.filter(d => d.value === e)

    const newTagList = expressionTag.filter(d => obj.tagTypeList.includes(d.tagType))

    if (obj.value === '固定值') {
      changeShowInput(true)
      changeShowSelect(false)
    } else if (obj.value === 'count') {
      // changeTagList(newTagList)
      changeShowInput(false)
      changeShowSelect(false)
    } else {
      changeTagList(newTagList)
      changeShowSelect(true)
      changeShowInput(false)
    }
  }

  return (
    <Form.Item key={id}>
      <Input.Group compact>
        <Form.Item
          name={[id, 'function']}
          noStyle
          rules={[{required: true, message: '请选择取值逻辑'}]}
          initialValue="标签值"
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
            >
              <Input style={{width: '200px'}} placeholder="请输入" />

            </Form.Item>
          ) : null
        }
        {
          showSelect ? (
            <Form.Item
              name={[id, 'params']}
              noStyle
              rules={[{required: true, message: '请选择标签'}]}
            >
              <Select
                placeholder="请选择标签"
                style={{ width: '200px' }}
                showSearch
                optionFilterProp="children"
              >
                {
                  tagList.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
                } 
              </Select>

            </Form.Item>
          ) : null
        }
       
        <Form.Item
          name={[id, 'alias']}
          noStyle
          rules={[{required: true, message: '请输入显示名称'}]}
        >
          <Input style={{width: '30%', marginLeft: '16px'}} placeholder="请输入显示名称" />
        </Form.Item>
        <Form.Item>
          <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
            <IconDel size="14" onClick={() => delOutConfig(index)} className="ml8 mr4" />
            <IconTreeAdd size="14" onClick={() => addOutConfig(index)} />
          </div>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

export default OutItem
