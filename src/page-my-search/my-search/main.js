/**
 * @description 我的查询
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {DtGrid} from '@dtwave/uikit'
import {Button} from 'antd'
import {Card, NoData, projectProvider} from '../../component'
import {IconDel, IconEdit} from '../../icon-comp'

import store from './store'

@observer
class MySearch extends Component {
  addSearch = () => {
    window.location.href = `${window.__keeper.pathHrefPrefix || '/'}/data-search`
  }

  render() {
    const {cardList, loading} = store

    const noDataConfig = {
      btnText: '添加查询',
      onClick: this.addSearch,
    }
    
    return (
      <div>
        <div className="content-header">我的查询</div>
        <div>   
          {
            cardList.length ? (
              <div>
                { 
                  cardList.map(d => (
                    <DtGrid row={3} fixedHeight={192}>
                      {
                        cardList.map(({
                          id,
                          name,
                          cuser,
                          cdate,
                          used,
                          tagCount,
                          apiCount,
                          descr,
                        }, d) => (
                          <Card 
                            className="card"
                            title={name}
                            // eslint-disable-next-line no-underscore-dangle
                            // link={`${window.__keeper.pathHrefPrefix}/scene/${id}`}
                            // tag={[<Tag status={used ? 'process' : 'wait'} text={used ? '使用中' : '未使用'} className="mr8" />]}
                            labelList={[{
                              label: '创建者',
                              value: cuser,
                            }, {
                              label: '创建时间',
                              value: moment(+cdate).format('YYYY-MM-DD HH-MM-SS'),
                            }]}
                            descr={descr}
                            countList={[{
                              label: '标签数',
                              value: tagCount,
                            }, {
                              label: 'API数',
                              value: apiCount,
                            }]}
                            actions={[
                              <Button 
                                type="link" // antd@Button 属性
                                disabled={used}
                                className="p0"
                                onClick={() => this.handleModalVisible('edit', list[d])}
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
        </div>
      </div>
    )
  }
}

export default projectProvider(MySearch)
