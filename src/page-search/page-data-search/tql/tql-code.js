/**
 * @description 我的查询-TQL
 */

import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import cls from 'classnames'
import {message, Spin} from 'antd'

import sqlFormatter from 'sql-formatter'
// import LogPanel from '../code-component/log-panel'
import SearchResult from './search-result'

import yunxing from '../../../icon/yunxing.svg'
import geshihua from '../../../icon/geshihua.svg'

@observer
export default class TqlCode extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  componentDidMount() {
    this.store.getHeight()

    if (document.getElementById('codeArea')) {
      this.store.editor = window.CodeMirror.fromTextArea(document.getElementById('codeArea'), {
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
      })

      const {tqlDetail} = this.store
      if (tqlDetail.source) {
        this.store.editor.setValue(sqlFormatter.format(toJS(tqlDetail.source)), {language: 'n1ql', indent: '    '})
      }
    }

    this.store.editor.on('change', (instance, change) => this.checkIsCanHint(instance, change))
  }

  @action checkIsCanHint = (instance, change) => {
    this.store.log = ''
    this.store.tql = ''
    
    const {text} = change
    const {origin} = change
    // let flag = false
    if (origin === '+input' && /\w|\./g.test(text[0]) && change.text[0].length === 1) {
      // flag = true

      this.store.editor.showHint(instance, {hint: window.CodeMirror.hint.sql}, true)
    }

    // if (flag && this.store.runStatusMessage.status === 'success') {
    //   this.store.runStatusMessage.status = 'error'
    // }
  }

  // 运行
  @action operationCode() {
    const code = this.store.editor.getValue()
    if (!code) {
      message.error('请输入运行代码')
    } else {
      this.store.showResult = true

      this.store.runSearch({
        tql: code,
      })
    }
  }

  @action stopOperation() {
    console.log(this.editor.getValue())
  }
  
  @action codeFormat() {
    const code = this.store.editor.getValue()
    if (!code) {
      message.error('请输入运行代码')
    } else {
      this.store.editor.setValue(sqlFormatter.format(code), {language: 'n1ql', indent: '    '})
    }
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
    } = this.store

    return (
      <div className="code-content" id="code-content">
        <Spin spinning={resultLoading}>
          <div style={{height: 'calc(100vh - 92px)'}}> 
            <div className="code-menu">
              <span className="code-menu-item mr16" onClick={() => this.operationCode()}>
                <img src={yunxing} alt="img" />
                <span>运行</span>
              </span>
              <span className="code-menu-item mr16" onClick={() => this.codeFormat()}>
                <img src={geshihua} alt="img" />
                <span>格式化</span>
              </span>
            </div>
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
                ref={t => this.codeArea = t}
                placeholder="code goes here..."
              >
                {
                  toJS(tqlDetail.source)
                }
              </textarea>
            </form>
          </div>
         
        </Spin>
    
        <SearchResult 
          log={toJS(log)}
          expend={showResult} 
          loading={resultLoading} 
          resultInfo={toJS(resultInfo)}
          handleExpend={handleExpend}
          onDraggableLogMouseDown={onDraggableLogMouseDown}
        />
      </div>
    )
  }
}
