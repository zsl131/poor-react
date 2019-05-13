import React from 'react';
import {Pagination, Table} from 'antd';
import styles from './list.css';

const ShowDataTable = ({
                onPageChange,
                totalElement,
                ...listOpts
              }) => {


  const columns = [{
    title: '头像',
    render: (record) => {
      return (<div>
        <p>{record.zplj ? <a key={record.id} href={record.zplj} target="_blank" rel="noopener noreferrer"><img src={record.zplj} alt={record.xm} className={styles.avatarImg}/></a>:"未上传"}</p>
        <p>{record.lxdh}</p>
      </div>)
    }
  },{
    title: '成员',
    render:(record)=> {
      return (<div>{record.hzxm}<b>{record.yhzgx}</b>{record.xm}，{record.xb}，{record.mz}，{record.nl}岁，{record.whcd}</div>)
    }
  }, {
    title: '身份证号',
    dataIndex: 'sfzh'
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

export default ShowDataTable;
