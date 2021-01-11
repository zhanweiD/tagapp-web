import intl from 'react-intl-universal'
/**
 * @description 可视化
 */
import React, { Component, useEffect } from 'react'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
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
import { Authority } from '../../../component'
import Tree from './tree'
import yunxing from '../../../icon/yunxing.svg'
import SearchResult from './search-result'
import ModalSave from './modal-save'
import DrewerApi from './modal-api'
import OutItem from './out-item'
import ScreenItem from './screen-item'
import { getOutConfig, getScreenConfig } from './util'
import { downloadResult } from '../../../common/util'
import store from './store'

const { Option } = Select
// const {confirm} = Modal

@observer
class Visual extends Component {
  constructor(props) {
    super(props)
    // store.projectId = props.projectId

    const {
      match: { params },
    } = props
    store.searchId = params.id

    store.projectId = params.projectId
  }

  outConfigRef = React.createRef()
  screenConfigRef = React.createRef()

  @observable menuCode = 'out'
  @observable resultKey = 0
  @observable outNameMap = {}

  componentWillMount() {
    store.getObjList()
    store.getDetail(res => {
      const { outputCondition } = res
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

    this.checkOutConfig(
      outConfig => {
        if (t.screenConfigRef.current) {
          t.checkScreenConfig(
            screenConfig => {
              store.saveParams.outputList = outConfig
              store.saveParams.where = screenConfig

              store.visibleSave = true
            },
            () => {
              message.error(
                intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.visual.j4u7pjq8nbb'
                  )
                  .d('筛选设置信息尚未完善！')
              )
            },
            'save'
          )
        } else {
          store.saveParams.outputList = outConfig
          store.visibleSave = true
        }
      },
      () => {
        message.error(
          intl
            .get(
              'ide.src.page-search.page-data-search.visual.visual.uf7dyomyhk'
            )
            .d('输出设置信息尚未完善！')
        )
      },
      'save'
    )
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
    const id = Math.floor(Math.random() * 10000)
    store.outConfig.push({
      id,
    })

    if (store.resultInfo.sql) {
      this.clearResult()
    }
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
      const id = Math.floor(Math.random() * 10000)
      store.outConfig.splice(index + 1, 0, { id })
    })

