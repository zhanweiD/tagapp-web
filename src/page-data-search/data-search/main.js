/**
 * @description 数据查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Tabs} from 'antd'
import {projectProvider} from '../../component'
import DataSearchInit from './init'
import Tql from './tql'

import store from './store'

const {TabPane} = Tabs

@observer
class MySearch extends Component {
  componentWillMount() {

  }

  render() {
    const {
      isInit,
    } = store

    return (
      <div>
        {
          isInit ? (
            <Tabs defaultActiveKey="1" className="comp-tab">
              <TabPane tab="可视化方式" key="1">
                <div className="bgf">
                  123
                </div>
              </TabPane>
              <TabPane tab="TQL方式" key="2">
                <div className="bgf">
                  <Tql />
                </div>
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

export default projectProvider(MySearch)
