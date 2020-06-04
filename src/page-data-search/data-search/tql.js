/**
 * @description 我的查询-TQL
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Button} from 'antd'
import TqlTree from './tql-tree'
import TqlCode from './tql-code'

import store from './store-tql'
import './tql.styl'

@observer
export default class Tql extends Component {
  componentWillMount() {
    store.getFunTree()
    store.getTagTree()
  }

  render() {
    return (
      <div className="tql">
        <div>
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
