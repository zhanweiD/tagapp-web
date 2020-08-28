/**
 * @description 数据查询
 */
import {Tabs} from 'antd'
import {projectProvider, searchProvider, Authority} from '../../component'
import Tql from './tql/tql'
import Visual from './visual/visual'
import {codeInProduct} from '../../common/util'


const {TabPane} = Tabs

const DataSearch = ({projectId}) => {
  return (
    <div className="data-search">
      <Tabs defaultActiveKey="1" type="card" className="bgf">
        <TabPane tab="可视化方式" key="1">
          <Visual projectId={projectId} />
        </TabPane>
        {
          codeInProduct("tag_app:tql_search[r]") ? <TabPane tab="TQL方式" key="2">
            <Tql projectId={projectId} />
          </TabPane> : null
        }
  
      </Tabs>
    </div>
  ) 
}

export default projectProvider(searchProvider(DataSearch))
