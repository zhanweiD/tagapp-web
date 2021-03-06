import intl from 'react-intl-universal'
/**
 * @description 我的查询-TQL
 */

import { Component } from 'react'
import { observer } from 'mobx-react'
import { action, toJS, observable } from 'mobx'
import cls from 'classnames'
import { message, Spin, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import sqlFormatter from 'sql-formatter'
import { Authority } from '../../../component'
// import LogPanel from '../code-component/log-panel'
import SearchResult from './search-result'
import { downloadResult } from '../../../common/util'

// import yunxing from '../../../icon/yunxing.svg'
// import geshihua from '../../../icon/geshihua.svg'

@observer
class TqlCode extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  @observable resultKey = 0

  componentDidMount() {
    this.store.getHeight()
    console.log(toJS(this.store.promptData))
    if (document.getElementById('codeArea')) {
      this.store.editor = window.CodeMirror.fromTextArea(
        document.getElementById('codeArea'),
        {
          mode: 'text/x-mysql',
          autoCloseBrackets: true,
          matchBrackets: true,
          showCursorWhenSelecting: true,
          indentWithTabs: false,
          lineNumbers: true,
          dragDrop: false,
          indentUnit: 4,
          tabSize: 4,
          styleActiveLine: true,
          readOnly: false,
          // keyMap: 'sublime',
          theme: 'default',
          hintOptions: {
            // 自定义提示选项
            completeSingle: false, // 当匹配只有一项的时候是否自动补全
            tables: this.store.promptData,
          },
        }
      )

      const { tqlDetail } = this.store
      if (tqlDetail.source) {
        this.store.editor.setValue(
          sqlFormatter.format(toJS(tqlDetail.source)),
          { language: 'n1ql', indent: '    ' }
        )
      }

      this.store.editor.on('change', (instance, change) =>
        this.checkIsCanHint(instance, change)
      )
    }
  }

  @action checkIsCanHint = (instance, change) => {
    this.store.log = ''
    this.store.tql = ''
    this.store.isRuned = false
    this.store.resultInfo = {}

    const { text } = change
    const { origin } = change
    // let flag = false
    if (
      origin === '+input' &&
      /\w|\./g.test(text[0]) &&
      change.text[0].length === 1
    ) {
      // flag = true

      this.store.editor.showHint(
        instance,
        { hint: window.CodeMirror.hint.sql },
        true
      )
    }

    // if (flag && this.store.runStatusMessage.status === 'success') {
    //   this.store.runStatusMessage.status = 'error'
    // }
  }

  // 运行
  @action operationCode() {
    const code = this.store.editor.getValue()
    if (!code) {
      message.error(
        intl
          .get('ide.src.page-search.page-data-search.tql.tql-code.dm2kr09am1w')
          .d('请输入运行代码')
      )
    } else {
      // this.store.showResult = true
      this.resultKey = Math.floor(Math.random() * 1000)
      this.store.runSearch({
        tql: code,
      })
    }
  }

  // 停止
  @action stopOperation() {
    console.log(this.editor.getValue())
  }

  // 初始化code
  @action codeFormat() {
    const code = this.store.editor.getValue()
    if (!code) {
      message.error(
        intl
          .get('ide.src.page-search.page-data-search.tql.tql-code.dm2kr09am1w')
          .d('请输入运行代码')
      )
    } else {
      this.store.editor.setValue(sqlFormatter.format(code), {
        language: 'n1ql',
        indent: '    ',
      })
    }
  }

  // 下载查询
  downloadResult = () => {
    const code = this.store.editor.getValue()
    downloadResult({
      projectId: this.store.projectId,
      runType: 2,
      tql: code,
    })
  }

  render() {
    const {
      tqlDetail,
      resultLoading,
      showResult,
      resultInfo,
      log,
      handleExpend,
      onDraggableLogMouseDown,
      isRuned,
    } = this.store

    return (
      <div className="code-content" id="code-content">
        <div style={{ height: 'calc(100vh - 90px)' }}>
          <div className="code-menu">
            <Authority authCode="tag_app:run_tql_search[x]">
              {resultLoading ? (
                <Tooltip
                  placement="topRight"
                  title={intl
                    .get(
                      'ide.src.page-search.page-data-search.tql.tql-code.ebbpsevqpu6'
                    )
                    .d('正在查询中，不可重复查询')}
                >
                  <span className="mr16 disabled">
                    {/* <img src={yunxing} alt="img" className="disabled"/> */}
                    <i
                      className="iconfont dtwave icon-run"
                      style={{ fontSize: '14px' }}
                    />
                    <span className="ml4">
                      {intl
                        .get(
                          'ide.src.component.list-content.search.rk9cxers0fj'
                        )
                        .d('查询')}
                    </span>
                  </span>
                </Tooltip>
              ) : (
                <span
                  className="code-menu-item mr16"
                  onClick={() => this.operationCode()}
                >
                  {/* <img src={yunxing} alt="img" /> */}
                  <i className="iconfont dtwave icon-run" />
                  <span className="ml4">
                    {intl
                      .get('ide.src.component.list-content.search.rk9cxers0fj')
                      .d('查询')}
                  </span>
                </span>
              )}
            </Authority>
            <span
              className="code-menu-item mr16"
              onClick={() => this.codeFormat()}
            >
              {/* <img src={geshihua} alt="img" /> */}
              <i className="iconfont dtwave icon-geshihua1" />
              <span className="ml4">
                {intl
                  .get(
                    'ide.src.page-search.page-data-search.tql.tql-code.xy7h0j4nw5'
                  )
                  .d('格式化')}
              </span>
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${window.__keeper.pathHrefPrefix}/search/tql-explain`}
              style={{ marginLeft: '-8px' }}
            >
              <QuestionCircleOutlined />
            </a>
          </div>
          <Spin spinning={resultLoading}>
            <form
              id="code_area"
              className={cls({
                new_codearea: true,
                new_codearea_nolog: !this.store.isRuned,
                max_height: this.store.isRuned,
              })}
            >
              <textarea
                id="codeArea"
                ref={t => (this.codeArea = t)}
                placeholder="code goes here..."
              >
                {toJS(tqlDetail.source)}
              </textarea>
            </form>
          </Spin>
        </div>
        <SearchResult
          log={toJS(log)}
          expend={showResult}
          loading={resultLoading}
          resultInfo={toJS(resultInfo)}
          handleExpend={handleExpend}
          onDraggableLogMouseDown={onDraggableLogMouseDown}
          isRuned={isRuned}
          downloadResult={this.downloadResult}
          resultKey={this.resultKey}
        />
      </div>
    )
  }
}
export default TqlCode
