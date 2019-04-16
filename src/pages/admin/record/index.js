import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import Filter from './components/Filter';
import List from './components/List';

const Record = ({
                dispatch,
                loading,
                record,
                location
              }) => {

  const { query, pathname } = location;

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      query: {
        ...query,
        ...newQuery,
      },
    }));
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: record.data,
    loading: loading.models.record,
    location,
    totalElement: record.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 系统日志管理<b>（{record.totalElements}）</b></h3>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
    </div>
  );
}

export default connect(({ loading, record }) => ({ loading, record }))(Record);
