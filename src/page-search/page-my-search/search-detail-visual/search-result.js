import React, {useState} from 'react'
import {Table, Spin} from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
import xiazai from '../../../icon/xiazai.svg'

const SearchResult = ({loading, expend, resultInfo, handleExpend, onDraggableLogMouseDown, downloadResult, resultKey}) => {
  const [isExpend, changeExpend] = useState(false) 
  const resultInfoSize = resultInfo.totalSize

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
      id="search-result"
    >
      {
        !isExpend ? null : (
          <div className="drag-bottom" onMouseDown={onDraggableLogMouseDown} />
        )
      }
      <div className="search-result-header">
        <div className="result-header-text">查询结果</div>
        <div className="result-header-icon">
          {
            isExpend
              ? <img src={icondown} alt="img" onClick={() => handleChangeExpend(false)} />
              : <img src={iconup} alt="img" onClick={() => handleChangeExpend(true)} />
          }
        </div>
      </div>
      <div className="p16 pb48" style={{display: isExpend ? 'block' : 'none', overflowY: 'auto', height: '100%', paddingBottom: '48px'}}>
        <Spin spinning={loading}>
          {resultInfo.data && resultInfo.data.length ? (
            <div className="mb8">
              <span>
共查出
                {resultInfoSize}
条记录
              </span>
              <img src={xiazai} style={{width: '14px', cursor: 'pointer'}} className="ml8" onClick={downloadResult} />
            </div>
          ) : null}
          <Table 
            key={resultKey}
            columns={getColumns(resultInfo.title)}
            size="small" 
            dataSource={resultInfo.data && resultInfo.data.slice()} 
            pagination={{
              total: resultInfoSize,
              defaultCurrent: 1,
              // pageSize: 5,
              showTotal: () => `合计${resultInfoSize}条记录`,
            }}
          />
        </Spin>
      </div>
    </div>
  )
}
export default SearchResult