    if (store.resultInfo.sql) {
      this.clearResult()
    }
  }

  @action.bound delOutConfig(index, id) {
    store.outConfig.splice(index, 1)
    delete this.outNameMap[id]

    if (store.resultInfo.sql) {
      this.clearResult()
    }
  }

  @action.bound addFirstScreenConfig() {
    const id = Math.floor(Math.random() * 10000)
    store.screenConfig.push({
      id,
    })

    if (store.resultInfo.sql) {
      this.clearResult()
    }
  }

  @action.bound delAllScreenConfig() {
    store.screenConfig.clear()
    store.showResult = false
    store.resultInfo = {}
  }

  @action.bound addScreenConfig(index) {
    const t = this
    this.checkScreenConfig(() => {
      const id = Math.floor(Math.random() * 10000)
      store.screenConfig.splice(index + 1, 0, { id })
    })

    if (store.resultInfo.sql) {
      this.clearResult()
    }
  }

  @action.bound delScreenConfig(index) {
    store.screenConfig.splice(index, 1)

    if (store.resultInfo.sql) {
      this.clearResult()
    }
  }

  @action.bound search() {
    const t = this

    this.checkOutConfig(
      outConfig => {
        if (t.screenConfigRef.current) {
          t.checkScreenConfig(
            screenConfig => {
              const params = {
                outputList: outConfig,
                where: screenConfig,
              }

              // store.showResult = true
              store.resultInfo = {}
              store.saveParams = {}
              store.runSearch(params)

              t.resultKey = Math.floor(Math.random() * 10000)
            },
            () => {
              message.error(
                intl
                  .get(
                    'ide.src.page-search.page-data-search.visual.visual.j4u7pjq8nbb'
                  )
                  .d('筛选设置信息尚未完善！')
              )
            },
            'search'
          )
        } else {
          const params = {
            outputList: outConfig,
          }

          // store.showResult = true
          store.resultInfo = {}
          store.saveParams = {}
          store.runSearch(params)
        }
      },
      () => {
        message.error(
          intl
            .get(
              'ide.src.page-search.page-data-search.visual.visual.uf7dyomyhk'
            )
            .d('输出设置信息尚未完善！')
        )
      },
      'search'
    )
  }

  @action.bound checkOutConfig(successCb, errorCb, type) {
    if (this.outConfigRef.current) {
      this.outConfigRef.current
        .validateFields()
        .then(values => {
          if (type) {
            successCb(getOutConfig(values, toJS(store.outConfig)))
          } else {
            successCb()
          }
        })
        .catch(info => {
          if (errorCb) {
            errorCb()
          }
        })
    } else {
      message.error(
        intl
          .get('ide.src.page-search.page-data-search.visual.visual.c9b60thajjp')
          .d('输出设置信息尚未填写！')
      )
    }
  }

  @action.bound checkScreenConfig(successCb, errorCb, type) {
    if (this.screenConfigRef.current) {
      this.screenConfigRef.current
        .validateFields()
        .then(values => {
          if (type) {
            successCb(getScreenConfig(values))
          } else {
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

  @action.bound outNameChange = (value, id) => {
    this.outNameMap[id] = value
  }

  @action.bound outNameBlur = (value, id) => {
    this.outConfigRef.current.validateFields()
  }
  downloadResult = () => {
    downloadResult({
      projectId: store.projectId,
      objId: store.objId,
      runType: 1,
      ...toJS(store.saveParams),
    })
  }

  @action.bound clearResult() {
    store.resultInfo = {}
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
        <div className="visual-detail" style={{ height: 'calc(100vh - 48px)' }}>
          <div className="header-button">
            {/* <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button> */}
            <Authority authCode="tag_app:clear_visual_search[d]">
              <Button className="mr8" onClick={this.save}>
                {intl
                  .get(
                    'ide.src.page-search.page-data-search.tql.modal-save.6nv9c6pianp'
                  )
                  .d('保存数据查询')}
              </Button>
            </Authority>
            <Authority authCode="tag_app:create_visual_api[c]">
              <Button
                className="mr8"
                type="primary"
                onClick={this.createApi}
                disabled={!resultInfo.sql}
              >
                {intl
                  .get(
                    'ide.src.page-search.page-data-search.tql.tql.a8guqmo8wg5'
                  )
                  .d('生成API')}
              </Button>
            </Authority>
          </div>
          <div className="FBH pt16 pb16">
            <div style={{ lineHeight: '24px', paddingLeft: '8px' }}>
              {intl
                .get(
                  'ide.src.page-search.page-data-search.visual.visual.rlzuv6ouzgh'
                )
                .d('源标签对象')}
            </div>
            <Select
              value={objId}
              style={{ minWidth: 180, marginLeft: '8px' }}
              disabled
            >
              {objList.map(d => (
                <Option value={d.id}>{d.name}</Option>
              ))}
            </Select>
          </div>
          <div className="FBH" style={{ height: 'calc(100vh - 104px)' }}>
            <Tree store={store} />
            <div className="visual-content-warp">
              <div className="code-menu">
                <Authority authCode="tag_app:run_visual_search[x]">
                  {resultLoading ? (
                    <Tooltip
                      placement="topRight"
                      title={intl
                        .get(
                          'ide.src.page-search.page-data-search.tql.tql-code.ebbpsevqpu6'
                        )
                        .d('正在查询中，不可重复查询')}
                    >
                      <span className="mr16 disabled">
                        {/* <img src={yunxing} alt="img" className="disabled" /> */}
                        <i
                          className="iconfont dtwave icon-run"
                          style={{ fontSize: '14px' }}
                        />
                        <span className="ml4">
                          {intl
                            .get(
                              'ide.src.component.list-content.search.rk9cxers0fj'
                            )
                            .d('查询')}
                        </span>
                      </span>
                    </Tooltip>
                  ) : (
                    <span
                      className="code-menu-item mr16"
                      onClick={() => this.search()}
                    >
                      {/* <img src={yunxing} alt="img" /> */}
                      <i className="iconfont dtwave icon-run" />
                      <span className="ml4">
                        {intl
                          .get(
                            'ide.src.component.list-content.search.rk9cxers0fj'
                          )
                          .d('查询')}
                      </span>
                    </span>
                  )}
                </Authority>
              </div>
              <div className="visual-content" id="visual-content">
                <SearchResult
                  loading={resultLoading}
                  expend={showResult}
                  resultInfo={toJS(resultInfo)}
                  handleExpend={handleExpend}
                  onDraggableLogMouseDown={onDraggableLogMouseDown}
                  downloadResult={this.downloadResult}
                  resultKey={this.resultKey}
                />

                <Menu
                  onClick={this.menuClick}
                  selectedKeys={this.menuCode}
                  mode="inline"
                  className="visual-content-menu"
                >
                  <Menu.Item key="out">
                    {intl
                      .get(
                        'ide.src.page-search.page-data-search.visual.visual.x149fc7rvl'
                      )
                      .d('输出设置')}
                  </Menu.Item>
                  <Menu.Item key="screen">
                    {intl
                      .get(
                        'ide.src.page-search.page-data-search.visual.visual.kl0oyns6hv'
                      )
                      .d('筛选设置')}
                  </Menu.Item>
                </Menu>
                <Spin spinning={resultLoading}>
                  <div className="visual-config" id="visual-config">
                    {/* 渲染输出设置 */}
                    <div
                      style={{
                        display: this.menuCode === 'out' ? 'block' : 'none',
                      }}
                    >
                      <div>
                        {outConfig.length ? (
                          <Popconfirm
                            placement="bottomLeft"
                            title={intl
                              .get(
                                'ide.src.page-search.page-data-search.visual.visual.w4bq5n2fuxf'
                              )
                              .d('确认清除输出设置？')}
                            onConfirm={this.delAllOutConfig}
                            okText={intl
                              .get(
                                'ide.src.page-search.page-data-search.visual.out-item.w2kizfzidk'
                              )
                              .d('确实')}
                            cancelText={intl
                              .get(
                                'ide.src.page-config.group-config.configModal.y7eepkatpi'
                              )
                              .d('取消')}
                          >
                            <Button type="primary" className="mb16">
                              {intl
                                .get(
                                  'ide.src.page-search.page-data-search.visual.visual.nf50z9eu277'
                                )
                                .d('清除输出设置')}
                            </Button>
                          </Popconfirm>
                        ) : null}

                        <Form
                          name="out"
                          ref={this.outConfigRef}
                          onValuesChange={(changedValues, allValues) => {
                            if (resultInfo.sql) {
                              this.clearResult()
                            }
                            const [key] = Object.keys(changedValues)

                            if (
                              changedValues[key].function &&
                              allValues[key].params1
                            ) {
                              this.outConfigRef.current.setFieldsValue({
                                [key]: {
                                  ...changedValues[key],
                                  params1: undefined,
                                },
                              })
                            }

                            if (
                              changedValues[key].function &&
                              allValues[key].params
                            ) {
                              this.outConfigRef.current.setFieldsValue({
                                [key]: {
                                  ...changedValues[key],
                                  params: undefined,
                                },
                              })
                            }
                          }}
                        >
                          {outConfig.map((d, i) => (
                            <OutItem
                              key={d.id}
                              id={d.id}
                              index={i}
                              setAlias={this.outConfigRef.current}
                              expressionTag={toJS(expressionTag)}
                              delOutConfig={this.delOutConfig}
                              addOutConfig={this.addOutConfig}
                              info={toJS(d)}
                              outNameMap={toJS(this.outNameMap)}
                              outNameBlur={this.outNameBlur}
                              outNameChange={this.outNameChange}
                            />
                          ))}
                        </Form>
                      </div>
                      {!outConfig.length ? (
                        <Button type="primary" onClick={this.addFirstOutConfig}>
                          {intl
                            .get(
                              'ide.src.page-search.page-data-search.visual.visual.d7n3anwvlwg'
                            )
                            .d('新增')}
                        </Button>
                      ) : null}
                    </div>
                    {/* 渲染筛选设置 */}
                    <div
                      style={{
                        display: this.menuCode === 'screen' ? 'block' : 'none',
                      }}
                    >
                      {screenConfig.length ? (
                        <div>
                          <div>
                            <Popconfirm
                              placement="bottomLeft"
                              title={intl
                                .get(
                                  'ide.src.page-search.page-data-search.visual.visual.yr744chg5h'
                                )
                                .d('确认清除筛选设置？')}
                              onConfirm={this.delAllScreenConfig}
                              okText={intl
                                .get(
                                  'ide.src.page-search.page-data-search.visual.out-item.w2kizfzidk'
                                )
                                .d('确实')}
                              cancelText={intl
                                .get(
                                  'ide.src.page-config.group-config.configModal.y7eepkatpi'
                                )
                                .d('取消')}
                            >
                              <Button type="primary" className="mb16">
                                {intl
                                  .get(
                                    'ide.src.page-search.page-data-search.visual.visual.oig4pt5cca'
                                  )
                                  .d('清除筛选设置')}
                              </Button>
                            </Popconfirm>
                          </div>
                          <Form
                            name="srceen"
                            ref={this.screenConfigRef}
                            onValuesChange={(changedValues, allValues) => {
                              if (resultInfo.sql) {
                                this.clearResult()
                              }

                              const [key] = Object.keys(changedValues)

                              if (
                                changedValues[key].leftParams &&
                                allValues[key].leftParams
                              ) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    comparision: '=',
                                  },
                                })
                              }

                              if (
                                changedValues[key].leftFunction &&
                                allValues[key].leftParams
                              ) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    leftParams: undefined,
                                  },
                                })
                              }

                              // if (changedValues[key].leftFunction && allValues[key].rightParams) {
                              //   this.screenConfigRef.current.setFieldsValue({
                              //     [key]: {
                              //       ...changedValues[key],
                              //       rightParams: undefined,
                              //     },
                              //   })
                              // }

                              if (
                                changedValues[key].leftFunction &&
                                allValues[key].rightFunction
                              ) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    rightFunction: intl
                                      .get(
                                        'ide.src.page-group.component.fixedValue.gzi5ubzdaov'
                                      )
                                      .d('固定值'),
                                    rightParams1: undefined,
                                    rightParams: null,
                                  },
                                })
                              }

                              if (changedValues[key].rightFunction) {
                                this.screenConfigRef.current.setFieldsValue({
                                  [key]: {
                                    ...changedValues[key],
                                    rightParams1: undefined,
                                    rightParams: null,
                                  },
                                })
                              }
                            }}
                          >
                            <Form.Item
                              name="whereType"
                              initialValue={
                                (detail.whereCondition &&
                                  detail.whereCondition.whereType) ||
                                'and'
                              }
                            >
                              <Radio.Group>
                                <Radio value="and">
                                  {intl
                                    .get(
                                      'ide.src.page-search.page-data-search.visual.visual.debln1t89yw'
                                    )
                                    .d('符合全部以下条件')}
                                </Radio>
                                <Radio value="or">
                                  {intl
                                    .get(
                                      'ide.src.page-search.page-data-search.visual.visual.9uvz5blxmkr'
                                    )
                                    .d('符合任意以下条件')}
                                </Radio>
                              </Radio.Group>
                            </Form.Item>

                            {screenConfig.map((d, i) => (
                              <ScreenItem
                                key={d.id}
                                id={d.id}
                                index={i}
                                expressionTag={toJS(expressionTag)}
                                delScreenConfig={this.delScreenConfig}
                                addScreenConfig={this.addScreenConfig}
                                info={toJS(d)}
                              />
                            ))}
                          </Form>
                        </div>
                      ) : (
                        <Button
                          type="primary"
                          onClick={this.addFirstScreenConfig}
                        >
                          {intl
                            .get(
                              'ide.src.page-search.page-data-search.visual.visual.d7n3anwvlwg'
                            )
                            .d('新增')}
                        </Button>
                      )}
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

  useEffect(() => {
    ctx.useProject(true, null, { visible: false })
  }, [])

  return <Visual {...props} />
}
