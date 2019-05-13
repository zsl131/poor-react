import React from 'react';
import {Table, Button, Tooltip} from 'antd';

const List = ({
  onPageChange,
  totalElement,
  showData,
  ...listOpts
              }) => {


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

export default List;
