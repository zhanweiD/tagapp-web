/**
 * @description 数据查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Tabs} from 'antd'
import {projectProvider} from '../../component'
import DataSearchInit from './init'
import Tql from './tql/tql'
import Visual from './visual/visual'

import store from './store'

const {TabPane} = Tabs

@observer
class DataSearch extends Component {
  constructor(props) {
    super(props)
    const {spaceInfo} = window
    store.projectId = spaceInfo && spaceInfo.projectId
  }

  render() {
    const {
      isInit,
    } = store

    return (
      <div className="data-search">
        {
          isInit ? (
            <Tabs defaultActiveKey="1" type="card" className="bgf">
              <TabPane tab="可视化方式" key="1">
                <Visual />
              </TabPane>
              <TabPane tab="TQL方式" key="2">
                <Tql />
              </TabPane>
            </Tabs>
          ) : (
            <DataSearchInit store={store} />
          )
        }
      </div>
    )
  }
}

export default projectProvider(DataSearch)
