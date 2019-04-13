import React from 'react';
import {Button, Modal} from 'antd';
import styles from "./town.css";

export default class TownModal extends React.Component {

  render() {

    const handleOk = (e) => {
      e.preventDefault();
      this.props.onOk();
    }

    const columns = [{
      title: '乡镇名称',
      dataIndex: 'name',
    }, {
      title: 'id',
      dataIndex: 'id',
    }];

    let userTownIds = this.props.userTownIds;

    const hasContain = (id)=> {
      return userTownIds.includes(id);
    }

    const onSetUserTown = (id)=> {
      this.props.setUserTown(id);
      if(userTownIds.includes(id)) {
        userTownIds.splice(userTownIds.findIndex(item => item.id === id), 1)
      } else {
        userTownIds.push(id);
      }
    }

    const buildClass = (id)=> {
      return styles.singleTown + " " +(hasContain(id)?styles.hasContain:"");
    }

    const datas = this.props.townList.map((item)=> {
      return (<Button type={hasContain(item.id)?"primary":"default"} onClick={()=>onSetUserTown(item.id)} className={buildClass(item.id)}>{item.name}</Button>)
    })

    return(
      <Modal {...this.props} onOk={handleOk} style={{ top: 10 }}>
        {/*<Table rowSelection={rowSelection} dataSource={this.props.townList} rowKey="id" columns={columns} pagination={false}></Table>*/}
        {datas}
      </Modal>
    );
  }
}
