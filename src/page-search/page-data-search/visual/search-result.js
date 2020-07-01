import React, {useState} from 'react'
import {Table, Spin} from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
// import xiazai from '../../../icon/geshihua.svg'

const SearchResult = ({loading, expend, resultInfo}) => {
  const [isExpend, changeExpend] = useState(0) 
 
  const getColumns = col => {
    if (col && col.length) {
      return col.map(d => ({
        title: d,
        dataIndex: d,
        key: d,
      }))
    }
    return []
  }

  if (expend && isExpend === 0) {
    changeExpend(true)
  }

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
              ? <img src={icondown} alt="img" onClick={() => changeExpend(false)} />
              : <img src={iconup} alt="img" onClick={() => changeExpend(true)} />
          }
        </div>
      </div>
      <div className="p16" style={{display: isExpend ? 'block' : 'none'}}>
        <Spin spinning={loading}>
          <Table 
            columns={getColumns(resultInfo.title)}
            size="small" 
            dataSource={resultInfo.data} 
            pagination={{
              total: resultInfo.totalSize,
              pageSize: 5,
              showTotal: () => `合计${resultInfo.totalSize}条记录`,
            }}
          />
        </Spin>
      </div>
    </div>
  )
}
export default SearchResult