import React, {useState} from 'react'
import {Table, Spin, Tabs, Empty, Alert} from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
import xiazai from '../../../icon/xiazai.svg'

const {TabPane} = Tabs

const SearchResult = ({loading = false, expend, resultInfo = {}, log, handleExpend, onDraggableLogMouseDown, isRuned, downloadResult, resultKey}) => {
  const [isExpend, changeExpend] = useState(false) 
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
  
  if (expend && !isExpend) {
    changeExpend(true)
  }

  function handleChangeExpend(flag) {
    changeExpend(flag)
    handleExpend(flag)
  }

  return (
    <div
      className={cls({
        'search-result': true,
        'hide-result': !isExpend,
      })}
      id="search-result-tql"
    >
      {
        !isExpend ? null : (
          <div className="drag-bottom" onMouseDown={onDraggableLogMouseDown} />
        )
      }
      <div className="search-result-header">
        <Tabs activeKey={tabKey} onChange={key => changeTabKey(key)} type="card">
          <TabPane tab="查询日志" key="1" />
          <TabPane tab="查询结果" key="2" />
        </Tabs>
        <div className="result-header-icon">
          {
            isExpend
              ? <img src={icondown} alt="img" onClick={() => handleChangeExpend(false)} />
              : <img src={iconup} alt="img" onClick={() => handleChangeExpend(true)} />
          }
        </div>
      </div>
    
      <div className="p16" style={{display: isExpend ? 'block' : 'none'}}>
        <Spin spinning={loading}>
          {
            tabKey === '1' ? (
              <div className="log">
                {(() => {
                  if (isRuned) {
                    if (log) {
                      return <div>
                        <Alert message="查询失败" type="error" showIcon />
                        <div>{log}</div>
                      </div>
                    } else {
                      return <Alert message="查询成功，请查看查询结果" type="success" showIcon />
                    }
                  } else {
                    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  }
                })()}
              </div>
            ) : (
                <div className="result-table">
                  {
                    getColumns(resultInfo.title).length ? (
                      <div>
                        {resultInfo.data && resultInfo.data.length ? <div className="mb8">
                          <span>共查出{resultInfo.totalSize}条记录</span>
                          <img src={xiazai} style={{ width: '14px', cursor: 'pointer' }} className="ml8" onClick={downloadResult} />
                        </div> : null}
                        <Table
                          key={resultKey}
                          columns={getColumns(resultInfo.title)}
                          size="small"
                          dataSource={resultInfo.data && resultInfo.data.slice()}
                          pagination={{
                            total: resultInfo.totalSize,
                            // pageSize: 5,
                            showTotal: () => `合计${resultInfo.totalSize}条记录`,
                          }}
                        />
                      </div>
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
