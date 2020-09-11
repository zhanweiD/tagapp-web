import {useState} from 'react'
import {Select, Input, Form, Tooltip} from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import {IconDel, IconTreeAdd} from '../../icon-comp'
import {functionList, condition, entityFunctionList, textCondition} from './util'
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
  drawerConfigTagList = [],
  relList = [],
  otherEntity = [],
  openDrawer,
  ...rest,
  formRef,
  changeRelWithRuleConfig,
}) => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()

  const [relTagList, changeRelTagList] = useState([])
  const [tagList, changeTagList] = useState(ruleType === 'set-rule' ? drawerConfigTagList : configTagList)

  // render
  const [entityTagList, changeEntityTagList] = useState(tagList)
  const [relRenderTag, changeRelRenderTag] = useState([])

  const [functionRList] = useState((ruleType === 'config' && +ruleIfBoxKey.slice(-1) === 1) ? entityFunctionList : functionList)

  const [relId, changeRelId] = useState()
  // 比较符
  const [comparisonMap, changeComparisonMap] = useState(condition)

  const posStyle = {
    left: pos[0],
    top: pos[1],
  }

  const levelEnd = rest.level[rest.level.length - 1]

  const key = `${ruleIfBoxKey}-${flag}`

  // 选择函数
  const onSelectFun = e => {
    const [obj] = functionRList.filter(d => d.value === e)

    if(+ruleIfBoxKey.slice(-1) === 1) {
      const newTagList = relTagList.filter(d => obj.tagTypeList.includes(d.tagType))
      changeRelRenderTag(newTagList)
    } else {
      const newTagList = tagList.filter(d => obj.tagTypeList.includes(d.tagType))
      changeEntityTagList(newTagList)
    }

    const key = `${ruleIfBoxKey}-${flag}`
    const keyData = formRef.current.getFieldValue(key)

    formRef.current.setFieldsValue({
      [key]: {
        ...keyData,
        leftTagId: undefined,
      }
    })
  }

  // 根据对象获取标签数据
  async function getRelTagList(id) {
    const res = await io.getConfigTagList({
      projectId,
      objId: id,
    })
    changeRelTagList(res)
    changeRelRenderTag(res)
  }

  const open = () => {
    openDrawer(key, relId)
  }

  // 选择关系对象
  const onSelectRel = id => {
    if(+relId !== +id) {
      if(relId && ruleType === 'config') {
        changeRelWithRuleConfig(id)
      } 
      changeRelId(id)
      getRelTagList(id)
    }
  }

  // 选择标签
  const onSelectTag = e => {
    let obj = {}
    if (+ruleIfBoxKey.slice(-1) === 1) {
      [obj] = relRenderTag.filter(d => d.objIdTagId === e)
    } else {
      [obj] = entityTagList.filter(d => d.objIdTagId === e)
    }

    if (obj.tagType === 4) {
      changeComparisonMap(textCondition)
    } else {
      changeComparisonMap(condition)
    }

    const key = `${ruleIfBoxKey}-${flag}`
    const keyData = formRef.current.getFieldValue(key)

    formRef.current.setFieldsValue({
      [key]: {
        ...keyData,
        comparision: '=',
      }
    })
  }

  if (!rest.relId && otherEntity[0] && otherEntity[0].objId && typeof relId === 'undefined') {
    changeRelId(otherEntity[0].objId)
    getRelTagList(otherEntity[0].objId)
  }


  if (rest.relId && typeof relId === 'undefined') {
    changeRelId(rest.relId)
    getRelTagList(rest.relId)
  }

  return (  
    <div className="rule-item" style={posStyle}>
      <Form.Item>
        <Input.Group compact>
          {
            ruleType === 'set-rule' && +ruleIfBoxKey.slice(-1) === 1 ? (
              <FormItem
                label={null}
                size="small"
                name={[key, 'relId']}
                initialValue={rest.relId || (otherEntity[0] && otherEntity[0].objId)}
                rules={[{required: true, message: '请选择'}]}
              >
                <Select 
                  showSearch
                  style={{width: 170}}
                  optionFilterProp="children"
                  placeholder="请选择"
                  onSelect={onSelectRel}
                  disabled={rest.page === 'detail'}
                >
                  {
                    otherEntity.map(d => <Option value={d.objId}>{d.objName}</Option>)
                  }
                </Select>
              </FormItem>
            ) : null
          }
          {
            ruleType === 'config' && +ruleIfBoxKey.slice(-1) === 1 && rest.page !== 'detail' ? (
              <Tooltip title="更换关系对象会导致已设置的筛选条件被删除!">
                <FormItem
                  label={null}
                  name={[key, 'relId']}
                  rules={[{ required: true, message: '请选择关系' }]}
                  initialValue={rest.relId}
                >
                  <Select
                    showSearch
                    style={{ width: 170 }}
                    optionFilterProp="children"
                    placeholder="请选择关系"
                    onChange={onSelectRel}
                    disabled={rest.page === 'detail'}
                  >
                    {
                      relList.map(d => <Option value={d.objId}>{d.objName}</Option>)
                    }
                  </Select>
                </FormItem>
              </Tooltip>
            ) : null
          }

          {
            ruleType === 'config' && +ruleIfBoxKey.slice(-1) === 1 && rest.page === 'detail' ? (
              <FormItem
                label={null}
                name={[key, 'relId']}
                rules={[{ required: true, message: '请选择关系' }]}
                initialValue={rest.relId}
              >
                <Select
                  showSearch
                  style={{ width: 170 }}
                  optionFilterProp="children"
                  placeholder="请选择关系"
                  onChange={onSelectRel}
                  disabled={rest.page === 'detail'}
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
            initialValue={rest.leftFunction || (functionRList.length === 2 ? '标签值' : 'count')}
          >
            <Select 
              showSearch
              style={{width: 90}}
              optionFilterProp="children"
              placeholder="选择函数"
              onSelect={onSelectFun}
              disabled={rest.page === 'detail'}
            >
              {
                functionRList.map(d => <Option value={d.value}>{d.name}</Option>)
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
                  style={{width: 170}}
                  optionFilterProp="children"
                  placeholder="选择标签"
                  disabled={rest.page === 'detail'}
                  onSelect={onSelectTag}
                >
                  {
                    relRenderTag.map(d => (
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
                  style={{width: 170}}
                  optionFilterProp="children"
                  placeholder="选择标签"
                  disabled={rest.page === 'detail'}
                  onSelect={onSelectTag}
                >
                  {
                    entityTagList.map(d => (
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
              style={{width: 90}}
              optionFilterProp="children"
              disabled={rest.page === 'detail'}
            >
              {
                comparisonMap.map(d => <Option value={d.value}>{d.name}</Option>)
              }
         
            </Select>
          </FormItem>
          <FormItem
            label={null}
            name={[key, 'rightFunction']}
            initialValue={rest.rightFunction || '固定值'}
          >
            <Select style={{width: 90}} disabled={rest.page === 'detail'}>
              <Option value="固定值">固定值</Option>
            </Select>
          </FormItem>

          <FormItem
            label={null}
            name={[key, 'rightParams']}
            rules={[{required: true, message: '不能为空'}]}
            initialValue={rest.rightParams}
          >
            <Input size="small" placeholder="请输入" style={{width: 120}} disabled={rest.page === 'detail'} />
          </FormItem>

          {
            rest.page === 'detail' ? null : (
              <FormItem label={null}>
                <div className="FBH fs14" style={{color: '#919eab'}}>
                  {
                    +ruleIfBoxKey.slice(-1) === 1 
                && ruleType === 'config' 
                && relId 
                      ? <a href onClick={open} className="ml8 fs12">设置筛选</a> : null
                  }

                  {
                    rest.level.length === 3 && rest.isEnd ?  <IconTreeAdd size="14" onClick={() => addCombineItem()} className="ml8" /> : null
                  }

                  {
                    rest.level.length === 2 ? <IconTreeAdd size="14" onClick={() => addCombineCon()} className="ml8" /> : null
                  }
              
                  {/* {

                    rest.level.length === 1 ? null : rest.level.length === 3 
                      ? <IconTreeAdd size="14" onClick={() => addCombineItem()} className="ml8" /> 

                      : <IconTreeAdd size="14" onClick={() => addCombineCon()} className="ml8" />

                  } */}
                  {/* <IconDel size="14" className="ml8" onClick={() => delCon()} style={{right: '0px'}} /> */}
                  {
                    rest.len === 1 ? <IconDel size="14" className="ml8" onClick={() => delCon()} style={{right: '0px'}} /> : null
                  }
                  {
                    levelEnd === 0
                      ? null 
                      : <IconDel size="14" className="ml8" onClick={() => delCon()} style={{right: '0px'}} />
                  }
                  
                </div>
            
              </FormItem>
            )
          }

          {
            rest.page === 'detail'  
            && +ruleIfBoxKey.slice(-1) === 1 
            && ruleType === 'config' 
            && relId ? <a href onClick={open} className="ml8 fs12 mt8">查看筛选</a> : null
          }
         
          
        </Input.Group>
       
      </Form.Item>
        
    </div>
  )
}

export default RuleItem
