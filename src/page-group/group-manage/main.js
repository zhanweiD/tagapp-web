/**
 * @description 群体管理
 */
import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Popconfirm, Badge, Dropdown, Menu, Button} from 'antd'
import {DownOutlined} from '@ant-design/icons'

import {Time, successTip, codeInProduct} from '../../common/util'
import {
  ListContent, NoData, OmitTooltip, AuthBox, projectProvider, groupProvider, Authority,
} from '../../component'

import search from './search'
import ModalGroup from './modal'
import IdCreate from './id-create'
import store from './store'

@observer
class GroupManage extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId

    store.searchParams = {}
    store.getEntityList()
  }

  formRef = React.createRef()

  menu = record => {
    const {status, mode, type} = record
    let isClick = false
    if (status === 1) {
      isClick = false
    } else if (status === 2) {
      if (mode === 2 || type === 2) {
        isClick = false
      } else {
        isClick = true
      }
    } else {
      isClick = true
    }
    return (
      <Menu>
        <Menu.Item disabled={isClick}>
          <Link disabled={isClick} to={`/group/analyze/${record.id}/${record.objId}/${store.projectId}`}>
            <a href disabled={isClick}>群体分析</a>
          </Link>
        </Menu.Item>
        <Menu.Item disabled={isClick}>
          <Link disabled={isClick} to={`/group/unit/${record.id}/${record.objId}/${record.lastTime}/${store.projectId}`}>
            <a href disabled={isClick}>个体列表</a>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
  columns = [
    {
      key: 'name',
      title: '群体名称',
      dataIndex: 'name',
      render: (text, record) => (codeInProduct('tag_app:group_detail[r]') ? (
        <Link target="_blank" to={`/group/manage/${record.id}/${record.objId}/${store.projectId}`}>
          <OmitTooltip maxWidth={100} text={text} />
        </Link>
      ) : <span>{text}</span>
       
      ),
    }, {
      key: 'objName',
      title: '实体',
      dataIndex: 'objName',
    }, {
      key: 'type',
      title: '群体类型',
      dataIndex: 'type',
      render: text => (text === 1 ? '离线群体' : '实时群体'),
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
        } if (v === 2) {
          return (<Badge color="red" text="失败" />)
        }
        return (<Badge color="blue" text="计算中" />)
      },
    }, {
      key: 'lastTime',
      title: '创建时间',
      dataIndex: 'lastTime',
      width: 170,
      render: text => <Time timestamp={text} />,
    }, {
      key: 'updateTime',
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 170,
      render: text => <Time timestamp={text} />,
    }, {
      key: 'mode',
      title: '创建方式',
      dataIndex: 'mode',
      render: text => (text === 1 ? '规则创建' : 'ID集合创建'),
    }, {
      key: 'action',
      title: '操作',
      width: 200,
      dataIndex: 'action',
      render: (text, record) => (
        <div className="FBH FBAC">
          <Fragment>
            <Authority
              authCode="tag_app:run_group[x]"
            >
              <a className="mr16" disabled={record.status === 3 || record.type === 2 || record.mode === 2} onClick={() => this.goPerform(record)} href>执行</a>

            </Authority>
            {/* <span className="table-action-line" /> */}
          </Fragment>
          <Fragment>
            <Authority
              authCode="tag_app:update_group[u]"
            >
              <a className="mr16" disabled={record.status === 3} href onClick={() => this.goGroupEdit(record)}>编辑</a>

            </Authority>
            {/* <span className="table-action-line" /> */}
          </Fragment>
               
          <Fragment>
            <Authority
              authCode="tag_app:delete_group[d]"
            >
              <Popconfirm
                placement="topRight"
                title="你确定要删除该群体吗？"
                disabled={record.status === 3}
                onConfirm={() => this.delItem(record.id)}
              >
                {/* <a href>删除</a> */}
                <a disabled={record.status === 3} href className="mr16">删除</a>
                {/* <span className="table-action-line" /> */}
              </Popconfirm>
            </Authority>
           
          </Fragment>
          <Authority
            authCode="tag_app:analyze_group[x]"
          >
            <Dropdown overlay={() => this.menu(record)}>
              <a href>
                更多
                <DownOutlined />
              </a>
            </Dropdown>
          </Authority>
        </div>
      ),
    },
  ]

  @action openModal = () => {
    store.isAdd = true
    store.visible = true
  }

  // 删除群体
  delItem = id => {
    store.removeGroup(id)
  }

  // 群体执行
  goPerform = record => {
    const {mode, type, id} = record
    if (type === 1 && mode === 1) {
      store.performGroup(id)
    }
    // if (mode === 2) {
    //   store.isPerform = true
    //   record.objId = record.objId.toString()
    //   store.objId = record.objId
    //   store.recordObj = record
    //   store.isAdd = false

    //   store.getTagList()
    //   store.getEditIdGroup(this.childForm.setOutputTags)
    //   store.drawerVisible = true
    // } else if (mode === 1) {
    //   if (type === 1) {
    //     store.performGroup(id)
    //   }
    // }
  }

  // 跳转到群体编辑
  goGroupEdit = record => {
    store.isAdd = false
    const {mode, id, type, objId} = record
    if (mode === 2) {
      record.objId = objId.toString()
      store.objId = record.objId
      store.recordObj = record
      store.uploadData = true

      store.getTagList()
      store.getEditIdGroup(this.childForm.setOutputTags)
      store.drawerVisible = true
    } else {
      window.location.href = `${window.__keeper.pathHrefPrefix}/group/rule-create/${type}/${store.projectId}/${id}`
    }
  }

  // 列表请求前搜索参数处理
  // values 搜索内容
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
      projectId,
    } = store

    const listConfig = {
      initParams: {projectId},
      columns: this.columns,
      searchParams: search(store),
      beforeSearch: this.beforeSearch,
      buttons: [<Authority
        authCode="tag_app:create_group[c]"
      >
        <Button type="primary" onClick={() => this.openModal()}>新建群体</Button>

                </Authority>],
      // initGetDataByParent: true, // 初始请求 在父层组件处理。列表组件componentWillMount内不再进行请求
      store, // 必填属性
    }

    return (
      <div>
        <div className="content-header">群体管理</div>
        <div className="header-page">
          <div className="list-content">
            <ListContent {...listConfig} />
          </div>
          <ModalGroup store={store} />
          <IdCreate onRef={ref => this.childForm = ref} store={store} />
        </div>
      </div>
    )
  }
}

export default projectProvider(groupProvider(GroupManage))
