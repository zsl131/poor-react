import React from 'react';
import {Button, Pagination, Table, Icon, Popover, Popconfirm} from 'antd';

const List = ({
  onPageChange,
  onUpdate,
  onDelete,
  totalElements,
  ...listOpts
}) => {

  const columns = [{
    title: '序号',
    dataIndex: 'orderNum'
  }, {
    title: '图标',
    render: (text, record) => {
      return (
        record.icon ? <Icon type={record.icon}/>:<span>-</span>
      );
    }
  }, {
    title: '菜单名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: 'sn'
  }, {
    title: '连接地址',
    dataIndex: 'href'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <Popover content={operators(record)} title="相关操作" placement="bottom">
            <span className="ant-dropdown-link">
              操作 <Icon type="down" />
            </span>
        </Popover>
      );
    }
  }];

  const handlerDel = (id) => {
    // console.log("---", id);
    onDelete(id);
  }

  const operators = (record) => {
    return (
      <div style={{"textAlign":"center"}}>
        <p><Button type="default" icon="edit" onClick={()=>handleUpdate(record)}>修改</Button></p>
        <p><Popconfirm title={`确定删除【${record.name}】吗？`} {...delOpts} onConfirm={()=>handlerDel(record.id)}><Button type="danger" icon="close">删除</Button></Popconfirm></p>
      </div>
    );
  }

  const delOpts = {
    okText: "确定删除",
    cancelText: "取消",
  }

  const handleUpdate = (record) => {
    onUpdate(record);
  }

  const handlerRow = (record, index) => {
    // console.log(index, record.name);
  }

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} onRow={handlerRow} pagination={false} footer={pager}></Table>
  );
}

export default List;
