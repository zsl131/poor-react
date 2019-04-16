import React from 'react';
import {Pagination, Table} from 'antd';

const List = ({
                onPageChange,
                totalElement,
                ...listOpts
              }) => {


  const columns = [{
    title: '时间',
    dataIndex: 'createTime'
  }, {
    title: '用户',
    dataIndex: 'username'
  }, {
    title: '操作',
    dataIndex: 'name'
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
