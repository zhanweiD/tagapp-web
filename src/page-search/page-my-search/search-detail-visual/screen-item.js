import React, {useState, Fragment} from 'react'

import {
  Form,
  Input,
  Select,
  Popconfirm,
} from 'antd'

import {screenLogic, screenValueLogic, comparison, tagComparison, aggregation, aggregationLogic} from './util'
import {IconDel, IconTreeAdd} from '../../../icon-comp'
import {getNamePattern, getEnNamePattern} from '../../../common/util'

const {Option} = Select

const ScreenItem = ({
  id, 
  expressionTag,
  delScreenConfig,
  addScreenConfig,
  index,
  info = {},
}) => {
  const [tagList, changeTagList] = useState(expressionTag)
  const [leftFunction, changeLeftFunction] = useState((info.left && info.left.function) || '固定值')
  const [rightFunction, changeRightFunction] = useState((info.right && info.right.function) || '固定值')
  const [showSelect, changeShowSelect] = useState(!((info.left && info.left.function) === 'count' || (info.left && info.left.function) === '固定值'))
  const [showInput, changeShowInput] = useState((info.left && info.left.function) === '固定值')
  const [initTag] = expressionTag.filter(d => d.objIdTagId === (info.left && info.left.params && info.left.params[0]))
  const [comparisonMap, changeComparisonMap] = useState((initTag && initTag.tagType === 4) ? tagComparison : comparison)
  const [showLeftInput, changeShowLeftInput] = useState((info.left && info.left.function) === 'date_format')

  const onSelect = e => {
    const [obj] = screenLogic.filter(d => d.value === e)

    const newTagList = expressionTag.filter(d => obj.tagTypeList.includes(d.tagType))
    changeLeftFunction(obj.value)
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

    changeComparisonMap(comparison)
    changeRightFunction('固定值')
  }

  const onSelectRightFun = e => {
    changeRightFunction(e)
  }

  const onSelectTag = e => {
    const [obj] = expressionTag.filter(d => d.objIdTagId === e)
    if (obj.tagType === 4) {
      changeComparisonMap(tagComparison)
    } else {
      changeComparisonMap(comparison)
    }
  }
  
  const {left, comparision, right} = info

  const validatorInput = (rule, value, callback) => {
    let isRepeat = 0
    $('.inputParams').each((i, item) => {
      if (value === item.value) isRepeat++
    })
    if (isRepeat > 1) {
      callback('参数名不能重复')
    } else {
      callback()
    }
  }

  return (
    <Form.Item>
      <Input.Group compact key={id}>
        <Form.Item
          name={[id, 'leftFunction']}
          noStyle
          size="small"
          rules={[{required: true, message: '请选择取值逻辑'}]}
          initialValue={(left && left.function) || '标签值'}
        >
          <Select placeholder="请选择" style={{width: '150px'}} showSearch onSelect={onSelect} optionFilterProp="children">
            {
              screenLogic.map(({name, value}) => <Option value={value}>{name}</Option>)
            }
          </Select>
        </Form.Item>

        {
          showInput ? (
            <Form.Item
              name={[id, 'leftParams']}
              noStyle
              rules={[{required: true, message: '请输入'}, ...getNamePattern()]}
              initialValue={left && left.params && left.params[0]}
            >
              <Input size="small" style={{width: '200px'}} placeholder="请输入" />

            </Form.Item>
          ) : null
        }
        
        {
          showSelect ? (
            <Form.Item
              name={[id, 'leftParams']}
              noStyle
              rules={[{required: true, message: '请选择标签'}]}
              initialValue={left && left.params && left.params[0]}
            >
              <Select placeholder="请选择标签" style={{width: '200px'}} onSelect={onSelectTag} showSearch optionFilterProp="children">
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
              name={[id, 'leftParams1']}
              noStyle
              rules={[{required: true, message: '请输入'}, ...getNamePattern()]}
              initialValue={left && left.params && left.params[1]}
            >
              <Input size="small" style={{width: '200px'}} placeholder="请输入" />
            </Form.Item>
          ) : null
        }

        <Form.Item
          name={[id, 'comparision']}
          noStyle
          rules={[{required: true, message: '请选择'}]}
          initialValue={comparision || '='}
        >
          <Select placeholder="请选择" style={{width: '100px'}} showSearch optionFilterProp="children">
            {
              comparisonMap.map(({name, value}) => <Option value={value}>{name}</Option>)
            }                               
          </Select>

        </Form.Item>
        <Form.Item
          name={[id, 'rightFunction']}
          noStyle
          rules={[{required: true, message: '请选择'}]}
          initialValue={(right && right.function) || '固定值'}
        >
          <Select placeholder="请选择" style={{width: '100px'}} showSearch onSelect={onSelectRightFun} optionFilterProp="children">
            {
              (aggregation.includes(leftFunction) ? aggregationLogic : screenValueLogic).map(({name, value}) => <Option value={value}>{name}</Option>)
            }
          </Select>

        </Form.Item>
        {
          (() => {
            if (rightFunction === '标签值') {
              return (
                <Form.Item
                  name={[id, 'rightParams']}
                  noStyle
                  rules={[{required: true, message: '请输入'}]}
                  initialValue={right && right.params && right.params[0]}
                >
                  <Select placeholder="请选择标签" style={{width: '200px'}} showSearch optionFilterProp="children">
                    {
                      tagList.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
                    } 
                  </Select>
                </Form.Item>
              )
            }

            if (rightFunction === 'param') {
              return (
                <Fragment>
                  <Form.Item
                    name={[id, 'rightParams']}
                    noStyle
                    rules={[{required: true, message: '请输入参数名'}, {validator: validatorInput}, ...getEnNamePattern()]}
                    initialValue={right && right.params && right.params[0]}
                  >
                    <Input size="small" className="inputParams" style={{width: '20%'}} placeholder="请输入参数名" />
                  </Form.Item>
                  <Form.Item
                    name={[id, 'rightParams1']}
                    noStyle
                    rules={[{required: true, message: '请输入参数默认值'}, ...getNamePattern()]}
                    initialValue={right && right.params && right.params[1]}
                  >
                    <Input size="small" style={{width: '20%'}} placeholder="请输入参数默认值" />
                  </Form.Item>
                </Fragment>
               
              )
            }

            return (
              <Form.Item
                name={[id, 'rightParams']}
                noStyle
                rules={[{required: true, message: '请输入'}, ...getNamePattern()]}
                initialValue={right && right.params && right.params[0]}
              >
                <Input size="small" style={{width: '20%'}} placeholder="请输入" />
              </Form.Item>
            )
          })()
        }
        <Form.Item>
          <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
            <Popconfirm
              placement="bottomLeft"
              title="确认删除"
              onConfirm={() => delScreenConfig(index)}
              okText="确实"
              cancelText="取消"
            >
              <IconDel size="14" className="ml8 mr4" />
            </Popconfirm>
            {/* <IconDel size="14" onClick={() => delScreenConfig(index)} className="ml8 mr4" /> */}
            <IconTreeAdd size="14" onClick={() => addScreenConfig(index)} />
          </div>

        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

export default ScreenItem
