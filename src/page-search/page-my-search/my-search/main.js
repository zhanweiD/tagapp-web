import intl from 'react-intl-universal'
/**
 * @description 我的查询
 */
import { Component } from 'react'
import { observer } from 'mobx-react'
import { action, toJS } from 'mobx'
import { Button, Spin, Select, Input, Modal, Tooltip } from 'antd'
import { ExclamationCircleOutlined, CopyOutlined } from '@ant-design/icons'
import {
  Card,
  NoData,
  projectProvider,
  DtGrid,
  searchProvider,
  Authority,
} from '../../../component'
import { IconDel, IconEdit } from '../../../icon-comp'
import ModalEdit from './modal'

import store from './store'

const { Option } = Select
const { confirm } = Modal

@observer
class MySearch extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
  }

  runType
  name

  componentWillMount() {
    store.getsearchList()
  }

  @action.bound selectType(runType) {
    this.runType = runType
    store.getsearchList({
      runType,
      name: this.name,
    })
  }

  @action.bound searchName(e) {
    this.name = e.target.value
    store.getsearchList({
      name: e.target.value,
      runType: this.runType,
    })
  }

  @action.bound edit(data) {
    store.detail = data
    store.visibleEdit = true
  }

  @action.bound del(id) {
    const t = this
    confirm({
      title: intl
        .get('ide.src.page-scene.scene.main.hdgssb5e0af')
        .d('确认删除 ？'),
      icon: <ExclamationCircleOutlined />,
      content: intl
        .get('ide.src.page-search.page-my-search.my-search.main.h3q9q6j30w7')
        .d('数据查询被删除后不可恢复，确定删除？'),
      onOk: () => {
        store.del({ id }, () => {
          t.refresh()
        })
      },
      onCancel: () => {},
    })
  }

  @action.bound clone(id) {
    const t = this
    store.clone(id, () => {
      t.refresh()
    })
  }

  @action.bound refresh() {
    store.getsearchList({
      name: this.name,
      runType: this.runType,
    })
  }

  // 跳转到数据查询
  goDataSearch = () => {
    window.location.href = `${window.__keeper.pathHrefPrefix ||
      '/'}/search/data-search`
  }

  render() {
    const { cardList, loading } = store
    const noDataConfig = {
      text: intl
        .get('ide.src.page-search.page-my-search.my-search.main.txi8hswo0te')
        .d('暂无查询数据'),
      onClick: this.goDataSearch,
      btnText: intl
        .get('ide.src.page-search.page-my-search.my-search.main.22eqakys7cp')
        .d('去数据查询创建'),
      isLoading: loading,
      code: 'tag_app:clear_visual_search[d]',
      noAuthText: intl
        .get('ide.src.page-search.page-my-search.my-search.main.txi8hswo0te')
        .d('暂无查询数据'),
    }

    return (
      <div>
        <div className="content-header">
          {intl
            .get(
              'ide.src.page-search.page-my-search.my-search.main.g3fpyvj22tm'
            )
            .d('我的查询')}
        </div>
        <div className="my-search">
          <Spin spinning={loading}>
            <div className="my-search-header">
              <Authority authCode="tag_app:tql_search[r]">
                <span className="mr8">
                  {intl
                    .get(
                      'ide.src.page-search.page-my-search.my-search.main.uyr5ajn5hhq'
                    )
                    .d('查询类型')}
                </span>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder={intl
                    .get(
                      'ide.src.page-search.page-my-search.my-search.main.3l7v84ui0ep'
                    )
                    .d('选择查询类型')}
                  optionFilterProp="children"
                  onChange={this.selectType}
                  className="mr24"
                  defaultValue=""
                >
                  <Option value="">
                    {intl
                      .get('ide.src.component.comp.search.r6a65smbvr')
                      .d('全部')}
                  </Option>
                  <Option value="1">
                    {intl
                      .get(
                        'ide.src.page-search.page-data-search.main.ecgtimi6ci'
                      )
                      .d('可视化方式')}
                  </Option>
                  <Option value="2">
                    {intl
                      .get(
                        'ide.src.page-search.page-data-search.main.8jb2griwe78'
                      )
                      .d('TQL方式')}
                  </Option>
                </Select>
              </Authority>

              <span className="mr8">
                {intl
                  .get(
                    'ide.src.page-search.page-my-search.my-search.main.9gqlxr3y5o'
                  )
                  .d('查询名称')}
              </span>
              <Input
                size="small"
                placeholder={intl
                  .get(
                    'ide.src.page-search.page-my-search.my-search.main.t9ccf0s6li'
                  )
                  .d('请输入数据查询关键字')}
                onChange={this.searchName}
                style={{ width: 200 }}
              />
            </div>
            {toJS(cardList).length ? (
              <div>
                <DtGrid row={3} fixedHeight={152}>
                  {cardList.map(({ id, name, ctime, used, type, descr }) => (
                    <Card
                      className="card"
                      title={name}
                      link={`${
                        window.__keeper.pathHrefPrefix
                      }/search/my-search/${
                        type === '可视化方式' ? 'visual' : 'tql'
                      }/${id}/${store.projectId}`}
                      labelList={[
                        {
                          label: intl
                            .get(
                              'ide.src.page-search.page-my-search.my-search.main.uyr5ajn5hhq'
                            )
                            .d('查询类型'),
                          value: type,
                        },
                        {
                          label: intl
                            .get(
                              'ide.src.page-group.group-detail.main.z2pk6fwpxdm'
                            )
                            .d('创建时间'),
                          value: ctime,
                        },
                      ]}
                      descr={descr}
                      actions={[
                        <Authority authCode="tag_app:update_search[cud]">
                          <Tooltip
                            placement="topRight"
                            title={intl
                              .get(
                                'ide.src.component.label-item.label-item.hemrpkpmmb8'
                              )
                              .d('编辑')}
                          >
                            <Button
                              type="link" // antd@Button 属性
                              disabled={used}
                              className="p0"
                              onClick={() =>
                                this.edit({
                                  id,
                                  name,
                                  used,
                                  descr,
                                })
                              }
                            >
                              <IconEdit
                                size="14"
                                className={used ? 'i-used' : ''}
                              />
                            </Button>
                          </Tooltip>
                        </Authority>,
                        <Authority authCode="tag_app:update_search[cud]">
                          <Tooltip
                            placement="topRight"
                            title={intl
                              .get(
                                'ide.src.page-group.group-manage.main.80dolfimgwr'
                              )
                              .d('删除')}
                          >
                            <Button
                              type="link" // antd@Button 属性
                              disabled={used}
                              className="p0"
                              onClick={() => this.del(id)}
                            >
                              <IconDel
                                size="14"
                                className={used ? 'i-used' : ''}
                              />
                            </Button>
                          </Tooltip>
                        </Authority>,
                        <Authority authCode="tag_app:update_search[cud]">
                          <Tooltip
                            placement="topRight"
                            title={intl
                              .get(
                                'ide.src.page-search.page-my-search.my-search.main.54kfuvh8qjn'
                              )
                              .d('克隆')}
                          >
                            <Button
                              type="link" // antd@Button 属性
                              disabled={used}
                              className="p0"
                              onClick={() => this.clone(id)}
                            >
                              <CopyOutlined
                                size="14"
                                className={used ? 'i-used' : ''}
                              />
                            </Button>
                          </Tooltip>
                        </Authority>,
                      ]}
                    />
                  ))}
                </DtGrid>
              </div>
            ) : (
              <NoData {...noDataConfig} style={{ marginTop: '15%' }} />
            )}

            <ModalEdit store={store} refresh={this.refresh} />
          </Spin>
        </div>
      </div>
    )
  }
}

export default projectProvider(searchProvider(MySearch))
