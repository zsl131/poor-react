import React from 'react';
import {Pagination, Table} from 'antd';
import FamilyOperator from "../../FamilyOperator";
import QRCode from 'qrcode.react';
import configApi from "../../../../utils/configApi";
import styles from './list.css';

const List = ({
  onPageChange,
  totalElement,
  onUpdate,
  onShow,
  ...listOpts
}) => {

  const columns = [{
    title: '二维码',
    // dataIndex: 'xh'
    render:(record)=> {
      return (<div>
        <QRCode value={`${configApi.baseUrl}/web/personal/show?id=${record.id}`} />
        <p>{record.xzmc}</p></div>)
    }
  }, {
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
      return (<div><p>{record.hzxm}<b>{record.yhzgx}</b>{record.xm}，{record.xb}，{record.mz}，{record.nl}岁，{record.whcd}</p><p>{record.sfzh}</p></div>)
    }
  }/*,{
    title: '联系电话',
    render:(record)=> {
      return (<div>{record.lxdh}</div>)
    }
  }*/,{
    title: '搬迁情况',
    render:(record)=> {
      return (<div>{record.bqdd?<div><p>{record.bqdd}</p><p>搬迁时间：{record.bqsj}</p></div>:<span className="red">未搬迁</span>}</div>)
    }
  }, {
    title: '培训情况',
    render: (record)=> {
      return (<div>
        {record.cjhzpx && <p>培训过：{record.cjhzpx}</p>}
        {record.pxxq && <p>培训需求：{record.pxxq}</p>}
      </div>)
    }
  },{
    title: '备注',
    render:(record)=> {
      return (<div>{record.bz}</div>)
    }
  },{
    title: "操作",
    render: (record)=> {
      return (<FamilyOperator id={record.id} onUpdate={onUpdate} onShow={onShow}/>)
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

  const onRowSelect = (record) => {
    // console.log(record);
    return {
      onClick: () => {
        onShow(record.id);
      }
    }
  }

  return (
    <Table {...listOpts} onRow={onRowSelect} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
