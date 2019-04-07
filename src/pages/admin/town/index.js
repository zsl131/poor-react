import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';

const Town = ({
                  dispatch,
                  loading,
                  town,
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

  const operatorOpts = {
    onAdd: () => {
      dispatch({ type: 'town/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: town.data,
    loading: loading.models.town,
    location,
    totalElement: town.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'town/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'town/onUpdate', payload: id });
    },
    handleImport:(town) => {
      console.log(town)
      dispatch({type: 'town/modifyState', payload: {item: town, importVisible: true}});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: town.addVisible,
    title: "添加乡镇",
    confirmLoading: loading.effects['town/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'town/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'town/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'town/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: town.updateVisible,
    title: `修改数据[${town.item.name}]`,
    item: town.item,
    confirmLoading: loading.effects['town/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'town/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'town/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'town/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <div className="listHeader">
        <h3><Icon type="bars"/> 乡镇管理<b>（{town.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {town.addVisible && <AddModal {...addOpts}/>}
      {town.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, town }) => ({ loading, town }))(Town);
