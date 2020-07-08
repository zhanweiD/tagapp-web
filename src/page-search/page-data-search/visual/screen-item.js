import React, {useState, Fragment} from 'react'

import {
  Form,
  Input,
  Select,
} from 'antd'

import {outValueLogic, screenValueLogic, comparison} from './util'
import {IconDel, IconTreeAdd} from '../../../icon-comp'

const {Option} = Select

const ScreenItem = ({
  id, 
  expressionTag,
  delScreenConfig,
  addScreenConfig,
  index,
}) => {
  const [tagList, changeTagList] = useState(expressionTag)
  const [rightFunction, changeRightFunction] = useState('固定值')
  const [showSelect, changeShowSelect] = useState(true)
  const [showInput, changeShowInput] = useState(false)

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
  }

  const onSelectRightFun = e => {
    changeRightFunction(e)
  }

  return (
    <Form.Item>
      <Input.Group compact key={id}>
        <Form.Item
          name={[id, 'leftFunction']}
          noStyle
          rules={[{required: true, message: '请选择取值逻辑'}]}
          initialValue="标签值"
        >
          <Select placeholder="请选择" style={{width: '150px'}} showSearch onSelect={onSelect}>
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
              name={[id, 'leftParams']}
              noStyle
              rules={[{required: true, message: '请选择标签'}]}
            >
              <Select placeholder="请选择标签" style={{width: '200px'}} showSearch>
                {
                  tagList.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
                } 
              </Select>

            </Form.Item>
          ) : null
        }
       

        <Form.Item
          name={[id, 'comparision']}
          noStyle
          rules={[{required: true, message: '请选择'}]}
          initialValue="="
        >
          <Select placeholder="请选择" style={{width: '100px'}} showSearchs>
            {
              comparison.map(({name, value}) => <Option value={value}>{name}</Option>)
            }                               
          </Select>

        </Form.Item>
        <Form.Item
          name={[id, 'rightFunction']}
          noStyle
          rules={[{required: true, message: '请选择'}]}
          initialValue="固定值"
        >
          <Select placeholder="请选择" style={{width: '100px'}} showSearch onSelect={onSelectRightFun}>
            {
              screenValueLogic.map(({name, value}) => <Option value={value}>{name}</Option>)
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
                >
                  <Select placeholder="请选择标签" style={{width: '200px'}} showSearch onSelect={onSelect}>
                    {
                      expressionTag.map(d => <Option value={d.objIdTagId}>{d.objNameTagName}</Option>)
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
                    rules={[{required: true, message: '请输入'}]}
                  >
                    <Input style={{width: '20%'}} placeholder="请输入参数" />
                  </Form.Item>
                  <Form.Item
                    name={[id, 'rightParams1']}
                    noStyle
                    rules={[{required: true, message: '请输入'}]}
                  >
                    <Input style={{width: '20%'}} placeholder="请输入参数" />
                  </Form.Item>
                </Fragment>
               
              )
            }

            return (
              <Form.Item
                name={[id, 'rightParams']}
                noStyle
                rules={[{required: true, message: '请输入'}]}
              >
                <Input style={{width: '20%'}} placeholder="请输入" />
              </Form.Item>
            )
          })()
        }
        <Form.Item>
          <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
            <IconDel size="14" onClick={() => delScreenConfig(index)} className="ml8 mr4" />
            <IconTreeAdd size="14" onClick={() => addScreenConfig(index)} />
          </div>

        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

export default ScreenItem
