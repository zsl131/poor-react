import React from 'react';
import {Table} from 'antd';
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
    title: "背景大图",
    render: (record)=> {
      return (
        record.picUrl?<a key={record.id} href={record.picUrl} target="_blank" rel="noopener noreferrer"><img src={record.picUrl} alt={record.name} style={{"width":"120px"}}/></a>:<span className="red">未上传</span>
      )
    }
  },{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "序号",
    dataIndex: 'orderNo'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts} />
      );
    }
  }];

  /*const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }*/

  /*const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }*/

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={null}/>
  );
}

export default List;
