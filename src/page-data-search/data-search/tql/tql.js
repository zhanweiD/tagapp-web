/**
 * @description 我的查询-TQL
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Button, Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import TqlTree from './tql-tree'
import TqlCode from './tql-code'

import store from './store'
import './tql.styl'
import './code.styl'

const {confirm} = Modal
@observer
export default class Tql extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
  }

  componentWillMount() {
    store.getFunTree()
    store.getTagTree()
  }

  @action.bound createApi() {
    store.getApiParams()
    store.visibleApi = true
  }

  @action.bound clearAll() {
    confirm({
      title: '确认清空?',
      icon: <ExclamationCircleOutlined />,
      content: '确认清空数据查询？',
      onOk() {
        store.outConfig.clear()
        store.screenConfig.clear()
        store.showResult = false
        store.resultInfo = {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  render() {
    return (
      <div className="tql">
        <div className="header-button">
          <Button className="mr8">清空数据查询</Button>
          <Button className="mr8">保存数据查询</Button>
          <Button className="mr8" type="primary">生成API</Button>
        </div>
        <div className="tql-content">
          <TqlTree store={store} />
          <TqlCode store={store} />
        </div>
      </div>
    )
  }
}
