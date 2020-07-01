import React, {useState} from 'react'
import {Table, Spin, Tabs, Empty} from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
// import xiazai from '../../../icon/geshihua.svg'

const {TabPane} = Tabs

const SearchResult = ({loading = false, expend, resultInfo = {}, log}) => {
  const [isExpend, changeExpend] = useState(0) 
  const [tabKey, changeTabKey] = useState('1') 
 
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
        <Tabs activeKey={tabKey} onChange={key => changeTabKey(key)} type="card">
          <TabPane tab="查询日志" key="1" />
          <TabPane tab="查询结果" key="2" />
        </Tabs>
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
          {
            tabKey === '1' ? (
              <div className="log">
                {
                  log || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
              </div>
            ) : (
              <div className="result-table">
                {
                  getColumns(resultInfo.title).length ? (
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
                  ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
              </div>
             
            )
          }
        </Spin>
      </div>
    </div>
  )
}
export default SearchResult