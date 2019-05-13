import React from 'react';
import {Pagination, Table} from 'antd';
import styles from './list.css';

const ShowDataTable = ({
                onPageChange,
                totalElement,
                ...listOpts
              }) => {


  const columns = [{
    title: '家庭地址',
    render: (record) => {
      return (<p>{record.jtdz}</p>)
    }
  },{
    title: '户主',
    render:(record)=> {
      return (<div>{record.xm}<b>{record.sfzh}</b></div>)
    }
  },{
    title: '属性',
    render:(record)=> {
      return (<div>{record.lx}<b>（{record.pksx}）</b></div>)
    }
  }, {
    title: '家庭情况',
    render:(record)=> {
      return (<div>人数：<b>{record.jtrs}</b>，劳动力：<b>{record.ldlrs}</b>，已就业：<b>{record.jyrs}</b></div>)
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

export default ShowDataTable;
