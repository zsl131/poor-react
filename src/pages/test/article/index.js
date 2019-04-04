import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const Article = ({
  article,
  loading,
  dispatch,
  location
}) => {

  const columns = [{
    title: '标题',
    dataIndex: 'title'
  }, {
    title: '作者',
    dataIndex: 'author'
  }, {
    title: '分类',
    dataIndex: 'category'
  }];

  return (
    <div>
      <h1>文章管理（{article.totalElements}）</h1>
      <Table dataSource={article.datas} columns={columns}/>
    </div>
  );
}

export default connect(({ loading, article }) => ({ loading, article }))(Article);
