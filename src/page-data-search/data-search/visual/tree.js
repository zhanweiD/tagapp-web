import React, {useState} from 'react'
import {Tree, Switch, Select} from 'antd'
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons'
import {NoBorderInput} from '../../../component'
import {
  IconRefresh, IconTreeAdd, IconUnExtend, IconExtend,
} from '../../../icon-comp'

const {Option} = Select

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
]

const TagTree = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const refreshTree = () => {}

  return (
    <div className="visual-tree">
      <div className="visual-tree-action">
        <NoBorderInput 
          placeholder="请输入关键字搜索" 
          // onChange={this.searchTree}
          // onPressEnter={this.searchTree}
        />

        <div className="FBH pr6 pl6" style={{maxWidth: 70}}>
          <IconRefresh size="14" className="mr8" onClick={refreshTree} />
          {/* {
            this.dropdownDom()
          }
          { this.store.expandAll ? (
            <IconUnExtend size="14" className="hand" onClick={this.expandTree} /> 
          ) : (
            <IconExtend size="14" className="hand" onClick={this.expandTree} />
          )} */}
        </div>
      </div>
      <div>
        <div style={{lineHeight: '34px', paddingLeft: '8px'}}>源标签对象</div>
        <Select defaultValue="lucy" style={{width: 180, marginLeft: '8px'}} onChange={() => {}}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      <div className="p8"> 
        <Tree
          showLine
          showIcon={false}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
    
    </div>
  )
}

export default TagTree
