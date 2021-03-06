import intl from 'react-intl-universal'
/**
 * @description 我的查询-TQL
 */
import { Component, useEffect } from 'react'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import { Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import OnerFrame from '@dtwave/oner-frame'
import { Authority, Loading } from '../../../component'
import TqlTree from './tql-tree'
import TqlCode from './tql-code'
import ModalSave from './modal-save'
import DrewerApi from '../search-detail-visual/modal-api'

import store from './store'
import './tql.styl'
import './code.styl'

const { confirm } = Modal
@observer
class Tql extends Component {
  constructor(props) {
    super(props)
    // store.projectId = props.projectId
    const {
      match: { params },
    } = props
    store.searchId = params.id
    store.projectId = params.projectId
  }

  componentWillMount() {
    store.getFunTree()
    store.getTagTree()
    store.getDetail()
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
      title: intl
        .get('ide.src.page-search.page-data-search.tql.tql.idhmx1zovbh')
        .d('确认清空?'),
      icon: <ExclamationCircleOutlined />,
      content: intl
        .get('ide.src.page-search.page-data-search.tql.tql.pailcsw2d2')
        .d('确认清空数据查询？'),
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
      message.error(
        intl
          .get('ide.src.page-search.page-data-search.tql.tql.j602512ofih')
          .d('请运行正确TQL代码！')
      )
    } else {
      store.tql = code
      store.visibleSave = true
    }
  }

  render() {
    const { resultInfo, isRuned, tqlTreeLoading } = store

    return (
      <div className="tql-detail">
        <div className="header-button">
          {/* <Button className="mr8" onClick={this.clearAll}>清空数据查询</Button> */}
          <Authority authCode="tag_app:create_tql_search[c]">
            <Button className="mr8" onClick={this.save}>
              {intl
                .get(
                  'ide.src.page-search.page-data-search.tql.modal-save.6nv9c6pianp'
                )
                .d('保存数据查询')}
            </Button>
          </Authority>
          <Authority authCode="tag_app:create_tql_api[c]">
            <Button
              className="mr8"
              type="primary"
              disabled={!resultInfo.sql || !isRuned}
              onClick={this.createApi}
            >
              {intl
                .get('ide.src.page-search.page-data-search.tql.tql.a8guqmo8wg5')
                .d('生成API')}
            </Button>
          </Authority>
        </div>
        <div className="tql-content-detail">
          <TqlTree store={store} />
          {!tqlTreeLoading ? (
            <TqlCode store={store} />
          ) : (
            <div className="code-content border-d9">
              <Loading mode="block" height={100} />
            </div>
          )}

          <ModalSave store={store} />
          <DrewerApi store={store} />
        </div>
      </div>
    )
  }
}

export default props => {
  const ctx = OnerFrame.useFrame()

  useEffect(() => {
    ctx.useProject(true, null, { visible: false })
  }, [])

  return <Tql {...props} />
}
