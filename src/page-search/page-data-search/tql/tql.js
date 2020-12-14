/**
 * @description 我的查询-TQL
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Button, Modal, message} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {Authority, Loading} from '../../../component'
import TqlTree from './tql-tree'
import TqlCode from './tql-code'
import ModalSave from './modal-save'
import DrewerApi from '../visual/modal-api'

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

  componentWillUnmount() {
    store.editor.setValue('')
    store.log = ''
    store.tql = ''
    store.showResult = false
    store.resultInfo = {}
    store.resultLoading = false
    store.isRuned = false
  }

  @action.bound createApi() {
    store.getApiGroup()
    store.getApiParams()
    store.visibleApi = true
  }

  @action.bound clearAll() {
    confirm({
      title: '确认清空?',
      icon: <ExclamationCircleOutlined />,
      content: '确认清空数据查询？',
      onOk() {
        store.editor.setValue('')
        store.log = ''
        store.tql = ''
        store.showResult = false
        store.resultInfo = {}
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  @action.bound save() {
    const code = store.editor.getValue()
    if (!code) {
      message.error('请运行正确TQL代码！')
    } else {
      store.tql = code
      store.visibleSave = true
    }
  }

  render() {
    const {
      resultInfo,
      isRuned,
      tqlTreeLoading,
    } = store

    return (
      <div className="tql">
        <div className="header-button">
          <Authority
            authCode="tag_app:clear_tql_search[d]"
          >
            <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button>
          </Authority>
          <Authority
            authCode="tag_app:create_tql_search[c]"
          >
            <Button className="mr8" onClick={this.save}>保存数据查询</Button>
          </Authority>
          <Authority
            authCode="tag_app:create_tql_api[c]"
          >
            <Button className="mr8" type="primary" disabled={!resultInfo.sql || !isRuned} onClick={this.createApi}>生成API</Button>
          </Authority>
        </div>
        <div className="tql-content">
          <TqlTree store={store} />
          {
            !tqlTreeLoading ? (
              <TqlCode store={store} />
            ) : <div className="code-content border-d9"><Loading mode="block" height={100} /></div>
          }
          <ModalSave store={store} />
          <DrewerApi store={store} />
        </div>
      </div>
    )
  }
}
