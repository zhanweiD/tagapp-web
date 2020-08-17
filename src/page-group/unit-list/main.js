/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button} from 'antd'
import moment from 'moment'

import {projectProvider, NoData, ListContent, Authority} from '../../component'
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
      initGetDataByParent: true,
      buttons: [
        <Authority
          authCode="tag_app:export_group[x]"
        >
          <Button type="primary" onClick={this.outputUnitList}>导出个体列表</Button>
        </Authority>,
        <Authority
          authCode="tag_app:create_individuals_group[c]"
        >
          <Button type="primary" onClick={this.openModal}>保存群体</Button>
        </Authority>,
      ],
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
            <div className="header-page" style={{paddingTop: '25%'}}>
              <NoData {...noDataConfig} />
            </div>
          )
        }
        <GroupModal store={store} />
      </div>
    )
  }
}

export default projectProvider(UnitList)
