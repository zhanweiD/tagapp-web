/**
 * @description 我的查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button, Spin, Select, Input} from 'antd'
import {Card, NoData, projectProvider, DtGrid} from '../../component'
import {IconDel, IconEdit} from '../../icon-comp'
import ModalEdit from './modal'

import store from './store'

const {Option} = Select

@observer
class MySearch extends Component {
  componentWillMount() {
    store.getsearchList()
  }

  @action.bound selectType(searchType) {
    store.getsearchList({
      searchType,
    })
  }

  @action.bound searchName(e) {
    store.getsearchList({
      name: e.target.value,
    })
  }

  @action.bound edit() {
    store.visibleEdit = true
  }

  render() {
    const {cardList, loading} = store

    const noDataConfig = {
      text: '暂无查询数据',
      onClick: this.addSearch,
    }
    console.log(toJS(cardList))
    return (
      <div>
        <div className="content-header">我的查询</div>
        <div className="my-search">   
          <Spin spinning={loading}>
            <div className="my-search-header"> 
              <span className="mr8">查询类型</span>
              <Select
                showSearch
                style={{width: 200}}
                placeholder="选择查询类型"
                optionFilterProp="children"
                onChange={this.selectType}
                className="mr24"
                defaultValue=""
              >
                <Option value="">全部</Option>
                <Option value="1">可视化方式</Option>
                <Option value="2">TQL方式</Option>
              </Select>
              <span className="mr8">查询名称</span>
              <Input placeholder="请输入数据查询关键字" onChange={this.searchName} style={{width: 200}} />
            </div>
            {
              toJS(cardList).length ? (
                <div>
                  { 
                    cardList.map(d => (
                      <DtGrid row={3} fixedHeight={192}>
                        {
                          cardList.map(({
                            id,
                            name,
                            // cuser,
                            cdate,
                            used,
                            type,
                            descr,
                          }) => (
                            <Card 
                              className="card"
                              title={name}
                              labelList={[{
                                label: '查询类型',
                                value: type,
                              }, {
                                label: '创建时间',
                                value: moment(+cdate).format('YYYY-MM-DD HH-MM-SS'),
                              }]}
                              descr={descr}
                              // countList={[{
                              //   label: '标签数',
                              //   value: tagCount,
                              // }, {
                              //   label: 'API数',
                              //   value: apiCount,
                              // }]}
                              actions={[
                                <Button 
                                  type="link" // antd@Button 属性
                                  disabled={used}
                                  className="p0"
                                  onClick={() => this.edit()}
                                >
                                  <IconEdit size="14" className={used ? 'i-used' : ''} />
                                </Button>,
                                <Button 
                                  type="link" // antd@Button 属性
                                  disabled={used} 
                                  className="p0"
                                  onClick={() => this.handleDel(id)}
                                >
                                  <IconDel size="14" className={used ? 'i-used' : ''} />
                                </Button>,
                              ]}
                            />
                          )) 
                        }
                      </DtGrid>
                    ))
                  }
                </div>
              ) : (
                <NoData
                  isLoading={loading}
                  {...noDataConfig}
                />
              )
         
            }
            <ModalEdit store={store} />
          </Spin>
         
        </div>
      </div>
    )
  }
}

export default projectProvider(MySearch)
