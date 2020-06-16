/**
 * @description 可视化
 */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action, observable, toJS} from 'mobx'
import {
  Button,
  Tabs,
  Menu,
  Alert,
  Form,
  Input,
  Tooltip,
  Select,
  Radio,
  message,
} from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import {IconDel, IconTreeAdd} from '../../../icon-comp'
import Tree from './tree'
import yunxing from '../../../icon/yunxing.svg'
import geshihua from '../../../icon/geshihua.svg'
import SearchResult from './search-result'
import ModalSave from './modal-save'
import DrewerApi from './modal-api'
import {outValueLogic, screenValueLogic, comparison} from './util'

import store from './store'
import './visual.styl'

const {Option} = Select

@observer
export default class Visual extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
  }

  outConfigRef = React.createRef()
  screenConfigRef = React.createRef()

  @observable menuCode = 'out'
  // @observable showOutErrorMessage = false
  // @observable showScreenErrorMessage = false

  componentWillMount() {
    store.getObjList()
  }

  @action.bound selectObj(e) {
    store.objId = e
  }

  @action.bound save() {
    store.visibleSave = true
  }

  @action.bound createApi() {
    store.visibleApi = true
  }

  @action.bound menuClick(e) {
    console.log(e)
    this.menuCode = e.key
  }

  @action.bound addFirstOutConfig() {
    const id = Math.floor(Math.random() * 1000)
    store.outConfig.push({
      id,
    })
    // this.showOutErrorMessage = true
  }

  @action.bound delAllOutConfig() {
    store.outConfig.clear()
  }

  @action.bound addOutConfig(index) {
    const t = this

    this.checkOutConfig(() => {
      const id = Math.floor(Math.random() * 1000)
      store.outConfig.splice(index + 1, 0, {id})
      // t.showOutErrorMessage = true
    })
  }

  @action.bound delOutConfig(index) {
    store.outConfig.splice(index, 1)
  }

  @action.bound addFirstScreenConfig() {
    const id = Math.floor(Math.random() * 1000)
    store.screenConfig.push({
      id,
    })
    // this.showScreenErrorMessage = true
  }

  @action.bound delAllScreenConfig() {
    store.screenConfig.clear()
  }

  @action.bound addScreenConfig(index) {
    this.checkScreenConfig(() => {
      const id = Math.floor(Math.random() * 1000)
      store.screenConfig.splice(index + 1, 0, {id})
      // this.showScreenErrorMessage = true
    })
  }

  @action.bound delScreenConfig(index) {
    store.screenConfig.splice(index, 1)
  }

  @action.bound search() {
    const t = this
    this.checkOutConfig(() => {
      t.checkScreenConfig(() => {
        console.log('chenggong')
      }, () => {
        message.error('输出配置信息尚未完善！')
      }) 
    }, () => {
      message.error('筛选配置信息尚未完善！')
    }) 
  }

  @action.bound checkOutConfig(successCb, errorCb) {
    if (this.outConfigRef.current) {
      this.outConfigRef.current
        .validateFields()
        .then(values => {
          console.log(values)
          if (successCb) {
            successCb()
          }
        })
        .catch(info => {
          if (errorCb) {
            errorCb()
          }
        })
    }
  }

  @action.bound checkScreenConfig(successCb, errorCb) {
    if (this.screenConfigRef.current) {
      this.screenConfigRef.current
        .validateFields()
        .then(values => {
          console.log(values)
          if (successCb) {
            successCb()
          }
        })
        .catch(info => {
          if (errorCb) {
            errorCb()
          }
        })
    }
  }

  render() {
    const {outConfig, screenConfig, objList, objId, tagTreeData} = store
    console.log(objId)
    return (
      <div className="visual">
        <div className="header-button">
          <Button className="mr8">清空数据查询</Button>
          <Button className="mr8" onClick={this.save}>保存数据查询</Button>
          <Button className="mr8" type="primary" onClick={this.createApi}>生成API</Button>
        </div>
        <div className="FBH pt16 pb16">
          <div style={{lineHeight: '34px', paddingLeft: '8px'}}>源标签对象</div>
          <Select value={objId} style={{width: 180, marginLeft: '8px'}} onChange={this.selectObj}>
            {
              objList.map(d => <Option value={d.id}>{d.name}</Option>)
            }
          </Select>
        </div>
        <div className="FBH" style={{height: 'calc(100% - 66px)'}}>
          <Tree tagTreeData={toJS(tagTreeData)} />
          <div className="visual-content-warp">
            <div className="code-menu">
              <span className="code-menu-item mr16" onClick={() => this.search()}>
                <img src={yunxing} alt="img" />
                <span>查询</span>
              </span>
            </div>
            <div className="visual-content">
              <Menu onClick={this.menuClick} selectedKeys={this.menuCode} mode="inline" className="visual-content-menu">
                <Menu.Item key="out">
                  输出设置
                </Menu.Item>
                <Menu.Item key="screen">
                  筛选设置
                </Menu.Item>
              </Menu>
              <div className="visual-config">
                <SearchResult />
                {/* 渲染输出设置 */}
                {/* <Form.Provider onFormChange={this.onFormChange}> */}
                <div style={{display: this.menuCode === 'out' ? 'block' : 'none'}}>
                  {
                    outConfig.length ? (
                      <div>
                        {/* {
                          this.showOutErrorMessage ? <Alert message="请完善输出设置" type="error" showIcon style={{width: '60%', marginBottom: '16px'}} /> : null
                        } */}
                        <Button type="primary" onClick={this.delAllOutConfig} className="mb16">清除输出设置</Button>
                        <Form name="out" ref={this.outConfigRef}>
                          {
                            outConfig.map((d, i) => (
                              <Form.Item key={d.id}>
                                <Input.Group compact>
                                  <Form.Item
                                    name={[d.id, 'province']}
                                    noStyle
                                    rules={[{required: true, message: '请选择取值逻辑'}]}
                                  >
                                    <Select placeholder="请选择取值逻辑" style={{width: '200px'}}>
                                      {
                                        outValueLogic.map(({name, value}) => <Option value={value}>{name}</Option>)
                                      }
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street']}
                                    noStyle
                                    rules={[{required: true, message: '请选择标签'}]}
                                  >
                                    <Select placeholder="请选择标签" style={{width: '200px'}}>
                                      <Option value="Zhejiang">Zhejiang</Option>
                                      <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>

                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street1']}
                                    noStyle
                                    rules={[{required: true, message: '请输入显示名称'}]}
                                  >
                                    <Input style={{width: '30%', marginLeft: '16px'}} placeholder="请输入显示名称" />
                                  </Form.Item>
                                  <Form.Item>
                                    <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
                                      <IconDel size="14" onClick={() => this.delOutConfig(i)} className="ml8 mr4" />
                                      <IconTreeAdd size="14" onClick={() => this.addOutConfig(i)} />
                                    </div>
                                  </Form.Item>
                                </Input.Group>
                              </Form.Item>
                            ))
                          }
                     
                        </Form>
                      </div>
                    )
                      : <Button type="primary" onClick={this.addFirstOutConfig}>新增</Button>
                  }
                </div>
                {/* 渲染筛选设置 */}
                <div style={{display: this.menuCode === 'screen' ? 'block' : 'none'}}>
                  {
                    screenConfig.length ? (
                      <div>
                        {/* {
                          this.showScreenErrorMessage ? <Alert message="请完善筛选设置" type="error" showIcon /> : null
                        } */}
                        <div>
                          <Button type="primary" onClick={this.delAllScreenConfig} className="mb16 mr16">清除筛选设置</Button>
                          <Radio.Group onChange={this.onChange} value={1}>
                            <Radio value={1}>符合全部以下条件</Radio>
                            <Radio value={2}>符合任何以下条件</Radio>
                          </Radio.Group>
                        </div>
                        <Form name="srceen" onFinish={() => { }} ref={this.screenConfigRef}>
                          <Form.Item>
                            {
                              screenConfig.map((d, i) => (
                                <Input.Group compact key={d.id}>
                                  <Form.Item
                                    name={[d.id, 'province']}
                                    noStyle
                                    rules={[{required: true, message: '请选择'}]}
                                  >
                                    <Select placeholder="请选择" style={{width: '150px'}}>
                                      <Option value="Zhejiang">Zhejiang</Option>
                                      <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street']}
                                    noStyle
                                    rules={[{required: true, message: '请选择标签'}]}
                                  >
                                    <Select placeholder="请选择" style={{width: '200px'}}>
                                      <Option value="Zhejiang">Zhejiang</Option>
                                      <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>

                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street1']}
                                    noStyle
                                    rules={[{required: true, message: '请选择'}]}
                                  >
                                    <Select placeholder="请选择" style={{width: '100px'}}>
                                      {
                                        comparison.map(({name, value}) => <Option value={value}>{name}</Option>)
                                      }                               
                                    </Select>

                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street2']}
                                    noStyle
                                    rules={[{required: true, message: '请选择'}]}
                                  >
                                    <Select placeholder="请选择" style={{width: '100px'}}>
                                      {
                                        screenValueLogic.map(({name, value}) => <Option value={value}>{name}</Option>)
                                      } 
                                    </Select>

                                  </Form.Item>
                                  <Form.Item
                                    name={[d.id, 'street3']}
                                    noStyle
                                    rules={[{required: true, message: '请输入'}]}
                                  >
                                    <Input style={{width: '20%'}} placeholder="请输入" />
                                  </Form.Item>
                                  <Form.Item>
                                    <div style={{color: 'rgba(0,0,0, 45%)', display: 'flex'}}>
                                      <IconDel size="14" onClick={() => this.delScreenConfig(i)} className="ml8 mr4" />
                                      <IconTreeAdd size="14" onClick={() => this.addScreenConfig(i)} />
                                    </div>

                                  </Form.Item>
                                </Input.Group>
                              ))
                            }
                          </Form.Item>
                        </Form>
                      </div>
                    )
                      : <Button type="primary" onClick={this.addFirstScreenConfig}>新增</Button>
                  }
                </div>
                {/* </Form.Provider> */}
              </div>
            </div>
          </div>
        </div>

        <ModalSave store={store} />
        <DrewerApi store={store} />
      </div>
    )
  }
}
