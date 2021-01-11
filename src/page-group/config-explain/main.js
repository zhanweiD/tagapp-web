import intl from 'react-intl-universal'
import { Anchor, Table } from 'antd'
const { Link } = Anchor

const Explain = () => {
  function onClick(e, link) {
    e.preventDefault()
    if (link.href) {
      // 找到锚点
      let anchorElement = document.getElementById(link.href.substr(1))
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    }
  }
  return (
    <div className="FBH group-explain">
      <Anchor className="anchor" onClick={onClick}>
        <Link
          href="#rule-config"
          title={intl
            .get('ide.src.page-group.config-explain.main.yombsccze4')
            .d('标签规则设置')}
        >
          <Link
            href="#rule-config-contrast"
            title={intl
              .get('ide.src.page-group.config-explain.main.fk8kxm365b')
              .d('对比项')}
          />
          <Link
            href="#rule-config-action"
            title={intl
              .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
              .d('操作符')}
          />
          <Link
            href="#rule-config-value"
            title={intl
              .get('ide.src.page-group.config-explain.main.2our1jhb704')
              .d('对比值')}
          />
        </Link>
        <Link
          href="#set-config"
          title={intl
            .get('ide.src.page-group.config-explain.main.mlanc59gq8')
            .d('设置筛选条件')}
        >
          <Link
            href="#set-config-contrast"
            title={intl
              .get('ide.src.page-group.config-explain.main.fk8kxm365b')
              .d('对比项')}
          />
          <Link
            href="#set-config-action"
            title={intl
              .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
              .d('操作符')}
          />
          <Link
            href="#set-config-value"
            title={intl
              .get('ide.src.page-group.config-explain.main.2our1jhb704')
              .d('对比值')}
          />
        </Link>
        <Link
          href="#case"
          title={intl
            .get('ide.src.page-group.config-explain.main.b3o9xxxiinr')
            .d('案例')}
        >
          <Link
            href="#case-object"
            title={intl
              .get('ide.src.page-group.config-explain.main.6xxk0fqc88')
              .d('对象object')}
          />
          <Link
            href="#case-object-tag"
            title={intl
              .get('ide.src.page-group.config-explain.main.dsddzfbrptq')
              .d('对象下的标签tag')}
          />
          <Link
            href="#case-object-table"
            title={intl
              .get('ide.src.page-group.config-explain.main.5bsh8lztf7y')
              .d('对象下绑定的表')}
          />
          <Link
            href="#case-object-group"
            title={intl
              .get('ide.src.page-group.config-explain.main.pbv2ab7ylc')
              .d('群体圈选')}
          />
        </Link>
      </Anchor>
      <div className="anchor-content">
        <div>
          <h2 id="rule-config">
            {intl
              .get('ide.src.page-group.config-explain.main.yombsccze4')
              .d('标签规则设置')}
          </h2>
          <h3 id="rule-config-contrast">
            {intl
              .get('ide.src.page-group.config-explain.main.fk8kxm365b')
              .d('对比项')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.zgpuvubzra')
              .d('下面的对比项类型可以在“标签规则”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.lyix47mls1k')
                  .d('对比项类型'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
                  .d('标签值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zvfnczaqupd')
                  .d('标签值（员工.地址），表示取“员工.地址”这个标签的数据'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.29y1mtqigwk')
                  .d('字符串截取'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.2uw97aavuv2')
                  .d(
                    '字符串截取（员工.地址，1，2），表示从“员工.地址”这个标签的数据，从第一个字符开始提取两个字符'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.7665zxf2f68')
                  .d('绝对值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.9l4x7kyg5u')
                  .d(
                    '绝对值(员工.积分)，表示取“员工.积分”这个标签的数据的绝对值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.hri3swiwnqe')
                  .d('年份'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.jbwupkpdsz')
                  .d('返回日期或时间表达式的年份部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.dem16wzhwpk')
                  .d('月份'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.72ncypnr81e')
                  .d('返回日期或时间表达式的月份部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.js5vxb7p77p')
                  .d('日'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.mf4jxsabaip')
                  .d('返回日期或时间表达式的日期部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.vfahb9alnul')
                  .d('时间间隔'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.hhf7ahugpep')
                  .d('返回两个日期之间的的天数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.qwuovtsktoh')
                  .d('距离今天'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.g78jtbcwsu6')
                  .d('返回日期距离今天的天数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.v5iw5fg1bk')
                  .d('时间转换'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.sk414nncifh')
                  .d('将文本型的转换成时间型的'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.xf0gsfep3m')
                  .d('总记录数'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.irivm4174ej')
                  .d('返回行数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.77cdij7d05q')
                  .d('标签值个数'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.m224qcu9brq')
                  .d('返回标签值的取值种数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.tnkpwzg3lsq')
                  .d('求和'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.gq6o3ewiked')
                  .d('返回总和'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.ieuuxsnlv1')
                  .d('最大值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.2c3qkzghyca')
                  .d('返回最大值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.mq3iampws3')
                  .d('最小值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.ljpmkv2cja9')
                  .d('返回最小值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.n4jcaw3k5x')
                  .d('均值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.997kcyo1ol5')
                  .d('返回平均值'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h3 id="rule-config-action">
            {intl
              .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
              .d('操作符')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.udrcrc7ni57')
              .d('下面的操作符可以在“标签规则”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
                  .d('操作符'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.util.r9q9unmjuss')
                  .d('等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zq791r1yusc')
                  .d('取出对比项等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.me4pul68n1')
                  .d('大于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.bb7pskysa4u')
                  .d('取出对比项大于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.zix85xqi6e')
                  .d('大于等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.79g501x4wdj')
                  .d('取出对比项大于等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.3rf6n7at7r5')
                  .d('小于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.knqdh13yjqh')
                  .d('取出对比项小于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.o1tendir57k')
                  .d('小于等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.437umpc74gy')
                  .d('取出对比项小于等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.s7em4pawimq')
                  .d('区间'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.bb36yh8vw99')
                  .d('取出对比项在某个区间之间的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.52rj9p9vsup')
                  .d('不等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.mf3oq6foe5o')
                  .d('取出对比项不等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.0dt0hdpf8urs')
                  .d('在集合'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.jren3hlu4ci')
                  .d('取出对比项目在对比值范围内的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.objpn1ccps')
                  .d('不在集合'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.f52a6zd1kee')
                  .d('取出对比项目不在对比值范围内的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.vbstk3d9yb')
                  .d('为空'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zvn3vyfns2c')
                  .d('取出对比项中的数据为空的记录，无对比值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.bqazs9ptwcj')
                  .d('不为空'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.8djaa5ea6xg')
                  .d('取出对比项中的数据不为空的记录，无对比值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.1y6s2pl3tcy')
                  .d('包含'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.6u259zvyn4')
                  .d('取出对比项中的数据包含了某个“字符串”的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.ba6a02t44ah')
                  .d('不包含'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.b3049qv5as')
                  .d('取出对比项中的数据不包含了某个“字符串”的记录'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h3 id="rule-config-value">
            {intl
              .get('ide.src.page-group.config-explain.main.2our1jhb704')
              .d('对比值')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.nsaop2c0bn9')
              .d('下面的对比值类型可以在“标签规则”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.abuj5tm9zo8')
                  .d('对比值类型'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.gzi5ubzdaov')
                  .d('固定值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.5m107cjylu3')
                  .d(
                    '等于、不等于、大于、大于等于、小于、小于等于、区间、包含、不包含，支持对比值类型为固定值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
                  .d('标签值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.fewasni88vi')
                  .d(
                    '等于、不等于、大于、大于等于、小于、小于等于，支持对比值类型为固定值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.1yrkw7rx31o')
                  .d('多值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.vxyyg4f9ja')
                  .d('在集合、不在集合，支持对比值类型为多值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.3rf6n7at7r5')
                  .d('小于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.knqdh13yjqh')
                  .d('取出对比项小于对比值的记录'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h2 id="set-config">
            {intl
              .get('ide.src.page-group.config-explain.main.mlanc59gq8')
              .d('设置筛选条件')}
          </h2>
          <h3 id="set-config-contrast">
            {intl
              .get('ide.src.page-group.config-explain.main.fk8kxm365b')
              .d('对比项')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.q5ww4qjmhkk')
              .d('下面的对比项类型可以在“设置筛选”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.abuj5tm9zo8')
                  .d('对比值类型'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
                  .d('标签值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zvfnczaqupd')
                  .d('标签值（员工.地址），表示取“员工.地址”这个标签的数据'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.29y1mtqigwk')
                  .d('字符串截取'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.2uw97aavuv2')
                  .d(
                    '字符串截取（员工.地址，1，2），表示从“员工.地址”这个标签的数据，从第一个字符开始提取两个字符'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.7665zxf2f68')
                  .d('绝对值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.9l4x7kyg5u')
                  .d(
                    '绝对值(员工.积分)，表示取“员工.积分”这个标签的数据的绝对值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.hri3swiwnqe')
                  .d('年份'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.jbwupkpdsz')
                  .d('返回日期或时间表达式的年份部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.dem16wzhwpk')
                  .d('月份'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.72ncypnr81e')
                  .d('返回日期或时间表达式的月份部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.js5vxb7p77p')
                  .d('日'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.mf4jxsabaip')
                  .d('返回日期或时间表达式的日期部分'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.vfahb9alnul')
                  .d('时间间隔'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.hhf7ahugpep')
                  .d('返回两个日期之间的的天数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.qwuovtsktoh')
                  .d('距离今天'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.g78jtbcwsu6')
                  .d('返回日期距离今天的天数'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.v5iw5fg1bk')
                  .d('时间转换'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.sk414nncifh')
                  .d('将文本型的转换成时间型的'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h3 id="set-config-action">
            {intl
              .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
              .d('操作符')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.udrcrc7ni57')
              .d('下面的操作符可以在“标签规则”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.61dcodc4ra8')
                  .d('操作符'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.util.r9q9unmjuss')
                  .d('等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zq791r1yusc')
                  .d('取出对比项等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.me4pul68n1')
                  .d('大于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.bb7pskysa4u')
                  .d('取出对比项大于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.zix85xqi6e')
                  .d('大于等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.79g501x4wdj')
                  .d('取出对比项大于等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.3rf6n7at7r5')
                  .d('小于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.knqdh13yjqh')
                  .d('取出对比项小于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.o1tendir57k')
                  .d('小于等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.437umpc74gy')
                  .d('取出对比项小于等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.s7em4pawimq')
                  .d('区间'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.bb36yh8vw99')
                  .d('取出对比项在某个区间之间的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.util.52rj9p9vsup')
                  .d('不等于'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.mf3oq6foe5o')
                  .d('取出对比项不等于对比值的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.0dt0hdpf8urs')
                  .d('在集合'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.jren3hlu4ci')
                  .d('取出对比项目在对比值范围内的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.objpn1ccps')
                  .d('不在集合'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.f52a6zd1kee')
                  .d('取出对比项目不在对比值范围内的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.vbstk3d9yb')
                  .d('为空'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.zvn3vyfns2c')
                  .d('取出对比项中的数据为空的记录，无对比值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.bqazs9ptwcj')
                  .d('不为空'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.8djaa5ea6xg')
                  .d('取出对比项中的数据不为空的记录，无对比值'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.1y6s2pl3tcy')
                  .d('包含'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.6u259zvyn4')
                  .d('取出对比项中的数据包含了某个“字符串”的记录'),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.ba6a02t44ah')
                  .d('不包含'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.b3049qv5as')
                  .d('取出对比项中的数据不包含了某个“字符串”的记录'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h3 id="set-config-value">
            {intl
              .get('ide.src.page-group.config-explain.main.2our1jhb704')
              .d('对比值')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.nsaop2c0bn9')
              .d('下面的对比值类型可以在“标签规则”设置中使用：')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get('ide.src.page-group.config-explain.main.abuj5tm9zo8')
                  .d('对比值类型'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.component.modal-stroage-detail.main.m75jykdqa6')
                  .d('描述'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.gzi5ubzdaov')
                  .d('固定值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.5m107cjylu3')
                  .d(
                    '等于、不等于、大于、大于等于、小于、小于等于、区间、包含、不包含，支持对比值类型为固定值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.component.fixedValue.bgzr9cfl6hg')
                  .d('标签值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.fewasni88vi')
                  .d(
                    '等于、不等于、大于、大于等于、小于、小于等于，支持对比值类型为固定值'
                  ),
              },
              {
                type: intl
                  .get('ide.src.page-group.config-explain.main.1yrkw7rx31o')
                  .d('多值'),
                desrc: intl
                  .get('ide.src.page-group.config-explain.main.vxyyg4f9ja')
                  .d('在集合、不在集合，支持对比值类型为多值'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h2 id="case">
            {intl
              .get('ide.src.page-group.config-explain.main.b3o9xxxiinr')
              .d('案例')}
          </h2>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.83r1e98rb4l')
              .d(
                '需求：某电商需要找出最近30天浏览过店铺，但是最近7没在店铺里消费过的女性会员。'
              )}
          </p>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.9zdbxvpcvam')
              .d('在这里我们有如下对象和标签信息：')}
          </p>
          <h3 id="case-object">
            {intl
              .get('ide.src.page-group.config-explain.main.6xxk0fqc88')
              .d('对象object')}
          </h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.48q4e7p43c9')
                .d(
                  '实体对象：会员（member）、浏览记录（Browse）、购买记录（buyer）'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.4z9xs4iuk0w')
                .d(
                  '简单关系对象：会员产生浏览记录（member_Browse）、会员产生购买记录（member_buyer）'
                )}
            </li>
          </ul>
          <h3 id="case-object-tag">
            {intl
              .get('ide.src.page-group.config-explain.main.dsddzfbrptq')
              .d('对象下的标签tag')}
          </h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.fgkf1fs7x74')
                .d(
                  '会员（member）：会员号（id_number）、手机号（phone）、姓名（name）、性别（sex）'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.dakoyhp7aza')
                .d(
                  '浏览记录（Browse）：浏览id（Browse_id）、浏览时间（Browse_time）'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.zxbdu40t1np')
                .d(
                  '购买记录（buyer）：购买id（buyer_id）、购买时间（buyer_time）'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.v7ey0w3alpj')
                .d(
                  '会员产生浏览记录（member_Browse）：浏览id（Browse_id）、会员号（id_number）'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.m16ndaid6z')
                .d(
                  '会员产生购买记录（member_buyer）：购买id（buyer_id）、会员号（id_number）'
                )}
            </li>
          </ul>
          <h3 id="case-object-table">
            {intl
              .get('ide.src.page-group.config-explain.main.5bsh8lztf7y')
              .d('对象下绑定的表')}
          </h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.ylhgrtz536h')
                .d('会员（member）：member')}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.a53f1hlya8b')
                .d('浏览记录（Browse）：Browse_record')}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.p273krijtm')
                .d('购买记录（buyer）：buyer_record')}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.ki7cql3js7d')
                .d('会员产生浏览记录（member_Browse）：Browse_record')}
            </li>
            <li>
              {intl
                .get('ide.src.page-group.config-explain.main.uw0o29sbpeq')
                .d('会员产生购买记录（member_buyer）：buyer_record')}
            </li>
          </ul>
          <p>
            {intl
              .get('ide.src.page-group.config-explain.main.phpwuu0kezo')
              .d(
                '分析：在做人群圈选设置的时候，无需关心底层的表，只需关注对象与标签即可'
              )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Explain
