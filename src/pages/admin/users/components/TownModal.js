import React from 'react';
import {Button, Modal, TreeSelect} from 'antd';
import styles from "./town.css";

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default class TownModal extends React.Component {

  state = {
    checkTownIds:this.props.userTownIds,
  };

  setTownIds(townIds) {
    this.setState({checkTownIds: townIds});
  }

  render() {

    const handleOk = (e) => {
      e.preventDefault();
      this.props.onOk(this.state.checkTownIds);
    }

    // const userTownIds = this.props.userTownIds;
    // console.log(userTownIds)
    // const selectedTownIds = [];
    // userTownIds.map((item)=>{selectedTownIds.push(""+item)});


    const treeData = this.props.treeDto.map((item) => {
      return ({
        title: item.town.name,
        value: item.town.id,
        key: item.town.id,
        children: item.children?item.children.map((child)=> {
          return {
            title: child.name,
            value: child.id,
            key: child.id,
          }
        }):[]
      })
    });



    const treeAllData = [{
      title: '彝良县',
      value: 1,
      key: 0,
      children: treeData
    }];


    const tProps = {
      treeData: treeAllData,
      // value: this.state.value,
      onChange: (value) => {
        // console.log(value);
        this.setTownIds(value);
      },
      defaultValue: this.props.userTownIds,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      treeDefaultExpandedKeys:["1"],
      searchPlaceholder: '请选择对应乡镇',
      style: {
        width: '100%',
      },
    };

    return(
      <Modal {...this.props} onOk={handleOk} style={{ top: 10 }}>
        <div>
          {/*<Table rowSelection={rowSelection} dataSource={this.props.townList} rowKey="id" columns={columns} pagination={false}></Table>*/}
          {/*{datas}*/}
          <TreeSelect {...tProps} />
        </div>
      </Modal>
    );
  }
}
