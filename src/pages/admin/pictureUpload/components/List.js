import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
                onDelConfirm,
                onUpdate,
                onPageChange,
                totalElement,
                ...listOpts
              }) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '对应乡镇',
    dataIndex: 'xzmc'
  }, {
    title: '批次号',
    dataIndex: 'batchNo'
  }, {
    title: '日期',
    dataIndex: 'createTime'
  }, {
    title: '成功数量',
    dataIndex: 'sucAmount'
  }, {
    title: '异常数量',
    dataIndex: 'amount'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.batchNo} delName={record.batchNo} {...delOpts} />
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
