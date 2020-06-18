/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'

import {projectProvider, NoData, AuthBox, ListContent} from '../../component'
import {Time} from '../../common/util'
import storage from '../../common/nattyStorage'
import GroupModal from './group-modal'

import store from './store'

@observer
class UnitList extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId

    const {match: {params}} = props
    store.id = params.id
    store.queryDate = params.queryDate
    store.getUnitList()
  }

  componentWillMount() {

  }

  @action openModal = () => {
    store.visible = true
  }

  /**
   * @description 跳转到个体画像
   */
  goTagManage = id => {
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/unit`
  }

  render() {
    const {
      list, tableLoading, searchParams, titleList,
    } = store

    const noDataConfig = {
      btnText: '暂无个体',
      // onClick: () => this.openModal(),
      text: '该群体暂无个体！',
      code: 'asset_tag_project_add',
      noAuthText: '没有任何个体',
    }
    const listConfig = {
      columns: toJS(titleList),
      tableLoading,
      // beforeSearch: this.beforeSearch,
      buttons: [
        <AuthBox code="asset_tag_project_add" type="primary" onClick={() => store.outputUnitList()}>导出个体列表</AuthBox>,
        <AuthBox code="asset_tag_project_add" type="primary" onClick={this.openModal}>保存群体</AuthBox>,
      ],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="page-unit">
        {/* <div className="content-header">群体管理</div> */}
        {/* <div className="list-content">
          <ListContent {...listConfig} />
        </div> */}
        {
          list.length || JSON.stringify(searchParams) !== '{}' ? (
            <div className="list-content">
              <ListContent {...listConfig} />
            </div>
          ) : (
            <NoData
              // isLoading={tableLoading}
              {...noDataConfig}
            />
          )
        }
        <GroupModal store={store} />
      </div>
    )
  }
}

export default projectProvider(UnitList)
