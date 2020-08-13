/**
 * @description 可视化
 */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action, observable, toJS} from 'mobx'
import {
  Button,
  Menu,
  Form,
  // Input,
  Select,
  Radio,
  message,
  Popconfirm,
  Modal,
  Spin,
  Tooltip
} from 'antd'
import {ExclamationCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import Tree from './tree'
import yunxing from '../../../icon/yunxing.svg'
import SearchResult from './search-result'
import ModalSave from './modal-save'
import DrewerApi from './modal-api'
import OutItem from './out-item'
import ScreenItem from './screen-item'
import {
  getOutConfig, 
  getScreenConfig,
} from './util'

import store from './store'
import './visual.styl'

const {Option} = Select
const {confirm} = Modal

@observer
export default class Visual extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
  }

  outConfigRef = React.createRef()
  screenConfigRef = React.createRef()
  outNameMap = {}

  @observable menuCode = 'out'

  componentWillMount() {
    store.getObjList()
  }

  componentDidMount() {
    store.getHeight()
  }

  componentWillUnmount() {
    store.outConfig.clear()
    store.screenConfig.clear()
    store.showResult = false
    store.resultInfo = {}
    store.resultLoading = false
  }

  @action.bound selectObj(objId) {
    const t = this
    confirm({
      title: '确认切换源标签对象?',
      icon: <ExclamationCircleOutlined />,
      content: '切换源标签对象会导致数据查询配置信息清空',
      onOk() {
        // 清空
        store.outConfig.clear()
        store.screenConfig.clear()
        store.showResult = false
        store.resultInfo = {}
        t.outNameMap = {}

        // 切换
        store.objId = objId
        store.getTagTree({id: objId})
        store.getExpressionTag({id: objId})
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  // @action.bound refreshTree(searchKey) {
  //   store.searchTree({id: store.objId, searchKey})
  // }

  @action.bound save() {
    const t = this

    this.checkOutConfig(outConfig => {
      if (t.screenConfigRef.current) {
        t.checkScreenConfig(screenConfig => {
          store.saveParams.outputList = outConfig
          store.saveParams.where = screenConfig

          store.visibleSave = true
        }, () => {
          message.error('筛选设置信息尚未完善！')
        }) 
      } else {
        store.saveParams.outputList = outConfig
        store.visibleSave = true
      }
    }, () => {
      message.error('输出设置信息尚未完善！')
    })
  }

  @action.bound createApi() {
    store.getApiGroup()
    store.getApiParams()
    store.visibleApi = true
  }

  @action.bound clearAll() {
    const t = this
    confirm({
      title: '确认清空?',
      icon: <ExclamationCircleOutlined />,
      content: '确认清空数据查询？',
      onOk() {
        store.outConfig.clear()
        store.screenConfig.clear()
        store.showResult = false
        store.resultInfo = {}
        store.saveParams = {}
        t.outNameMap = {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  @action.bound menuClick(e) {
    this.menuCode = e.key
  }

  @action.bound addFirstOutConfig() {
    const id = Math.floor(Math.random() * 1000)
    store.outConfig.push({
      id,
    })
  }

  @action.bound delAllOutConfig() {
    store.outConfig.clear()
    store.showResult = false
    store.resultInfo = {}
    this.outNameMap = {}
  }

  @action.bound addOutConfig(index) {
    const t = this

    this.checkOutConfig(() => {
      const id = Math.floor(Math.random() * 1000)
      store.outConfig.splice(index + 1, 0, {id})
    })
  }

  @action.bound delOutConfig(index, id) {
    store.outConfig.splice(index, 1)
    delete this.outNameMap[id]
  }

  @action.bound addFirstScreenConfig() {
    const id = Math.floor(Math.random() * 1000)
    store.screenConfig.push({
      id,
    })
  }

  @action.bound delAllScreenConfig() {
    store.screenConfig.clear()
    store.showResult = false
    store.resultInfo = {}
  }

  @action.bound addScreenConfig(index) {
    const t = this
    this.checkScreenConfig(() => {
      const id = Math.floor(Math.random() * 1000)
      store.screenConfig.splice(index + 1, 0, {id})
    })
  }

  @action.bound delScreenConfig(index) {
    store.screenConfig.splice(index, 1)
  }

  @action.bound search() {
    const t = this

    this.checkOutConfig(outConfig => {
      if (t.screenConfigRef.current) {
        t.checkScreenConfig(screenConfig => {
          const params = {
            outputList: outConfig,
            where: screenConfig,
          }
          // store.showResult = true
          store.resultInfo = {}
          store.saveParams = {}
          store.runSearch(params)
        }, () => {
          message.error('筛选设置信息尚未完善！')
        }) 
      } else {
        const params = {
          outputList: outConfig,
        }
        // store.showResult = true
        store.resultInfo = {}
        store.saveParams = {}
        store.runSearch(params)
      }
    }, () => {
      message.error('输出设置信息尚未完善！')
    }) 
  }

  @action.bound checkOutConfig(successCb, errorCb) {
    if (this.outConfigRef.current) {
      this.outConfigRef.current
        .validateFields()
        .then(values => {
          successCb(getOutConfig(values))
        })
        .catch(info => {
          if (errorCb) {
            errorCb()
          }
        })
    } else {
      message.error('输出设置信息尚未填写！')
    }
  }

  @action.bound checkScreenConfig(successCb, errorCb) {
    if (this.screenConfigRef.current) {
      this.screenConfigRef.current
        .validateFields()
        .then(values => {
          successCb(getScreenConfig(values))
        })
        .catch(info => {
          if (errorCb) {
            errorCb()
          }
        })
    }
  }

  onSelectTag = () => {
    console.log(this.outConfigRef.current.getFieldsValue())
  }

  outNameBlur = (value, id) => {
    this.outNameMap[id] = value
  }

  render() {
    const {
      outConfig, 
      screenConfig, 
      objList, 
      objId,
      // treeLoading, 
      // tagTreeData, 
      expressionTag, 
      showResult, 
      resultInfo,
      resultLoading,
      handleExpend,
      onDraggableLogMouseDown,
    } = store

    return (
      <div className="visual">
        <div className="header-button">
          <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button>
          <Button className="mr8" onClick={this.save}>保存数据查询</Button>
          <Button className="mr8" type="primary" onClick={this.createApi} disabled={!resultInfo.sql}>生成API</Button>
          {/* <Button className="mr8" type="primary" onClick={this.createApi}>生成API</Button> */}
        </div>
        <div className="FBH pt16 pb16">
          <div style={{lineHeight: '34px', paddingLeft: '8px'}}>源标签对象</div>
          <Select value={objId} style={{width: 180, marginLeft: '8px', paddingTop: '5px'}} onChange={this.selectObj} showSearch optionFilterProp="children">
            {
              objList.map(d => <Option value={d.id}>{d.name}</Option>)
            }
          </Select>
        </div>
        <div className="FBH" style={{height: 'calc(100% - 66px)'}}>
          <Tree store={store} />
          {/* <Tree tagTreeData={toJS(tagTreeData)} treeLoading={treeLoading} refreshTree={this.refreshTree} /> */}
          <div className="visual-content-warp">
            <div className="code-menu">
              {
                resultLoading ? (
                  <Tooltip placement="topRight" title="正在查询中，不可重复查询">
                    <span className="mr16 disabled">
                      {/* <img src={yunxing} alt="img" className="disabled"/> */}
                      <i className="iconfont dtwave icon-run" style={{fontSize: '14px'}}/>
                      <span className="ml4">查询</span>
                    </span>
                  </Tooltip>
                 
                ) : (
                  <span className="code-menu-item mr16" onClick={() => this.search()}>
                    {/* <img src={yunxing} alt="img" /> */}
                    <i className="iconfont dtwave icon-run" />
                    <span className="ml4">查询</span>
                  </span>
                )
              }
              <a target="_blank" rel="noopener noreferrer" href={`${window.__keeper.pathHrefPrefix}/search/explain`} style={{marginLeft: '-8px'}}><QuestionCircleOutlined /></a> 
            </div>
            <div className="visual-content" id="visual-content">
              <SearchResult 
                loading={resultLoading} 
                expend={showResult}
                resultInfo={toJS(resultInfo)} 
                handleExpend={handleExpend}
                onDraggableLogMouseDown={onDraggableLogMouseDown}
              />
              <Menu onClick={this.menuClick} selectedKeys={this.menuCode} mode="inline" className="visual-content-menu">
                <Menu.Item key="out">
                  输出设置
                </Menu.Item>
                <Menu.Item key="screen">
                  筛选设置
                </Menu.Item>
              </Menu>
              <Spin spinning={resultLoading}>
                <div className="visual-config" id="visual-config">         
                  {/* 渲染输出设置 */}
                  <div style={{display: this.menuCode === 'out' ? 'block' : 'none'}}>
                    {
                      outConfig.length ? (
                        <div>
                          <Popconfirm
                            placement="bottomLeft"
                            title="确认清除输出设置？"
                            onConfirm={this.delAllOutConfig}
                            okText="确实"
                            cancelText="取消"
                          >
                            <Button type="primary" className="mb16">清除输出设置</Button>
                          </Popconfirm>
                          <Form 
                            name="out" 
                            ref={this.outConfigRef}
                            onValuesChange={(changedValues, allValues) => {
                              const [key] = Object.keys(changedValues)

                              if (changedValues[key].function && allValues[key].params1) {
                                this.outConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    params1: undefined,
                                  }
                                })
                              }

                              if (changedValues[key].function && allValues[key].params) {
                                this.outConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    params: undefined,
                                  },
                                })
                              }
                            }}
                          >
                            {
                              outConfig.map((d, i) => (
                                <OutItem 
                                  id={d.id}
                                  index={i}
                                  expressionTag={toJS(expressionTag)}
                                  delOutConfig={this.delOutConfig}
                                  addOutConfig={this.addOutConfig}
                                  outNameMap={this.outNameMap}
                                  outNameBlur={this.outNameBlur}
                                />
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
                          <div>
                            <Popconfirm
                              placement="bottomLeft"
                              title="确认清除筛选设置？"
                              onConfirm={this.delAllScreenConfig}
                              okText="确实"
                              cancelText="取消"
                            >
                              <Button type="primary" className="mb16">清除筛选设置</Button>
                            </Popconfirm>
                          </div>
                          <Form 
                            name="srceen" 
                            ref={this.screenConfigRef}
                            onValuesChange={(changedValues, allValues) => {
                              const [key] = Object.keys(changedValues)
      
                              if (changedValues[key].leftParams && allValues[key].leftParams) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    comparision: "="
                                  }
                                })
                              }

                              if (changedValues[key].leftFunction && allValues[key].leftParams) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    leftParams: undefined,
                                  },
                                })
                              }

                              if (changedValues[key].leftFunction && allValues[key].rightParams) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    rightParams: undefined
                                  }
                                })
                              }
  
                              if (changedValues[key].rightFunction && allValues[key].rightParams) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    rightParams: undefined,
                                  },
                                })
                              }
                            }}
                          >
                            <Form.Item name="whereType" initialValue="and">
                              <Radio.Group>
                                <Radio value="and">符合全部以下条件</Radio>
                                <Radio value="or">符合任何以下条件</Radio>
                              </Radio.Group>
                            </Form.Item>
                        
                            {
                              screenConfig.map((d, i) => (
                                <ScreenItem 
                                  id={d.id}
                                  index={i}
                                  expressionTag={toJS(expressionTag)}
                                  delScreenConfig={this.delScreenConfig}
                                  addScreenConfig={this.addScreenConfig}
                                />
                              ))
                            }
                      
                          </Form>
                        </div>
                      )
                        : <Button type="primary" onClick={this.addFirstScreenConfig}>新增</Button>
                    }
                  </div>
                </div>
              </Spin>
            </div>
          </div>
        </div>

        <ModalSave store={store} />
        <DrewerApi store={store} />
      </div>
    )
  }
}
