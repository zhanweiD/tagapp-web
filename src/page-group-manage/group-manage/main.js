/**
 * @description 群体管理
 */
import {Component, Fragment} from 'react'
import {action} from 'mobx'
import {observer, inject} from 'mobx-react'
import {
  Popconfirm, Badge, Icon, Dropdown, Menu,
} from 'antd'
import {Link} from 'react-router-dom'
import * as navListMap from '../../common/navList'
import {Time} from '../../common/util'
import {
  ListContent, NoData, OmitTooltip, AuthBox, projectProvider,
} from '../../component'
import storage from '../../common/nattyStorage'

import seach from './search'
import ModalGroup from './modal'

import store from './store'

@observer
class GroupManage extends Component {
  columns = [
    {
      key: 'name',
      title: '群体名称',
      dataIndex: 'name',
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
      title: '实体',
      dataIndex: 'objName',
    }, {
      key: 'type',
      title: '群体类型',
      dataIndex: 'type',
      render: text => text === 1 ? '离线实体' : '实时实体',
    }, {
      key: 'lastCount',
      title: '群体数量',
      dataIndex: 'lastCount',
    }, {
      key: 'status',
      title: '群体状态',
      dataIndex: 'status',
      render: v => {
        if (v === 1) {
          return (<Badge color="green" text="正常" />)
        } else if (v === 2) {
          return (<Badge color="red" text="失败" />)
        }
        return (<Badge color="yellow" text="计算中" />)
      },
    }, {
      key: 'lastTime',
      title: '创建时间',
      dataIndex: 'lastTime',
      render: text => <Time timestamp={text} />,
    }, {
      key: 'mode',
      title: '创建方式',
      dataIndex: 'mode',
      render: text => text === 1 ? '规则创建' : 'ID集合创建',
    }, {
      key: 'action',
      title: '操作',
      width: 300,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            {/* <Link to={`/project/${record.id}`}>群体分析</Link> */}
            <a disabled={record.status !== 1 ? true : false} href>群体分析</a>
            <span className="table-action-line" />
          </Fragment>
          <Fragment>
            <a disabled={record.status !== 1 ? true : false} href>个体列表</a>
            <span className="table-action-line" />
          </Fragment>
          <Fragment>
            <a disabled={record.status === 3 ? true : false} href>执行</a>
            <span className="table-action-line" />
          </Fragment>
          <Fragment>
            <a disabled={record.status === 3 ? true : false} href>编辑</a>
            <span className="table-action-line" />
          </Fragment>
               
          <Fragment>
            <Popconfirm placement="topRight" title="你确定要删除该群体吗？" onConfirm={() => this.delItem(record.id)}>
              <a disabled={record.status === 3 ? true : false} href>删除</a>
            </Popconfirm>
            <span className="table-action-line" />
          </Fragment>
        </div>
      ),
    },
  ]
  componentWillMount() {

  }

  @action openModal = () => {
    store.visible = true
  }

  /**
   * @description 删除项目
   * @param id 项目ID
   */
  delItem = id => {
    store.delList(id)
  }

  /**
   * @description 跳转到标签管理
   */
  goTagManage = id => {
    storage.set('tag_projectId', id)
    window.location.href = `${window.__keeper.pathHrefPrefix}/tag-warehouse`
  }

  /**
   * @description 跳转到标签加工
   */
  goTagProcess = id => {
    storage.set('tag_projectId', id)
    window.location.href = `${window.__keeper.pathHrefPrefix}/tag-schema`
  }

  /**
   * @description 跳转到标签应用
   */
  goTagApplication = id => {
    storage.set('tag_projectId', id)
    window.location.href = `${window.__keeper.pathHrefPrefix}/scene`
  }

  /**
   * @description 列表请求前搜索参数处理
   * @param values 搜索内容
   */
  beforeSearch = values => {
    if (values.time) {
      values.startTime = values.time[0].format('YYYY-MM-DD')
      values.endTime = values.time[1].format('YYYY-MM-DD')
      delete values.time
    }
    return values
  }

  render() {
    const {
      cUser, list, tableLoading, searchParams,
    } = store

    const noDataConfig = {
      btnText: '新建群体',
      onClick: () => this.openModal(),
      text: '没有任何群体，请在当前页面创建群体！',
      code: 'asset_tag_project_add',
      noAuthText: '没有任何群体',
    }

    const listConfig = {
      columns: this.columns,
      searchParams: seach({cUser}),
      beforeSearch: this.beforeSearch,
      buttons: [<AuthBox code="asset_tag_project_add" type="primary" onClick={() => this.openModal()}>新建群体</AuthBox>],
      initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div className="page-group">
        <div className="content-header">群体管理</div>
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
        <ModalGroup store={store} />
      </div>
    )
  }
}

export default projectProvider(GroupManage)
