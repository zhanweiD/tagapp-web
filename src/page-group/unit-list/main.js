import intl from 'react-intl-universal'
/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button, Spin} from 'antd'
import moment from 'moment'

import {
  projectProvider,
  NoData,
  ListContent,
  Authority,
} from '../../component'
import {baseApi} from '../../common/util'
import GroupModal from './group-modal'

import store from './store'

@observer
class UnitList extends Component {
  constructor(props) {
    super(props)
    // store.projectId = props.projectId
    const {
      match: {params},
    } = props
    store.id = params.id
    store.objId = params.objId
    store.queryDate = moment(parseInt(params.queryDate)).format('YYYY-MM-DD')
    store.projectId = params.projectId
    store.getUnitList()
  }

  @action openModal = () => {
    store.visible = true
  }
  @action outputUnitList = () => {
    const {id, projectId, queryDate} = store
    window.open(
      `${baseApi}/export/individuals?groupId=${id}&projectId=${projectId}&queryDate=${queryDate}`
    )
  }

  render() {
    const {list, tableLoading, titleList, totalCount} = store

    const noDataConfig = {
      btnText: intl
        .get('ide.src.page-group.unit-list.main.k3g19gdz3ss')
        .d('暂无个体'),
      code: 'asset_tag_project_add',
      noAuthText: intl
        .get('ide.src.page-group.unit-list.main.k3g19gdz3ss')
        .d('暂无个体'),
    }

    const listConfig = {
      columns: toJS(titleList),
      tableLoading,
      hasPaging: false,
      initGetDataByParent: true,
      scroll: {x: 1600},
      buttons: [
        <Authority authCode="tag_app:export_group[x]">
          <Button type="primary" onClick={this.outputUnitList}>
            {intl
              .get('ide.src.page-group.unit-list.main.2livkcqmaj7')
              .d('导出个体列表')}
          </Button>
        </Authority>,
        <Authority authCode="tag_app:create_individuals_group[c]">
          <Button type="primary" onClick={this.openModal}>
            {intl
              .get('ide.src.page-group.unit-list.group-modal.pl1u2lm99mr')
              .d('保存群体')}
          </Button>
        </Authority>,
      ],

      store, // 必填属性
      pagination: {
        totalCount,
        currentPage: 1,
        // pageSize: 10,
      },
    }

    return (
      <div className="page-unit">
        <div className="content-header">
          {intl
            .get('ide.src.page-group.group-detail.tab-history.mf7maxgb29')
            .d('个体列表')}
        </div>
        <Spin spinning={tableLoading}>
          {list.length ? (
            <div className="header-page list-content">
              <ListContent {...listConfig} />
            </div>
          ) : (
            <div className="header-page" style={{paddingTop: '15%'}}>
              <NoData {...noDataConfig} />
            </div>
          )}
        </Spin>
        <GroupModal store={store} />
      </div>
    )
  }
}

export default projectProvider(UnitList)
