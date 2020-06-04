/**
 * @description 个体列表
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'

import {projectProvider, NoData, AuthBox, ListContent} from '../../component'
import {Time} from '../../common/util'
import storage from '../../common/nattyStorage'
import GroupModal from './group-modal'

import store from './store'

@observer
class UnitList extends Component {
  columns = [
    {
      key: 'objId',
      title: '会员ID',
      dataIndex: 'objId',
      render: text => <a href>{text}</a>,
      // render: (text, record) => (record.config === 1
      //   ? (
      //     <Link to={`/project/${record.id}`}>
      //       <OmitTooltip maxWidth={100} text={text} />
      //     </Link>
      //   ) : <OmitTooltip maxWidth={100} text={text} />)
      // ,
    }, {
      key: 'objName',
      title: '姓名',
      dataIndex: 'objName',
    }, {
      key: 'type',
      title: '年龄',
      dataIndex: 'type',
    }, {
      key: 'lastCount',
      title: '性别',
      dataIndex: 'lastCount',
    }, {
      key: 'lastTime',
      title: '注册日期',
      dataIndex: 'lastTime',
      render: text => <Time timestamp={text} />,
    }, {
      key: 'mode',
      title: '省份',
      dataIndex: 'mode',
    }, {
      key: 'mode',
      title: '学历',
      dataIndex: 'mode',
    }, {
      key: 'mode',
      title: '会员等级',
      dataIndex: 'mode',
    }]
  componentWillMount() {

  }

  @action openModal = () => {
    store.visible = true
  }

  /**
   * @description 跳转到标签管理
   */
  goTagManage = id => {
    storage.set('objId', id)
    window.location.href = `${window.__keeper.pathHrefPrefix}/group/unit`
  }

  render() {
    const {
      cUser, list, tableLoading, searchParams,
    } = store

    const noDataConfig = {
      btnText: '暂无个体',
      // onClick: () => this.openModal(),
      text: '该群体暂无个体！',
      code: 'asset_tag_project_add',
      noAuthText: '没有任何个体',
    }

    const listConfig = {
      columns: this.columns,
      // beforeSearch: this.beforeSearch,
      buttons: [
        <AuthBox code="asset_tag_project_add" type="primary" onClick={() => console.log(1)}>导出个体列表</AuthBox>,
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
