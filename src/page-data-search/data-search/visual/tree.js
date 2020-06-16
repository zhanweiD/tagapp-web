import React, {useState} from 'react'
import {Tree, Switch, Select} from 'antd'
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons'
import {NoBorderInput, OmitTooltip} from '../../../component'
import {
  IconRefresh, IconTreeAdd, IconUnExtend, IconExtend,
} from '../../../icon-comp'

const {TreeNode} = Tree
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

const TagTree = ({tagTreeData, refreshTree}) => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  const searchTree = () => refreshTree()

  const renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode
          title={<OmitTooltip maxWidth={120} text={item.name} />}
          key={item.aId}
          dataRef={item}
          selectable={false}
        >
          {renderTreeNodes(item.children)}
        </TreeNode>
      )
    }

    return (
      <TreeNode
        key={item.aId}
        title={<OmitTooltip maxWidth={120} text={item.name} />}
        selectable={false}
        data={item}
      />
    )
  })

  return (
    <div className="visual-tree">
      <div className="visual-tree-action">
        <NoBorderInput 
          placeholder="请输入关键字搜索" 
          // onChange={this.searchTree}
          // onPressEnter={this.searchTree}
        />

        <div className="FBH pr6 pl6" style={{maxWidth: 70}}>
          <IconRefresh size="14" className="mr8" onClick={searchTree} />
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
      <div className="p8"> 
        <Tree
          showLine
          showIcon={false}
          // onSelect={onSelect}
          // treeData={tagTreeData}
        >
          {
            renderTreeNodes(tagTreeData)
          }
        </Tree>
      </div>
    
    </div>
  )
}

export default TagTree
