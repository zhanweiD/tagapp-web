/**
 * @description 可视化
 */
import React, {Component, useEffect} from 'react'
import {observer} from 'mobx-react'
import {action, observable, toJS} from 'mobx'
import {
  Button,
  Menu,
  Form,
  Select,
  Radio,
  message,
  Popconfirm,
  Spin,
  Tooltip,
} from 'antd'
import OnerFrame from '@dtwave/oner-frame'
import {Authority} from '../../../component'
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

const {Option} = Select
// const {confirm} = Modal

@observer
class Visual extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props
    store.searchId = params.id
  }

  outConfigRef = React.createRef()
  screenConfigRef = React.createRef()
  outNameMap = {}

  @observable menuCode = 'out'

  componentWillMount() {
    store.getObjList()
    store.getDetail(res => {
      const {outputCondition} = res
      if (outputCondition && outputCondition.length) {
        for (let i = 0; i < outputCondition.length; i++) {
          const ele = outputCondition[i]
          this.outNameMap[i] = ele.alias
        }
      }
    })
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

  // @action.bound selectObj(objId) {
  //   // store.objId = objId
  //   // store.getTagTree({id: objId})
  //   // store.getExpressionTag({id: objId})
  // }

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

  // @action.bound clearAll() {
  //   confirm({
  //     title: '确认清空?',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '确认清空数据查询？',
  //     onOk() {
  //       store.outConfig.clear()
  //       store.screenConfig.clear()
  //       store.showResult = false
  //       store.resultInfo = {}
  //     },
  //     onCancel() {
  //       console.log('Cancel')
  //     },
  //   })
  // }

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
      detail,
      detailLoading,
      handleExpend,
      onDraggableLogMouseDown,
    } = store

    return (
      <Spin spinning={detailLoading}>
        <div className="visual-detail">
          <div className="header-button">
            {/* <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button> */}
            <Authority
              authCode="tag_app:clear_visual_search[d]"
            >
              <Button className="mr8" onClick={this.save}>保存数据查询</Button>

            </Authority>
            <Authority
              authCode="tag_app:create_visual_api[c]"
            >
              <Button className="mr8" type="primary" onClick={this.createApi} disabled={!resultInfo.sql}>生成API</Button>

            </Authority>
          </div>
          <div className="FBH pt16 pb16">
            <div style={{lineHeight: '34px', paddingLeft: '8px'}}>源标签对象</div>
            <Select value={objId} style={{width: 180, marginLeft: '8px'}} disabled>
              {
                objList.map(d => <Option value={d.id}>{d.name}</Option>)
              }
            </Select>
          </div>
          <div className="FBH" style={{height: 'calc(100vh - 114px)'}}>
            <Tree store={store} />
            <div className="visual-content-warp">
              <div className="code-menu">
                <Authority
                  authCode="tag_app:run_visual_search[x]"
                >
                  {
                    resultLoading ? (
                      <Tooltip placement="topRight" title="正在查询中，不可重复查询">
                        <span className="disabled">
                          <img src={yunxing} alt="img" className="disabled" />
                          <span>查询</span>
                        </span>
                      </Tooltip>
                    ) : (
                      <span className="code-menu-item mr16" onClick={() => this.search()}>
                        <img src={yunxing} alt="img" />
                        <span>查询</span>
                      </span>
                    )
                  }
                </Authority>
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
                                    },
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
                                    info={toJS(d)}
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
                                      comparision: '=',
                                    },
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
                                      rightParams: undefined,
                                    },
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
                              <Form.Item name="whereType" initialValue={(detail.whereCondition && detail.whereCondition.whereType) || 'and'}>
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
                                    info={toJS(d)}
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
      </Spin>

    )
  }
}


export default props => {
  const ctx = OnerFrame.useFrame()
  const projectId = ctx.useProjectId()

  useEffect(() => {
    ctx.useProject(false)
  }, [])

  return (
    <Visual {...props} projectId={projectId} />
  )
}
