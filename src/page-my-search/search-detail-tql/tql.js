/**
 * @description 我的查询-TQL
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button, Modal, message} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import TqlTree from './tql-tree'
import TqlCode from './tql-code'
import ModalSave from './modal-save'

import store from './store'
import './tql.styl'
import './code.styl'

const {confirm} = Modal
@observer
export default class Tql extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
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
        store.log = ''
        store.showResult = false
        store.resultInfo = {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  @action.bound save() {
    const t = this

    store.visibleSave = true
    // if (!store.log) {
    //   message.error('请运行正确TQL代码！')
    // } else {
    //   store.visibleSave = true
    // }
  }

  render() {
    return (
      <div className="tql">
        <div className="header-button">
          {/* <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button> */}
          <Button className="mr8" onClick={this.save}>保存数据查询</Button>
          <Button className="mr8" type="primary">生成API</Button>
        </div>
        <div className="tql-content">
          <TqlTree store={store} />
          <TqlCode store={store} />
          <ModalSave store={store} />
        </div>
      </div>
    )
  }
}
