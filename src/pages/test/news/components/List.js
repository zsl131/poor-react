import React from 'react';
import { Table, Pagination } from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
    onDelConfirm,
    onPageChange,
    location,
    totalElement,
    ...listOpts
}) => {
  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm
  }

  const columns = [{
    title: '分类',
    dataIndex: 'category'
  }, {
    title: '作者',
    dataIndex: 'authorName'
  }, {
    title: '标题',
    dataIndex: 'title'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.title} {...delOpts}/>
      );
    }
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
