import {useEffect, useState, Fragment} from 'react'
import {Select, Button} from 'antd'
import io from './io'

const {Option} = Select

const Search = ({
  projectId,
  objList,
  searchChart,
}) => {
  const [objId, changeObjId] = useState()
  const [groupA, changeGroupA] = useState()
  const [groupB, changeGroupB] = useState()
  const [groupList, changeGroupList] = useState([])

  // 获取群体
  async function getGroup(id) {
    const res = await io.getGroup({
      projectId,
      objId: id,
    })
    changeGroupList(res)
    changeGroupA(undefined)
    changeGroupB(undefined)
  } 

  function selectObj(id) {
    getGroup(id)
    changeObjId(id)
  }

  function selectGroupA(id) {
    changeGroupA(id)
  }

  function selectGroupB(id) {
    changeGroupB(id)
  }

  function search() {
    searchChart(groupA, groupB, objId)
  }

  return (
    <div className="contrast-search">
      <span className="mr8">实体：</span>
      <Select
        showSearch
        placeholder="请选择"
        style={{width: 200}}
        onSelect={selectObj}
        optionFilterProp="children"
        className="mr16"
      >
        {
          objList.map(d => <Option value={d.objId}>{d.objName}</Option>)
        }
      </Select>
      <span className="mr8">分析群体A：</span>
      <Select
        showSearch
        value={groupA}
        placeholder="请选择"
        style={{width: 200}}
        onSelect={selectGroupA}
        optionFilterProp="children"
        className="mr16"
      >
        {
          groupList.map(d => <Option value={d.groupId} disabled={d.groupId === groupB}>{d.groupName}</Option>)
        }
      </Select>
      <span className="mr8">分析群体B：</span> 
      <Select
        showSearch
        value={groupB}
        placeholder="请选择"
        style={{width: 200}}
        onSelect={selectGroupB}
        optionFilterProp="children"
      >
        {
          groupList.map(d => <Option value={d.groupId} disabled={d.groupId === groupA}>{d.groupName}</Option>)
        }
      </Select>
      <Button 
        className="ml16"
        type="primary" 
        onClick={search}
        disabled={!groupA || !groupB}
      >
        查询
      </Button>
    </div>
  )
}

export default Search
