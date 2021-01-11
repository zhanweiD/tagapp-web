import intl from 'react-intl-universal'
import React, { useState } from 'react'
import { Table, Spin, Tabs, Empty, Alert } from 'antd'
import cls from 'classnames'

import iconup from '../../../icon/xiangshangzhankai.svg'
import icondown from '../../../icon/xiangxiazhankai.svg'
import xiazai from '../../../icon/xiazai.svg'

const { TabPane } = Tabs

const SearchResult = ({
  loading = false,
  expend,
  resultInfo = {},
  log,
  handleExpend,
  onDraggableLogMouseDown,
  isRuned,
  downloadResult,
  resultKey,
}) => {
  const [isExpend, changeExpend] = useState(false)
  const [tabKey, changeTabKey] = useState('1')
  const resultInfoTotalSize = resultInfo.totalSize
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
      {!isExpend ? null : (
        <div className="drag-bottom" onMouseDown={onDraggableLogMouseDown} />
      )}

      <div className="search-result-header">
        <Tabs
          activeKey={tabKey}
          onChange={key => changeTabKey(key)}
          type="card"
        >
          <TabPane
            tab={intl
              .get(
                'ide.src.page-search.page-data-search.tql.search-result.aic6ux4hd6'
              )
              .d('查询日志')}
            key="1"
          />
          <TabPane
            tab={intl
              .get(
                'ide.src.page-search.page-data-search.tql.search-result.xb4qpmoeee8'
              )
              .d('查询结果')}
            key="2"
          />
        </Tabs>
        <div className="result-header-icon">
          {isExpend ? (
            <img
              src={icondown}
              alt="img"
              onClick={() => handleChangeExpend(false)}
            />
          ) : (
            <img
              src={iconup}
              alt="img"
              onClick={() => handleChangeExpend(true)}
            />
          )}
        </div>
      </div>

      <div className="p16" style={{ display: isExpend ? 'block' : 'none' }}>
        <Spin spinning={loading}>
          {tabKey === '1' ? (
            <div className="log">
              {(() => {
                if (isRuned) {
                  if (log) {
                    return (
                      <div>
                        <Alert
                          message={intl
                            .get(
                              'ide.src.page-search.page-data-search.tql.search-result.t51x42wsf3n'
                            )
                            .d('查询失败')}
                          type="error"
                          showIcon
                        />
                        <div>{log}</div>
                      </div>
                    )
                  } else {
                    return (
                      <Alert
                        message={intl
                          .get(
                            'ide.src.page-search.page-data-search.tql.search-result.uksk2195jei'
                          )
                          .d('查询成功，请查看查询结果')}
                        type="success"
                        showIcon
                      />
                    )
                  }
                } else {
                  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
              })()}
            </div>
          ) : (
            <div className="result-table">
              {getColumns(resultInfo.title).length ? (
                <div>
                  {resultInfo.data && resultInfo.data.length ? (
                    <div className="mb8">
                      <span>
                        {intl
                          .get(
                            'ide.src.page-search.page-data-search.tql.search-result.uizpznbnx79'
                          )
                          .d('共查出')}
                        {resultInfoTotalSize}
                        {intl
                          .get(
                            'ide.src.page-search.page-data-search.tql.search-result.apy6m2izn3o'
                          )
                          .d('条记录')}
                      </span>
                      <img
                        src={xiazai}
                        style={{ width: '14px', cursor: 'pointer' }}
                        className="ml8"
                        onClick={downloadResult}
                      />
                    </div>
                  ) : null}
                  <Table
                    key={resultKey}
                    columns={getColumns(resultInfo.title)}
                    size="small"
                    dataSource={resultInfo.data && resultInfo.data.slice()}
                    pagination={{
                      total: resultInfo.totalSize,
                      // pageSize: 5,
                      showTotal: () =>
                        intl
                          .get(
                            'ide.src.page-search.page-data-search.tql.search-result.a0ti6na3h2g',
                            { resultInfoTotalSize: resultInfoTotalSize }
                          )
                          .d('合计{resultInfoTotalSize}条记录'),
                    }}
                  />
                </div>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          )}
        </Spin>
      </div>
    </div>
  )
}
export default SearchResult
