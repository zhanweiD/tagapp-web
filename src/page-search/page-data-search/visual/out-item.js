
import React, {useState} from 'react'

import {
  Form,
  Input,
  Select,
  Popconfirm,
} from 'antd'

import {outValueLogic} from './util'
import {IconDel, IconTreeAdd} from '../../../icon-comp'
import {getNamePattern} from '../../../common/util'

const {Option} = Select

const OutItem = ({
  id, 
  expressionTag,
  delOutConfig,
  addOutConfig,
  index,
  outNameBlur,
  outNameChange,
  outNameMap,
}) => {
  const [tagList, changeTagList] = useState(expressionTag)
  const [showSelect, changeShowSelect] = useState(true)
  const [showInput, changeShowInput] = useState(false)
  const [showLeftInput, changeShowLeftInput] = useState(false)

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

    if (obj.value === 'date_format') {
      changeShowLeftInput(true)
    } else {
      changeShowLeftInput(false)
    }
  }

  function onBlur(e) {
    outNameBlur(e.target.value, id)
  }

  function onChange(e) {
    outNameChange(e.target.value, id)
  }

  const obj = {...outNameMap}
  
  delete obj[id]

  return (
    <Form.Item key={id}>
      <Input.Group compact>
        <Form.Item
          size="small"
          name={[id, 'function']}
          noStyle
          rules={[{required: true, message: '请选择取值逻辑'}]}
          initialValue="标签值"
        >
          <Select placeholder="请选择取值逻辑" style={{minWidth: '200px'}} showSearch onSelect={onSelect} optionFilterProp="children">
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
            >
              <Select
                placeholder="请选择标签"
                style={{minWidth: '200px'}}
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

        {
          showLeftInput ? (

            <Form.Item
              name={[id, 'params1']}
              noStyle
              rules={[{required: true, message: '请输入'}]}
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
            pattern: /[^0-9]/, message: '显示名称禁止设置数字',
          }, 
          {
            validator: (rule, value) => {
              // if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value))) {
              //   return Promise.reject('显示名称格式不正确，允许输入中文/英文/数字')
              // }
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
        >
          <Input size="small" style={{width: '30%', marginLeft: '16px'}} placeholder="请输入显示名称" onBlur={onBlur} onChange={onChange} />
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
