import intl from 'react-intl-universal'
import {Component, Fragment} from 'react'
import {observable, action, toJS, computed} from 'mobx'
import {observer, Provider} from 'mobx-react'
import {Button, Spin} from 'antd'

import {Time} from '../../common/util'
import {NoData, DetailHeader} from '../../component'

import TrendTag from './trend-tag'
import TrendApi from './trend-api'

import Store from './store-select-tag'

import TagCategory, {TagCategoryStore} from './tree'

@observer
class SelectTag extends Component {
  constructor(props) {
    super(props)

    this.store = new Store(props)
    this.store.categoryStore = new TagCategoryStore(props)

    // 场景id
    this.store.sceneId = props.sceneId

    // 项目id
    this.store.projectId = props.projectId

    // 选择标签暂存id
    this.tagId = undefined

    this.isTagDel = false
  }

  // 判断标签是否被删除
  @observable isTagDel = false

  componentWillMount() {
    this.store.isObjExist(() => {
      this.store.categoryStore.getCategoryList((data, treeData) => {
        // 没有对象
        if (!data.length) return

        // 所有标签
        const tagList = data.filter(item => !item.type)

        // 没有标签
        if (!tagList.length) return

        // 存在类目存在标签; 查找第一个标签
        const getFirstChildId = d => {
          let tagId
          for (let i = 0; i < d.length; i++) {
            const tagChild = data.filter(
              item => item.treeId === d[i].id && !item.type
            )

            if (tagChild.length) {
              tagId = tagChild[0].id
              break
            }
          }
          return tagId
        }

        const tagId = getFirstChildId(treeData)

        if (tagId) {
          // 存在标签,默认选中第一个
          this.tagId = tagId
          this.store.tagId = tagId
          this.store.categoryStore.currentTreeItemKey = tagId
          this.store.getTagDetail()
        }
      })
    })

    // if (this.store.projectId) {
    //   this.store.getAuthCode()
    // }
  }

  @action tagChange = tagId => {
    if (tagId && tagId !== this.tagId) {
      this.store.getTagDetail()
      this.tagId = tagId
      this.isTagDel = false
    }
  }

  @action tagDel = tagId => {
    const {categoryStore} = this.store
    const target = categoryStore.cateList.filter(item => item.id === this.tagId) || []
    this.isTagDel = !target.length

    // 删除项是当前选中项
    if (this.isTagDel) {
      this.store.tagId = undefined
      this.tagId = undefined
    }
  }

  // goToTagDetail = id => {
  // 跳转至标签模型添加标签
  // window.location.href = `${window.__keeper.pathHrefPrefix}/tag-model/index.html#/manage/tag-maintain/${id}`
  // }

  // 选择对象
  @action selectObj = () => {
    const {treeData} = this.store.categoryStore
    if (treeData.length) return

    // 获取选择对象
    this.store.categoryStore.getSelectObj()

    this.store.categoryStore.currentTreeItemKey = 0
    this.store.categoryStore.eStatus.editObject = false
    this.store.categoryStore.modalVisible.editObject = true
  }

  // 判断场景下 对象是否存在
  @computed get objExistFlag() {
    const {treeData} = this.store.categoryStore
    return treeData.length
  }

  render() {
    const {
      tagInfo,
      tagId,
      tagInfoLoading,
      tagExistFlag,
      tagExistFlagLoading,
      functionCodes,
      projectId,
    } = this.store

    const {
      id,
      name,
      // used,
      enName,
      valueTypeName,
      cuser,
      isEnum,
      descr,
      // objTypeCode,
      // treeId,
    } = toJS(tagInfo)

    // 详情信息
    const baseInfo = [
      {
        title: intl
          .get('ide.src.page-scene.scene-detail.select-tag.eba3w9n3h9e')
          .d('标签标识'),
        value: enName,
      },
      {
        title: intl
          .get('ide.src.page-scene.scene-detail.select-tag.dcoug0r6pnj')
          .d('数据类型'),
        value: valueTypeName,
      },
      {
        title: intl
          .get('ide.src.page-scene.scene-detail.select-tag.eddpjjmgvji')
          .d('是否枚举'),
        value: isEnum
          ? intl.get('ide.src.component.form-component.qzk44dlnid').d('是')
          : intl.get('ide.src.component.form-component.5lxtuor5tix').d('否'),
      },
    ]

    const tagCategoryOpt = {
      tagChange: this.tagChange,
      tagDel: this.tagDel,
    }

    return (
      <Provider bigStore={this.store} sceneDetail={this.props.sceneDetailStore}>
        <div className="select-tag FBH">
          <TagCategory {...tagCategoryOpt} />

          <div className="FB1 m16" style={{overflowX: 'hidden'}}>
            {this.store.categoryStore.treeLoading || !tagId ? (
              <div style={{marginTop: '20%', marginLeft: '50%'}}>
                <Spin spinning />
              </div>
            ) : (
              <div>
                {tagId && !this.isTagDel ? (
                  <Fragment>
                    <Spin spinning={tagInfoLoading}>
                      <DetailHeader
                        name={name}
                        descr={descr}
                        baseInfo={baseInfo}
                        // 点击“标签详情”按钮，进入标签详情
                        actions={[
                          <Button type="primary">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`/tag-model/index.html#/manage/tag-maintain/${id}/${projectId}`}
                            >
                              {intl
                                .get('ide.src.common.navList.gy9u8c4zjpj')
                                .d('标签详情')}
                            </a>
                          </Button>,
                        ]}
                      />
                    </Spin>
                    <TrendTag store={this.store} tagId={this.store.tagId} />
                    <TrendApi store={this.store} tagId={this.store.tagId} />
                  </Fragment>
                ) : (
                  <NoData
                    text={intl
                      .get(
                        'ide.src.page-scene.scene-detail.select-tag.jph7jjmgrp'
                      )
                      .d(
                        '请在已选择的  对象中，选择需要使用的标签！（注：选择的标签必须放在对象的某个类目下）'
                      )}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Provider>
    )
  }
}
export default SelectTag
