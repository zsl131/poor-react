import React from 'react';
import {Button, Input, Table, Tooltip} from 'antd';

export default class AddModal extends React.Component {

  state = {
    dataSource: this.props.dataSource,
    flag: true
  };

  componentWillMount() {
    const data = this.props.dataSource;
    this.setState({dataSource: data});
  }

  render() {

    const {
      showData,
      dataSource,
    } = this.props;

    const tableOpts = {
      dataSource: this.state.dataSource
    };
    if(this.state.flag && dataSource.length>0) {
      this.setState({dataSource: dataSource, flag: false});
    }

    const columns = [{
      title: '搬迁地点',
      // dataIndex: 'xh'
      render:(record)=> {
        return (<Tooltip title={`按年份查看【${record.name}】的搬迁情况`}><Button onClick={()=>{showData(record, "1")}}>{record.name}</Button></Tooltip>)
      }
    },{
      title: '户数',
      render:(record)=> {
        return (<Tooltip title={`查看搬迁到【${record.name}】的家庭`}><Button type="primary" onClick={()=>{showData(record, "0")}}>{record.value}</Button></Tooltip>)
      }
    }];

    const changeMove = (e) => {
      const val = e.target.value;
      const data = dataSource;
      let array = [];
      data.map((item)=> {
        // console.log(item);
        if(item.name.indexOf(val)>=0) {array.push(item);}
      });
      this.setState({dataSource: array});
    }

    return (
      <div>
        <div className="listFilter" style={{"padding":"10px"}}>
          <Input placeholder="输入搬迁地点筛选" onChange={changeMove}/>
        </div>
        <Table {...tableOpts} columns={columns} rowKey="id" pagination={false} footer={null}/>
      </div>
    );
  }
}
