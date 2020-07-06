/**
 * @description 数据查询
 */
import {Component} from 'react'
// import {observer} from 'mobx-react'
// import {action} from 'mobx'
import {Tabs} from 'antd'
import {projectProvider, searchProvider} from '../../component'
// import DataSearchInit from './init'
import Tql from './tql/tql'
import Visual from './visual/visual'

// import store from './store'

const {TabPane} = Tabs

// // @observer
// class DataSearch extends Component {
//   // constructor(props) {
//   //   super(props)
//   //   store.projectId = props.projectId
//   // }

//   render() {
//     // const {
//     //   isInit,
//     // } = store

//     const {
//       projectId,
//     } = this.props

//     return (
//       <div className="data-search">
//         <Tabs defaultActiveKey="1" type="card" className="bgf">
//           <TabPane tab="可视化方式" key="1">
//             <Visual projectId={projectId} />
//           </TabPane>
//           <TabPane tab="TQL方式" key="2">
//             <Tql projectId={projectId} />
//           </TabPane>
//         </Tabs>
//         {/* {
//           isInit ? (
//             <Tabs defaultActiveKey="1" type="card" className="bgf">
//               <TabPane tab="可视化方式" key="1">
//                 <Visual projectId={projectId} />
//               </TabPane>
//               <TabPane tab="TQL方式" key="2">
//                 <Tql projectId={projectId} />
//               </TabPane>
//             </Tabs>
//           ) : (
//             <DataSearchInit store={store} />
//           )
//         } */}
//       </div>
//     )
//   }
// }


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
