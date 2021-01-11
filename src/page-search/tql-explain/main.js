import intl from 'react-intl-universal'
import { Anchor, Table } from 'antd'
import 'github-markdown-css/github-markdown.css'
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
          href="#tql-explain"
          title={intl
            .get('ide.src.page-search.tql-explain.main.1vqjdq5nmro')
            .d('TQL是什么')}
        />
        <Link
          href="#tql-search"
          title={intl
            .get('ide.src.page-search.tql-explain.main.qpyckbe43ni')
            .d('TQL查询数据')}
        >
          <Link
            href="#limit"
            title={intl
              .get('ide.src.page-search.tql-explain.main.fevhumd9fve')
              .d('限制')}
          />
          <Link
            href="#function"
            title={intl
              .get(
                'ide.src.page-search.page-data-search.tql.tql-tree.2n9p617afuy'
              )
              .d('函数')}
          />
          <Link
            href="#params"
            title={intl
              .get('ide.src.page-search.tql-explain.main.oidbiflohx')
              .d('使用参数')}
          />
          <Link href="#order-by" title="ORDER BY" />
          <Link href="#group-by" title="GROUP BY" />
          <Link href="#like" title="Like" />
          <Link href="#case-when" title="CASE WHEN" />
          <Link
            href="#connect"
            title={intl
              .get('ide.src.page-search.tql-explain.main.0q1k0ymrgxg')
              .d('连接')}
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
            href="#tql-example"
            title={intl
              .get('ide.src.page-search.tql-explain.main.dz96ym1hd8g')
              .d('TQL例子')}
          />
        </Link>
      </Anchor>
      <div className="anchor-content markdown-body">
        <div>
          <h2 id="tql-explain">
            {intl
              .get('ide.src.page-search.tql-explain.main.1vqjdq5nmro')
              .d('TQL是什么')}
          </h2>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.hcpy3fmh7c')
              .d(
                'TQL（Tag Query Language）是标签查询语言，是一种基于业务逻辑模型的数据查询语言。标签查询语言与结构化查询语言（SQL）中的数据查询语言（DQL）类似，用以在业务逻辑模型之上从表中获得数据。TQL仅支持SELECT(不区分大小写)开头的语法，不支持 INSERT INTO、DELETE、UPDATE 等，常与WHERE，ORDER BY，GROUP BY等结合起来使用。语法上与mysql类似。业务逻辑模型即标签体系，通过Object对象、tag标签将库表中的数据重新组织。'
              )}
          </p>
          <h2 id="tql-search">
            {intl
              .get('ide.src.page-search.tql-explain.main.qpyckbe43ni')
              .d('TQL查询数据')}
          </h2>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.p9aabuwm56')
              .d('TQL为数据查询而生，用户可以写如下通用SELECT模版语法：')}
          </p>
          <pre>
            <code>
              {`
                SELECT 
                  tag_name,select_expr [, select_expr ...]
                FROM
                  object_references [WHERE where_condition]
                  [GROUP BY {tag_name | expr}] 
                  [HAVING where_condition]
                  [ORDER BY {tag_name | expr }
                  [ASC | DESC],...] [LIMIT { OFFSET }]
                `}
            </code>
          </pre>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.6xrgjkvl998')
                .d('SELECT语句可以使用多个标签，会返回相应标签数据')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.n2nhf2blx69')
                .d('你可以使用 WHERE 语句来包含任何条件')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.c8prcwabu8')
                .d('条件中某个标签为空时候，需要使用关键字IS NULL 来表示')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.6oo1rhmqq3e')
                .d('可以使用GROUP BY结合COUNT函数来分组统计')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.xiw7vc6n8dq')
                .d('可以使用ORDER BY 对结果进行排序')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.syihvqamqp')
                .d(
                  '你可以使用 LIMIT 属性来设定返回的记录数，目前支持最大的记录条数为5000'
                )}
            </li>
          </ul>
          <h3 id="limit">
            {intl
              .get('ide.src.page-search.tql-explain.main.fevhumd9fve')
              .d('限制')}
          </h3>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ...]
                FROM
                  object_references [WHERE where_condition]
                `}
            </code>
          </pre>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.lt3atzt3c0i')
                .d('不支持SELECT * 这种全量标签形式，必须要指定明确的查询列')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.j4von9bwolc')
                .d('标签、对象可以使用别名，但是别名不能是以"$" 开头的字符串')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.m6end5qv31')
                .d('不支持子查询，类似如下这种')}
            </li>
          </ul>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ]
                FROM
                  object_references [, object2 ]
                WHERE
                  select_expr OPERATOR （
                SELECT
                  select_expr [, select_expr ...]
                FROM
                  object_references [WHERE where_condition] ）
                `}
            </code>
          </pre>
          <h3 id="function">
            {intl
              .get(
                'ide.src.page-search.page-data-search.tql.tql-tree.2n9p617afuy'
              )
              .d('函数')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.dxze99z7z2h')
              .d('目前TQL仅支持如下的函数')}
          </p>
          <Table
            columns={[
              {
                title: intl
                  .get(
                    'ide.src.page-search.page-data-search.tql.tql-tree.2n9p617afuy'
                  )
                  .d('函数'),
                dataIndex: 'type',
              },
              {
                title: intl
                  .get('ide.src.page-search.tql-explain.main.ilydtc2cyz')
                  .d('说明'),
                dataIndex: 'desrc',
              },
            ]}
            dataSource={[
              {
                type: 'AVG(col)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.l0lr8o5btl9')
                  .d('返回指定列的平均值'),
              },
              {
                type: 'COUNT(col)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.ifpyakyio2i')
                  .d(
                    '返回指定列中非NULL值/行的个数（当函数参数为星号*时不会忽略）'
                  ),
              },
              {
                type: 'MIN(col)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.57xjquauhko')
                  .d('返回指定列的最小值'),
              },
              {
                type: 'MAX(col)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.zxtmhk0hdy')
                  .d('返回指定列的最大值'),
              },
              {
                type: 'SUM(col)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.1pgbzv91jg2')
                  .d('返回指定列的所有值之和'),
              },
              {
                type: 'SUBSTR(str,start,end)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.82alouk6bfw')
                  .d('取str左边第start位置起，到end位置字长的字符串'),
              },
              {
                type: 'DATE_FORMAT(date,fmt)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.3wfwivg4ju6')
                  .d('依照字符串fmt格式化日期date值'),
              },
              {
                type: 'DATEDIFF(day1,day2)',
                desrc: intl
                  .get('ide.src.page-search.tql-explain.main.ad99vv3sid')
                  .d('返回两个日期之间的天数'),
              },
            ]}
            bordered
            size="small"
            className="pr16 pl16 mb16"
            pagination={false}
          />

          <h3 id="params">
            {intl
              .get('ide.src.page-search.tql-explain.main.oidbiflohx')
              .d('使用参数')}
          </h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.kkuaamthn9')
                .d('WHERE条件中的参数格式必须为/${参数名}')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ]
                FROM
                  object_references [, object2 ]
                WHERE
                  tag_name=/\${tag_parameter}
                `}
            </code>
          </pre>
          <h3 id="order-by">ORDER BY</h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.bjybuwuhy4')
                .d(
                  '支持使用任何标签来作为排序的条件，从而返回排序后的查询结果'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.skv4st7dr')
                .d('支持设定多个标签来排序')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.ovc7z4mthcr')
                .d(
                  '支持使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序ASC排列'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.t4m84uzzw2b')
                .d(
                  '被排序的标签必须要出现在SELECT 后面的标签中，否则会查询失败'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ...]
                FROM
                  object_references [WHERE where_condition]
                ORDER BY
                  { tag_name | expr  } [ASC | DESC],...]
                `}
            </code>
          </pre>
          <h3 id="group-by">GROUP BY</h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.sxnsbtawfkp')
                .d(
                  'GROUP BY 语句根据一个或多个列对结果集进行分组。在分组的列上我们可以使用 COUNT, SUM, AVG,等函数。被分组的标签必须要出现在SELECT 后面的标签中，否则会查询失败'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ],
                  aggregate_function (aggregate_expression)
                FROM
                  object_name [WHERE conditions]
                GROUP BY
                  [GROUP BY {tag_name | expr } ]
                `}
            </code>
          </pre>

          <h3 id="like">Like</h3>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.r6htmmhx8tc')
                .d('精确匹配：')}
            </li>
            <ul>
              <li>
                {intl
                  .get('ide.src.page-search.tql-explain.main.nqsitxc938p')
                  .d('id：用户传入的标签数据等于id')}
              </li>
            </ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.tubkwxfvfdd')
                .d('前缀匹配：')}
            </li>
            <ul>
              <li>
                {intl
                  .get('ide.src.page-search.tql-explain.main.15a4u0bwlea')
                  .d('id%：标签数据以Id开头，以一至多个字符结尾')}
              </li>
            </ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.teu5jk5dcbn')
                .d('后缀匹配：')}
            </li>
            <ul>
              <li>
                {intl
                  .get('ide.src.page-search.tql-explain.main.r1sfmwcinw')
                  .d('%id：标签数据以一至多个任意字符开头，以Id结尾')}
              </li>
            </ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.cgzlyhef6me')
                .d('全模糊匹配：')}
            </li>
            <ul>
              <li>
                {intl
                  .get('ide.src.page-search.tql-explain.main.lss6cbh1e2o')
                  .d(
                    '%id%：标签数据以一至多个任意字符开头，中间匹配Id，以一至多个任意字符结尾'
                  )}
              </li>
            </ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {`
                SELECT
                  select_expr [, select_expr ...]
                FROM
                  object_references
                WHERE
                  select_expr LIKE '%sid' [AND [OR]] select_expr = LIKE  'id%'
                `}
            </code>
          </pre>
          <h3 id="case-when">CASE WHEN</h3>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.crgqdkz2hda')
              .d('TQL的case when操作Mysql里面一样，支持：')}
          </p>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zgoqif3ii5n')
                .d('支持两种方式，简单case 函数，case搜索函数')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {intl
                .get('ide.src.page-search.tql-explain.main.61x5vnnclzi')
                .d(
                  "                 -- 简单case 函数                 SELECT                  case sex                   when '1' then '男'                   when '2' then '女’                   else '其他' end sex                 FROM                   object_references [WHERE where_condition]                                    --case搜索函数                 SELECT                      case when sex = '1' then '男'                      when sex = '2' then '女'                      else '其他' end   sex                 FROM                   object_references [WHERE where_condition]                 "
                )}
            </code>
          </pre>
          <h3 id="connect">
            {intl
              .get('ide.src.page-search.tql-explain.main.0q1k0ymrgxg')
              .d('连接')}
          </h3>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.1e12vvro4vd')
              .d('TQL的连接操作Mysql里面一样，支持：')}
          </p>
          <ul>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.jm16pidm58b')
                .d(
                  'INNER JOIN（内连接,或等值连接）：获取两个表中字段匹配关系的记录'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.hir66v0z09')
                .d(
                  'LEFT JOIN（左连接）：获取左表所有记录，即使右表没有对应匹配的记录'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.ss04loc8c9')
                .d(
                  'RIGHT JOIN（右连接）： 与 LEFT JOIN 相反，用于获取右表所有记录，即使左表没有对应匹配的记录'
                )}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.zjakg95i7m9')
                .d('样例')}
            </li>
          </ul>
          <pre>
            <code>
              {`
              SELECT
                select_expr [, select_expr ...]
              FROM
                object_reference {LEFT|RIGHT} [OUTER] JOIN object_reference on join_specification
                `}
            </code>
          </pre>
          <h2 id="case">
            {intl
              .get('ide.src.page-group.config-explain.main.b3o9xxxiinr')
              .d('案例')}
          </h2>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.f7lrl486qp8')
              .d('需求：加工出会员最近三十天购买金额、最近三十天下单次数')}
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
                .get('ide.src.page-search.tql-explain.main.yrvqocco83k')
                .d('实体对象：会员（member）、购买记录（buyer）')}
            </li>
            <li>
              {intl
                .get('ide.src.page-search.tql-explain.main.ap4hyscth8s')
                .d('简单关系对象：会员产生购买记录（member_buyer）')}
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
                .get('ide.src.page-search.tql-explain.main.ei8t34aawr7')
                .d(
                  '购买记录（buyer）：购买id（buyer_id）、购买时间（buyer_time）、购买金额（buyer_money）'
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
          </ul>
          <p>
            {intl
              .get('ide.src.page-search.tql-explain.main.tncwerg3bp')
              .d(
                '分析：我们在写TQL的时候，无需关心表有几张，只需要从对象和标签角度出发，直接将对象当作表，标签当作字段来处理！，我们在编写TQL界面，自定义一个time参数，值为昨天'
              )}
          </p>
          <h3 id="tql-example">
            {intl
              .get('ide.src.page-search.tql-explain.main.dz96ym1hd8g')
              .d('TQL例子')}
          </h3>
          <pre>
            <code>
              {intl
                .get('ide.src.page-search.tql-explain.main.j3el6cy1lem')
                .d(
                  "               select                 member.id_number ,               case                  when member.sex = '1' then '男'                 when member.sex = '2' then '女'               else '未知' end sex,                 count（*） as charge,                 sum(buyer.buyer_money) as money               from                 member                 left join member_buyer  on member.id_number = member_buyer.id_number                 left join buyer on member_buyer.buyer_id = buyer.buyer_id                 where datediff(buyer.buyer_time,/${time})<=30               group by                 member.id_number，                 member.sex                 "
                )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Explain
