import React from 'react'
import {Tree} from 'antd'
import {NoBorderInput, OmitTooltip, Loading} from '../../../component'
import {
  IconRefresh,
} from '../../../icon-comp'

const {TreeNode} = Tree

const TagTree = ({treeLoading, tagTreeData, refreshTree}) => {
  const searchTree = e => refreshTree(e)

  const renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode
          title={<OmitTooltip maxWidth={80} text={item.name} />}
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
        title={<OmitTooltip maxWidth={80} text={item.name} />}
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
          onChange={searchTree}
          onPressEnter={searchTree}
        />

        <div className="FBH pr6 pl6" style={{maxWidth: 70}}>
          <IconRefresh size="14" className="mr8" onClick={() => searchTree()} />
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
        {treeLoading
          ? <Loading mode="block" height={100} />
          : (
            <Tree
              showIcon
              defaultExpandAll
              showLine={{
                showLeafIcon: false,
              }}
            >
              {
                renderTreeNodes(tagTreeData)
              }
            </Tree>
          )
        }
       
      </div>
    
    </div>
  )
}

export default TagTree
