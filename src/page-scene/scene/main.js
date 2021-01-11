import intl from 'react-intl-universal'
import { Component, Fragment } from 'react'
import { action, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Spin, Modal, Button } from 'antd'
import {
  Tag,
  NoData,
  Authority,
  projectProvider,
  Card,
  DtGrid,
} from '../../component'
import { IconDel, IconEdit } from '../../icon-comp'

import ModalAdd from './modal'

import store from './store'

const { confirm } = Modal

@observer
class Scene extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
  }

  componentWillMount() {
    if (store.projectId) {
      store.getList()
      // store.getAuthCode()
    }
  }

  @action handleModalVisible(type, data = {}) {
    store.isEdit = !!type

    store.getStorageType()

    if (type) {
      store.getDetail({
        occasionId: data.id,
      })
    }
    store.modalVisible = true
  }

  @action handleDel(id) {
    confirm({
      title: intl
        .get('ide.src.page-scene.scene.main.hdgssb5e0af')
        .d('确认删除 ？'),
      content: intl
        .get('ide.src.page-scene.scene.main.4yk6rf15neq')
        .d('所属该场景的类目都会被删除，标签也会被移除'),
      onOk: () => {
        store.delScene(id)
      },
      onCancel: () => {},
    })
  }

  render() {
    const { loading, list = [], functionCodes, modalVisible } = store

    const noDataConfig = {
      btnText: intl
        .get('ide.src.page-scene.scene.main.k292pc7w0no')
        .d('添加场景'),
      text: intl
        .get('ide.src.page-scene.scene.main.p6gofdqaysf')
        .d('没有任何场景，去新建场景吧'),
      onClick: () => this.handleModalVisible(),
      code: 'tag_app:create_occ[cud]',
      noAuthText: intl
        .get('ide.src.component.no-data.noData.rwnouwn2p1f')
        .d('暂无数据'),
      // myFunctionCodes: functionCodes,
      isLoading: loading,
    }

    return (
      <div className="scene-wrap">
        <div className="content-header">
          {intl
            .get('ide.src.page-scene.scene.main.69s192xqcvg')
            .d('标签使用场景')}
        </div>
        <Spin spinning={loading}>
          <div className="scene-box">
            {list.length ? (
              <Fragment>
                <Authority authCode="tag_app:create_occ[cud]">
                  <Button
                    className="mb16"
                    type="primary"
                    onClick={() => this.handleModalVisible()}
                  >
                    {intl
                      .get('ide.src.page-scene.scene.main.k292pc7w0no')
                      .d('添加场景')}
                  </Button>
                </Authority>

                <DtGrid row={3} fixedHeight={192}>
                  {list.map(
                    (
                      {
                        id,
                        name,
                        cuser,
                        cdate,
                        used,
                        tagCount,
                        apiCount,
                        descr,
                      },
                      d
                    ) => (
                      <Card
                        className="card"
                        title={name}
                        // eslint-disable-next-line no-underscore-dangle
                        link={`${window.__keeper.pathHrefPrefix}/scene/${id}/${store.projectId}`}
                        tag={[
                          <Tag
                            status={used ? 'process' : 'wait'}
                            text={
                              used
                                ? intl
                                    .get(
                                      'ide.src.page-config.group-config.back-config.ec2lmau5zn'
                                    )
                                    .d('使用中')
                                : intl
                                    .get(
                                      'ide.src.component.tag.tag.sz5nencfou8'
                                    )
                                    .d('未使用')
                            }
                            className="mr8"
                          />,
                        ]}
                        labelList={[
                          {
                            label: intl
                              .get(
                                'ide.src.page-scene.scene-detail.main.13xru7vjhjuj'
                              )
                              .d('创建者'),
                            value: cuser,
                          },
                          {
                            label: intl
                              .get(
                                'ide.src.page-group.group-detail.main.z2pk6fwpxdm'
                              )
                              .d('创建时间'),
                            value: moment(+cdate).format('YYYY-MM-DD'),
                          },
                        ]}
                        descr={descr}
                        countList={[
                          {
                            label: intl
                              .get('ide.src.page-scene.scene.main.59dx6nj4gho')
                              .d('标签数'),
                            value: tagCount,
                          },
                          {
                            label: intl
                              .get('ide.src.page-scene.scene.main.on9784w06i')
                              .d('API数'),
                            value: apiCount,
                          },
                        ]}
                        actions={[
                          <Authority authCode="tag_app:create_occ[cud]">
                            <Button
                              type="link" // antd@Button 属性
                              disabled={used}
                              className="p0"
                              onClick={() =>
                                this.handleModalVisible('edit', list[d])
                              }
                            >
                              <IconEdit
                                size="14"
                                className={used ? 'i-used' : ''}
                              />
                            </Button>
                          </Authority>,
                          <Authority authCode="tag_app:create_occ[cud]">
                            <Button
                              type="link" // antd@Button 属性
                              disabled={used}
                              className="p0"
                              onClick={() => this.handleDel(id)}
                            >
                              <IconDel
                                size="14"
                                className={used ? 'i-used' : ''}
                              />
                            </Button>
                          </Authority>,
                        ]}
                      />
                    )
                  )}
                </DtGrid>
              </Fragment>
            ) : (
              <div
                className="header-page"
                style={{ paddingTop: '15%', margin: 0 }}
              >
                <NoData
                  {...noDataConfig}
                  // style={{marginTop: '15%'}}
                />
              </div>
            )}

            {modalVisible ? <ModalAdd store={store} /> : null}
          </div>
        </Spin>
      </div>
    )
  }
}

export default projectProvider(Scene)
