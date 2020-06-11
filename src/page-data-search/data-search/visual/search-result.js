import React, {useState} from 'react'

import {Table, Tabs, Button} from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
// import xiazai from '../../../icon/geshihua.svg'


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

const SearchResult = () => {
  const [isExpend, changeExpend] = useState(false) 

  return (
    <div className={cls({
      'search-result': true,
      'hide-result': !isExpend,
    })}
    >
      <div className="search-result-header">
        <div className="result-header-text">查询结果</div>
        <div className="result-header-icon">
          {
            isExpend 
              ? <img src={icondown} alt="img" onClick={() => changeExpend(!isExpend)} />
              : <img src={iconup} alt="img" onClick={() => changeExpend(!isExpend)} />
          }
        </div>
      </div>
      <div className="p16" style={{display: isExpend ? 'block' : 'none'}}>
        <Table columns={columns} size="small" dataSource={data} />
      </div>
    </div>
  )
}
export default SearchResult
