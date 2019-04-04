import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import List from "./components/List";

const News = ({
  location,
  news,
  loading,
  dispatch
}) => {

  const listOpts = {
    onDelConfirm : (id) => {

    },
    onPageChange : (page) => {

    },
    location,
    totalElement: news.totalElements,
    dataSource: news.datas,
    loading: loading.models.news
  }

  return (
    <div>
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 新闻管理<b>（{news.totalElements}）</b></h3>
        </div>
        <div className="listFilter">
        </div>
        <div className="listContent">
          <List {...listOpts}/>
        </div>
      </div>
    </div>
  );
}

export default connect(({ news, loading }) => ({ news, loading }))(News);
