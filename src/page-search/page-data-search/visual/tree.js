/**
 * @description 数据查询-可视化
 */

import {Component} from 'react'
import {observer} from 'mobx-react'
import {action, observable} from 'mobx'
import {DtTree} from '@dtwave/uikit'
import {Loading} from '../../../component'
import Action from './tree-action'

const {DtTreeNode, DtTreeBox} = DtTree

@observer
export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }

  // 递归遍历树节点
  processNodeData = data => {
    if (!data) return undefined

    return data.map(node => (
      <DtTreeNode
        key={node.id}
        itemKey={node.id}
        title={node.name}
        // title={+this.current === 0 && node.enName ? `${node.name}(${node.enName})` : node.name}
        selectable={node.parentId}
        showIcon={node.parentId === 0}
        // 对象类目只有一级
        // iconNodeSrc={+this.current === 1 ? functionIcon : null}
        nodeData={node}
      >
        {
          this.processNodeData(node.children)
        }
      </DtTreeNode>
    ))
  }

  render() {
    const {
      treeLoading, treeData, expandAll, searchExpandedKeys,
    } = this.store

    const treeConfig = {
      type: 'tree',
      selectExpand: true,
      onSelect: this.onselect,
      defaultExpandAll: expandAll,
      defaultExpandedKeys: searchExpandedKeys.slice(),
      showDetail: true,
    }

    const treeBoxConfig = {
      titleHeight: 34,
      showTitle: true,
      title: <Action store={this.store} />,
      defaultWidth: 200,
      style: {minWidth: '200px'},
    }

    return (
      <div className="visual-tree">
        <DtTreeBox {...treeBoxConfig}>
          {treeLoading
            ? <Loading mode="block" height={100} />
            : (
              <DtTree {...treeConfig}>
                {
                  this.processNodeData(treeData)
                }
              </DtTree>
            )
          }
        </DtTreeBox>
      </div>
    )
  }
}
