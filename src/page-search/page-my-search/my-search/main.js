/**
 * @description 我的查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Button, Spin, Select, Input, Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {Card, NoData, projectProvider, DtGrid} from '../../../component'
import {IconDel, IconEdit} from '../../../icon-comp'
import ModalEdit from './modal'

import store from './store'

const {Option} = Select
const {confirm} = Modal

@observer
class MySearch extends Component {
  constructor(props) {
    super(props)
    store.projectId = props.projectId
  }
  
  searchType
  name

  componentWillMount() {
    store.getsearchList()
  }

  @action.bound selectType(searchType) {
    this.searchType = searchType
    store.getsearchList({
      searchType,
      name: this.name,
    })
  }

  @action.bound searchName(e) {
    this.name = e.target.value
    store.getsearchList({
      name: e.target.value,
      searchType: this.searchType,
    })
  }

  @action.bound edit(data) {
    store.detail = data
    store.visibleEdit = true
  }

  @action.bound del(id) {
    const t = this
    confirm({
      title: '确认删除 ？',
      icon: <ExclamationCircleOutlined />,
      content: '数据查询被删除后不可恢复，确定删除？',
      onOk: () => {
        store.del({id}, () => {
          t.refresh()
        })
      },
      onCancel: () => {},
    })
  }

  @action.bound refresh() {
    store.getsearchList({
      name: this.name,
      searchType: this.searchType,
    })
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
                
                  <DtGrid row={3} fixedHeight={192}>
                    {
                      cardList.map(({
                        id,
                        name,
                        ctime,
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
                            value: ctime,
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
                              onClick={() => this.edit({
                                id,
                                name,
                                used,
                                descr,
                              })}
                            >
                              <IconEdit size="14" className={used ? 'i-used' : ''} />
                            </Button>,
                            <Button 
                              type="link" // antd@Button 属性
                              disabled={used} 
                              className="p0"
                              onClick={() => this.del(id)}
                            >
                              <IconDel size="14" className={used ? 'i-used' : ''} />
                            </Button>,
                          ]}
                        />
                      )) 
                    }
                  </DtGrid>

                </div>
              ) : (
                <NoData
                  isLoading={loading}
                  {...noDataConfig}
                />
              )
         
            }
            <ModalEdit store={store} refresh={this.refresh} />
          </Spin>
         
        </div>
      </div>
    )
  }
}

export default projectProvider(MySearch)