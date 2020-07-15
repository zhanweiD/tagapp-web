/**
 * @description 数据查询
 */
import {Tabs} from 'antd'
import {projectProvider, searchProvider} from '../../component'
import Tql from './tql/tql'
import Visual from './visual/visual'


const {TabPane} = Tabs

const DataSearch = ({projectId}) => {
  return (
    <div className="data-search">
      <Tabs defaultActiveKey="1" type="card" className="bgf">
        <TabPane tab="可视化方式" key="1">
          <Visual projectId={projectId} />
        </TabPane>
        <TabPane tab="TQL方式" key="2">
          <Tql projectId={projectId} />
        </TabPane>
      </Tabs>
    </div>
  ) 
}

export default projectProvider(searchProvider(DataSearch))
