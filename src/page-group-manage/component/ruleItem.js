import {useState} from 'react'
import {Select, Input, Form} from 'antd'
import OnerFrame from '@dtwave/oner-frame'

import {IconDel, IconTreeAdd} from '../../icon-comp'
import {functionList, condition} from './util'
import io from '../rule-create/io'

const {Option} = Select
const FormItem = Form.Item

const RuleItem = ({
  pos = [], 
  delCon, 
  flag,
  addCombineCon,
  addCombineItem,
  ruleIfBoxKey,
  ruleType,
  configTagList = [],
  relList = [],
  otherEntity = [],
  openDrawer,
  ...rest
}) => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()
  const [relTagList, changeRelTagList] = useState([])
  const [entityTagList, changeEntityTagList] = useState(configTagList)
  const [relId, changeRelId] = useState()

  const posStyle = {
    left: pos[0],
    top: pos[1],
  }

  const levelEnd = rest.level[rest.level.length - 1]

  const key = `${ruleIfBoxKey}-${flag}`

  const onSelectEntityTag = e => {
    const [obj] = functionList.filter(d => d.value === e)
    const newTagList = entityTagList.filter(d => obj.tagTypeList.includes(d.tagType))
    changeEntityTagList(newTagList)
  }

  async function getRelTagList(id) {
    const res = await io.getConfigTagList({
      projectId,
      objId: id,
    })
    changeRelTagList(res)
  }

  const open = () => {
    openDrawer(key, relId)
  }

  const onSelectRel = id => {
    changeRelId(id)
    getRelTagList(id)
  }

  if (rest.relId && typeof relId === 'undefined') {
    changeRelId(rest.relId)
    getRelTagList(rest.relId)
  }

  return (  
    <div className="rule-item" style={posStyle}>
      <Form.Item 
        key={key}
      >
        <Input.Group compact>
          {
            ruleType === 'set-rule' && +ruleIfBoxKey.slice(-1) === 1 ? (
              <FormItem
                label={null}
                name={[key, 'relId']}
                initialValue={rest.relId}
                rules={[{required: true, message: '请选择关系'}]}
              >
                <Select 
                  showSearch
                  style={{width: 180}}
                  optionFilterProp="children"
                  placeholder="请选择关系"
                  onSelect={onSelectRel}
                >
                  {
                    otherEntity.map(d => <Option value={d.objId}>{d.objName}</Option>)
                  }
                </Select>
              </FormItem>
            ) : null
          }
          {

            ruleType === 'config' && +ruleIfBoxKey.slice(-1) === 1 ? (
              <FormItem
                label={null}
                name={[key, 'relId']}
                rules={[{required: true, message: '请选择关系'}]}
                initialValue={rest.relId}
              >
                <Select 
                  showSearch
                  style={{width: 180}}
                  optionFilterProp="children"
                  placeholder="请选择关系"
                  onSelect={onSelectRel}
                >
                  {
                    relList.map(d => <Option value={d.objId}>{d.objName}</Option>)
                  }
                </Select>
              </FormItem>
            ) : null
          }
          <FormItem
            label={null}
            name={[key, 'leftFunction']}
            rules={[{required: true, message: '请选择函数'}]}
            initialValue={rest.leftFunction || '标签值'}
          >
            <Select 
              showSearch
              style={{width: 100}}
              optionFilterProp="children"
              placeholder="选择函数"
              onSelect={onSelectEntityTag}
            >
              {
                functionList.map(d => <Option value={d.value}>{d.name}</Option>)
              }
            </Select>
          </FormItem>
          {
            +ruleIfBoxKey.slice(-1) === 1 ? (
              <FormItem
                label={null}
                name={[key, 'leftTagId']}
                // rules={[{required: true, message: '请选择标签'}]}
                initialValue={rest.leftTagId}
              >
                <Select 
                  showSearch
                  style={{width: 180}}
                  optionFilterProp="children"
                  placeholder="选择标签"
                >
                  {
                    relTagList.map(d => (
                      <Option value={d.objIdTagId}>
                        <div title={d.objNameTagName} className="omit">{d.objNameTagName}</div>
                      </Option>
                    ))}
         
                </Select>
              </FormItem>
            ) : (
              <FormItem
                label={null}
                name={[key, 'leftTagId']}
                rules={[{required: true, message: '请选择标签'}]}
                initialValue={rest.leftTagId}
              >
                <Select 
                  showSearch
                  style={{width: 180}}
                  optionFilterProp="children"
                  placeholder="选择标签"
                >
                  {
                    configTagList.map(d => (
                      <Option value={d.objIdTagId}>
                        <div title={d.objNameTagName} className="omit">{d.objNameTagName}</div>
                      </Option>
                    ))}
         
                </Select>
              </FormItem>
            )
          }
           
          <FormItem
            label={null}
            name={[key, 'comparision']}
            initialValue={rest.comparision || '='}
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
            label={null}
            name={[key, 'rightFunction']}
            initialValue={rest.rightFunction || '固定值'}
          >
            <Select style={{width: 100}}>
              <Option value="固定值">固定值</Option>
            </Select>
          </FormItem>

          <FormItem
            label={null}
            name={[key, 'rightParams']}
            rules={[{required: true, message: '不能为空'}]}
            initialValue={rest.rightParams}
          >
            <Input placeholder="请输入" style={{width: 120}} />
          </FormItem>

          <FormItem label={null}>
            <div className="FBH fs14" style={{color: '#919eab'}}>
              {
                +ruleIfBoxKey.slice(-1) === 1 
                && ruleType === 'config' 
                && relId 
                  ? <a href onClick={open} className="ml8 fs12">设置筛选</a> : null
              }
              
              {

                rest.level.length === 1 ? null : rest.level.length === 3 
                  ? <IconTreeAdd size="14" onClick={() => addCombineItem()} className="ml8" /> 

                  : <IconTreeAdd size="14" onClick={() => addCombineCon()} className="ml8" />

              }

              {
                levelEnd === 0
                  ? null 
                  : <IconDel size="14" className="ml8" onClick={() => delCon()} style={{right: '0px'}} />
              }
            </div>
            
          </FormItem>
          
        </Input.Group>
       
      </Form.Item>
        
    </div>
  )
}

export default RuleItem
