import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import Helmet from 'react-helmet';
import configApi from "../../../utils/configApi";
import PersonalCount from "../../../components/PersonalCount";

const Family = ({
                  dispatch,
                  loading,
                  family,
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
      dispatch({ type: 'family/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: family.data,
    loading: loading.models.family,
    location,
    totalElement: family.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'family/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'family/onUpdate', payload: id });
    },
    handleImport:(family) => {
      console.log(family)
      dispatch({type: 'family/modifyState', payload: {item: family, importVisible: true}});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: family.addVisible,
    title: "添加乡镇",
    confirmLoading: loading.effects['family/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'family/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'family/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'family/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: family.updateVisible,
    title: `修改数据[${family.item.name}]`,
    item: family.item,
    confirmLoading: loading.effects['family/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'family/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'family/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'family/modifyState', payload: { updateVisible: false } });
    }
  };

  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader" style={{"height":"auto"}}>
        <h3><Icon type="bars"/> 易迁户管理（<b className="boldBlue">{family.town.name}</b>）<b>（{family.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
        {/*<PersonalCount townId={family.town.id}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {family.addVisible && <AddModal {...addOpts}/>}
      {family.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, family }) => ({ loading, family }))(Family);
