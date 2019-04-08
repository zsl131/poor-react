import React from 'react';
import { Tree } from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;

const LeftTree = ({
  menuTree,
  onSelect,
}) => {

  const handlerSelect = (key, e) => {
    // console.log("key:::"+key, e);
    // console.log("nodeName:::", e.node.props.title);
    onSelect(key, e.node.props.title);
  }

  const menus = menuTree.map((obj) => {
    return (
      <TreeNode title={obj.dic.name} key={obj.dic.id} >
        {
          obj.children.map((sub)=> {return (<TreeNode title={sub.name} key={sub.id}/>);})
        }
      </TreeNode>
    );
  });
  return(
    <Tree className={styles.tree} onSelect={handlerSelect}>
      {menus}
    </Tree>
  );
}

export default LeftTree;
