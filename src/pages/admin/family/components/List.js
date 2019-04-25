import React from 'react';
import {Pagination, Table} from 'antd';

const List = ({
                onPageChange,
                totalElement,
                ...listOpts
              }) => {


  const columns = [{
    title: '序号',
    // dataIndex: 'xh'
    render:(record)=> {
      return (<div><p>序号：{record.xh}</p><p>{record.xzmc}</p></div>)
    }
  },{
    title: '户主',
    render:(record)=> {
      return (<div><p>{record.xm}，{record.xb}，{record.mz}</p><p>{record.sfzh}</p></div>)
    }
  },{
    title: '联系电话',
    render:(record)=> {
      return (<div>{record.lxdh}</div>)
    }
  },{
    title: '家庭情况',
    render:(record)=> {
      return (<div><p>家庭人数：{record.jtrs}</p><p>{record.jtdz}</p></div>)
    }
  },{
    title: '贫困/易迁户属性',
    render:(record)=> {
      return (<div>{record.pksx}/{record.lx}</div>)
    }
  },{
    title: '搬迁情况',
    render:(record)=> {
      return (<div>{record.bqdd?<div><p>{record.bqdd}</p><p>搬迁时间：{record.bqsj}</p></div>:<span className="red">未搬迁</span>}</div>)
    }
  },{
    title: '三块地/产业',
    render:(record)=> {
      return (<div><p>宅基地：{record.zjd}亩，林地：{record.ld}亩，耕地：{record.gd}亩</p><p>种植：{record.zzpz}，面积：{record.zzdmj}亩</p></div>)
    }
  },{
    title: '备注',
    render:(record)=> {
      return (<div>{record.bz}</div>)
    }
  }/*, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts} />
      );
    }
  }*/];

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
