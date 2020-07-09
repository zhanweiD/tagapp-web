/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import moment from 'moment'

import {projectProvider, NoData, AuthBox, ListContent} from '../../component'
import {baseApi} from '../../common/util'
import GroupModal from './group-modal'

import store from './store'

@observer
class UnitList extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    const {match: {params}} = props
    store.id = params.id
    store.objId = params.objId
    store.queryDate = moment(parseInt(params.queryDate)).format('YYYY-MM-DD')
    store.getUnitList()
  }

  @action openModal = () => {
    store.visible = true
  }
  @action outputUnitList = () => {
    const {id, projectId, queryDate} = store
    window.open(`${baseApi}/export/individuals?groupId=${id}&projectId=${projectId}&queryDate=${queryDate}`)
  }

  render() {
    const {
      list, tableLoading, titleList,
    } = store

    const noDataConfig = {
      btnText: '暂无个体',
      code: 'asset_tag_project_add',
      noAuthText: '暂无个体',
    }

    const listConfig = {
      columns: toJS(titleList),
      tableLoading,
      buttons: [
        <AuthBox code="asset_tag_project_add" type="primary" onClick={this.outputUnitList}>导出个体列表</AuthBox>,
        <AuthBox code="asset_tag_project_add" type="primary" onClick={this.openModal}>保存群体</AuthBox>,
      ],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="page-unit">
        <div className="content-header">个体列表</div>
        {
          list.length ? (
            <div className="header-page list-content">
              <ListContent {...listConfig} />
            </div>
          ) : (
            <NoData {...noDataConfig} />
          )
        }
        <GroupModal store={store} />
      </div>
    )
  }
}

export default projectProvider(UnitList)
