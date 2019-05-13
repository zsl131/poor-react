import React from 'react';
import {Modal, Table} from 'antd';

export default class ShowFamilyModal extends React.Component {

  render() {

    const columns = [{
      title: '家庭地址',
      render: (record) => {
        return (<p>{record.jtdz}</p>)
      }
    },{
      title: '户主',
      render:(record)=> {
        return (<div>{record.xm}<b>{record.sfzh}</b></div>)
      }
    },{
      title: '属性',
      render:(record)=> {
        return (<div>{record.lx}<b>（{record.pksx}）</b></div>)
      }
    }, {
      title: '家庭情况',
      render:(record)=> {
        return (<div>人数：<b>{record.jtrs}</b>，劳动力：<b>{record.ldlrs}</b>，已就业：<b>{record.jyrs}</b></div>)
      }
    }];

    return(
      <Modal {...this.props} style={{ "minWidth": '80%', top: 20 }}>
        <h2>{this.props.bqdd}[{this.props.bqsj}]</h2>
        <Table dataSource={this.props.dataSource} columns={columns} rowKey="id" pagination={false} footer={null}/>
      </Modal>
    );
  }
}
