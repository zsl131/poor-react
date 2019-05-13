import React from 'react';
import {Button, Table, Tooltip} from 'antd';

const ShowPieTable = ({
    onPageChange,
    totalElement,
   showData,
  bqdd,
    ...listOpts
              }) => {


  const columns = [{
    title: '搬迁时间',
    // dataIndex: 'xh'
    render:(record)=> {
      return (<b>{record.name}</b>)
    }
  },{
    title: '户数',
    render:(record)=> {
      return (<Tooltip title={`查看【${record.name}】搬迁到【${bqdd}】的家庭`}><Button type="primary" onClick={()=>{showData(record, "0")}}>{record.value}</Button></Tooltip>)
    }
  }];

  /*const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }*/

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={null}/>
  );
}

export default ShowPieTable;
