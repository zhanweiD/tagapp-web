import { Anchor, Table } from 'antd'
const {Link} = Anchor

const Explain = () => {
  function onClick(e, link) {
    e.preventDefault()
    if (link.href) {
      // 找到锚点
      let anchorElement = document.getElementById(link.href.substr(1))
      if(anchorElement) {
        anchorElement.scrollIntoView()
      }
    }
  }
  return (
    <div className="FBH group-explain">
      <Anchor className="anchor" onClick={onClick}>
        <Link href="#rule-config" title="标签规则设置">
          <Link href="#rule-config-contrast" title="对比项" />
          <Link href="#rule-config-action" title="操作符" />
          <Link href="#rule-config-value" title="对比值" />
        </Link>
        <Link href="#set-config" title="设置筛选条件">
          <Link href="#set-config-contrast" title="对比项" />
          <Link href="#set-config-action" title="操作符" />
          <Link href="#set-config-value" title="对比值" />
        </Link>
        <Link href="#case" title="案例">
          <Link href="#case-object" title="对象object" />
          <Link href="#case-object-tag" title="对象下的标签tag" />
          <Link href="#case-object-table" title="对象下绑定的表" />
          <Link href="#case-object-group" title="群体圈选" />
        </Link>
      </Anchor>
      <div className="anchor-content">
        <div>
          <h2 id="rule-config">标签规则设置</h2>
          <h3 id="rule-config-contrast">对比项</h3>
          <p>下面的对比项类型可以在“标签规则”设置中使用：</p>
          <Table columns={[{
            title: '对比项类型',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '标签值',
              desrc: '标签值（员工.地址），表示取“员工.地址”这个标签的数据'
            }, {
              type: '字符串截取',
              desrc: '字符串截取（员工.地址，1，2），表示从“员工.地址”这个标签的数据，从第一个字符开始提取两个字符'
            }, {
              type: '绝对值',
              desrc: '绝对值(员工.积分)，表示取“员工.积分”这个标签的数据的绝对值'
            }, {
              type: '年份',
              desrc: '返回日期或时间表达式的年份部分'
            }, {
              type: '月份',
              desrc: '返回日期或时间表达式的月份部分'
            }, {
              type: '日',
              desrc: '返回日期或时间表达式的日期部分'
            }, {
              type: '时间间隔',
              desrc: '返回两个日期之间的的天数'
            }, {
              type: '距离今天',
              desrc: '返回日期距离今天的天数'
            }, {
              type: '时间转换',
              desrc: '将文本型的转换成时间型的'
            }, {
              type: '总记录数',
              desrc: '返回行数'
            }, {
              type: '标签值个数',
              desrc: '返回标签值的取值种数'
            }, {
              type: '求和',
              desrc: '返回总和'
            }, {
              type: '最大值',
              desrc: '返回最大值'
            }, {
              type: '最小值',
              desrc: '返回最小值'
            }, {
              type: '均值',
              desrc: '返回平均值'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h3 id="rule-config-action">操作符</h3>
          <p>下面的操作符可以在“标签规则”设置中使用：</p>
          <Table columns={[{
            title: '操作符',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '等于',
              desrc: '取出对比项等于对比值的记录'
            }, {
              type: '大于',
              desrc: '取出对比项大于对比值的记录'
            }, {
              type: '大于等于',
              desrc: '取出对比项大于等于对比值的记录'
            }, {
              type: '小于',
              desrc: '取出对比项小于对比值的记录'
            }, {
              type: '小于等于',
              desrc: '取出对比项小于等于对比值的记录'
            }, {
              type: '区间',
              desrc: '取出对比项在某个区间之间的记录'
            }, {
              type: '不等于',
              desrc: '取出对比项不等于对比值的记录'
            }, {
              type: '在集合',
              desrc: '取出对比项目在对比值范围内的记录'
            }, {
              type: '不在集合',
              desrc: '取出对比项目不在对比值范围内的记录'
            }, {
              type: '为空',
              desrc: '取出对比项中的数据为空的记录，无对比值'
            }, {
              type: '不为空',
              desrc: '取出对比项中的数据不为空的记录，无对比值'
            }, {
              type: '包含',
              desrc: '取出对比项中的数据包含了某个“字符串”的记录'
            }, {
              type: '不包含',
              desrc: '取出对比项中的数据不包含了某个“字符串”的记录'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h3 id="rule-config-value">对比值</h3>
          <p>下面的对比值类型可以在“标签规则”设置中使用：</p>
          <Table columns={[{
            title: '对比值类型',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '固定值',
              desrc: '等于、不等于、大于、大于等于、小于、小于等于、区间、包含、不包含，支持对比值类型为固定值'
            }, {
              type: '标签值',
              desrc: '等于、不等于、大于、大于等于、小于、小于等于，支持对比值类型为固定值'
            }, {
              type: '多值',
              desrc: '在集合、不在集合，支持对比值类型为多值'
            }, {
              type: '小于',
              desrc: '取出对比项小于对比值的记录'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h2 id="set-config">设置筛选条件</h2>
          <h3 id="set-config-contrast">对比项</h3>
          <p>下面的对比项类型可以在“设置筛选”设置中使用：</p>
          <Table columns={[{
            title: '对比值类型',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '标签值',
              desrc: '标签值（员工.地址），表示取“员工.地址”这个标签的数据'
            }, {
              type: '字符串截取',
              desrc: '字符串截取（员工.地址，1，2），表示从“员工.地址”这个标签的数据，从第一个字符开始提取两个字符'
            }, {
              type: '绝对值',
              desrc: '绝对值(员工.积分)，表示取“员工.积分”这个标签的数据的绝对值'
            }, {
              type: '年份',
              desrc: '返回日期或时间表达式的年份部分'
            }, {
              type: '月份',
              desrc: '返回日期或时间表达式的月份部分'
            }, {
              type: '日',
              desrc: '返回日期或时间表达式的日期部分'
            }, {
              type: '时间间隔',
              desrc: '返回两个日期之间的的天数'
            }, {
              type: '距离今天',
              desrc: '返回日期距离今天的天数'
            }, {
              type: '时间转换',
              desrc: '将文本型的转换成时间型的'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h3 id="set-config-action">操作符</h3>
          <p>下面的操作符可以在“标签规则”设置中使用：</p>
          <Table columns={[{
            title: '操作符',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '等于',
              desrc: '取出对比项等于对比值的记录'
            }, {
              type: '大于',
              desrc: '取出对比项大于对比值的记录'
            }, {
              type: '大于等于',
              desrc: '取出对比项大于等于对比值的记录'
            }, {
              type: '小于',
              desrc: '取出对比项小于对比值的记录'
            }, {
              type: '小于等于',
              desrc: '取出对比项小于等于对比值的记录'
            }, {
              type: '区间',
              desrc: '取出对比项在某个区间之间的记录'
            }, {
              type: '不等于',
              desrc: '取出对比项不等于对比值的记录'
            }, {
              type: '在集合',
              desrc: '取出对比项目在对比值范围内的记录'
            }, {
              type: '不在集合',
              desrc: '取出对比项目不在对比值范围内的记录'
            }, {
              type: '为空',
              desrc: '取出对比项中的数据为空的记录，无对比值'
            }, {
              type: '不为空',
              desrc: '取出对比项中的数据不为空的记录，无对比值'
            }, {
              type: '包含',
              desrc: '取出对比项中的数据包含了某个“字符串”的记录'
            }, {
              type: '不包含',
              desrc: '取出对比项中的数据不包含了某个“字符串”的记录'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h3 id="set-config-value">对比值</h3>
          <p>下面的对比值类型可以在“标签规则”设置中使用：</p>
          <Table columns={[{
            title: '对比值类型',
            dataIndex: 'type',
          }, {
            title: '描述',
            dataIndex: 'desrc',
          }]}
            dataSource={[{
              type: '固定值',
              desrc: '等于、不等于、大于、大于等于、小于、小于等于、区间、包含、不包含，支持对比值类型为固定值'
            }, {
              type: '标签值',
              desrc: '等于、不等于、大于、大于等于、小于、小于等于，支持对比值类型为固定值'
            }, {
              type: '多值',
              desrc: '在集合、不在集合，支持对比值类型为多值'
            }]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />
          <h2 id="case">案例</h2>
          <p>需求：某电商需要找出最近30天浏览过店铺，但是最近7没在店铺里消费过的女性会员。</p>
          <p>在这里我们有如下对象和标签信息：</p>
          <h3 id="case-object">对象object</h3>
          <ul>
            <li>实体对象：会员（member）、浏览记录（Browse）、购买记录（buyer）</li>
            <li>简单关系对象：会员产生浏览记录（member_Browse）、会员产生购买记录（member_buyer）</li>
          </ul>
          <h3 id="case-object-tag">对象下的标签tag</h3>
          <ul>
            <li>会员（member）：会员号（id_number）、手机号（phone）、姓名（name）、性别（sex）</li>
            <li>浏览记录（Browse）：浏览id（Browse_id）、浏览时间（Browse_time）</li>
            <li>购买记录（buyer）：购买id（buyer_id）、购买时间（buyer_time）</li>
            <li>浏览记录（Browse）：浏览id（Browse_id）、浏览时间（Browse_time）</li>
            <li>会员产生浏览记录（member_Browse）：浏览id（Browse_id）、会员号（id_number）</li>
            <li>会员产生购买记录（member_buyer）：购买id（buyer_id）、会员号（id_number）</li>
          </ul>
          <h3 id="case-object-table">对象下绑定的表</h3>
          <ul>
            <li>会员（member）：member</li>
            <li>浏览记录（Browse）：Browse_record</li>
            <li>购买记录（buyer）：buyer_record</li>
            <li>会员产生浏览记录（member_Browse）：Browse_record</li>
            <li>会员产生购买记录（member_buyer）：buyer_record</li>
          </ul>
          <p>分析：在做人群圈选设置的时候，无需关心底层的表，只需关注对象与标签即可</p>
        </div>
      </div>
    </div>
  )
}

export default Explain