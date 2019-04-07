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
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "级别",
    render:(record)=> {
      return (
        <div>{record.level == '10' ? <span className="red">县级</span>:<span className="blue">乡镇级</span>}</div>
      )
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts} />
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
