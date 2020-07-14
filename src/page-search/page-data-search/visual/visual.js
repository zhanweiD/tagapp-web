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
} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
// import {IconDel, IconTreeAdd} from '../../../icon-comp'
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

  @observable menuCode = 'out'

  componentWillMount() {
    store.getObjList()
  }

  @action.bound selectObj(objId) {
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

  @action.bound refreshTree(searchKey) {
    store.searchTree({id: store.objId, searchKey})
  }

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
    store.getApiParams()
    store.visibleApi = true
  }

  @action.bound clearAll() {
    confirm({
      title: '确认清空?',
      icon: <ExclamationCircleOutlined />,
      content: '确认清空数据查询？',
      onOk() {
        store.outConfig.clear()
        store.screenConfig.clear()
        store.showResult = false
        store.resultInfo = {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
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
  }

  @action.bound delAllOutConfig() {
    store.outConfig.clear()
  }

  @action.bound addOutConfig(index) {
    const t = this

    this.checkOutConfig(() => {
      const id = Math.floor(Math.random() * 1000)
      store.outConfig.splice(index + 1, 0, {id})
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
  }

  @action.bound delAllScreenConfig() {
    store.screenConfig.clear()
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
          store.showResult = true
          store.runSearch(params)
        }, () => {
          message.error('筛选设置信息尚未完善！')
        }) 
      } else {
        const params = {
          outputList: outConfig,
        }
        store.showResult = true
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

  render() {
    const {
      outConfig, 
      screenConfig, 
      objList, 
      objId,
      treeLoading, 
      tagTreeData, 
      expressionTag, 
      showResult, 
      resultInfo,
      resultLoading,
    } = store

    return (
      <div className="visual">
        <div className="header-button">
          <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button>
          <Button className="mr8" onClick={this.save}>保存数据查询</Button>
          <Button className="mr8" type="primary" onClick={this.createApi}>生成API</Button>
        </div>
        <div className="FBH pt16 pb16">
          <div style={{lineHeight: '34px', paddingLeft: '8px'}}>源标签对象</div>
          <Select value={objId} style={{width: 180, marginLeft: '8px'}} onChange={this.selectObj} showSearch>
            {
              objList.map(d => <Option value={d.id}>{d.name}</Option>)
            }
          </Select>
        </div>
        <div className="FBH" style={{height: 'calc(100% - 66px)'}}>
          <Tree tagTreeData={toJS(tagTreeData)} treeLoading={treeLoading} refreshTree={this.refreshTree} />
          <div className="visual-content-warp">
            <div className="code-menu">
              {
                resultLoading ? (
                  <span className="code-menu-item mr16 disabled">
                    <img src={yunxing} alt="img" />
                    <span>查询</span>
                  </span>
                ) : (
                  <span className="code-menu-item mr16" onClick={() => this.search()}>
                    <img src={yunxing} alt="img" />
                    <span>查询</span>
                  </span>
                )
              }
             
            </div>
            <div className="visual-content">
              <SearchResult loading={resultLoading} expend={showResult} resultInfo={toJS(resultInfo)} />
              <Menu onClick={this.menuClick} selectedKeys={this.menuCode} mode="inline" className="visual-content-menu">
                <Menu.Item key="out">
                  输出设置
                </Menu.Item>
                <Menu.Item key="screen">
                  筛选设置
                </Menu.Item>
              </Menu>
              <Spin spinning={resultLoading}>
                <div className="visual-config">         
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

                              if (changedValues[key].function && allValues[key].params) {
                                this.outConfigRef.current.resetFields([key].params)
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
                              onConfirm={this.delAllOutConfig}
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

                              if (changedValues[key].leftFunction && allValues[key].leftParams) {
                                this.screenConfigRef.current.resetFields([key].leftParams)
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
