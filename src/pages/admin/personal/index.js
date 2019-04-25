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
import ShowFamilyModal from "../ShowFamilyModal";

const Personal = ({
                  dispatch,
                  loading,
                  personal,
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
      dispatch({ type: 'personal/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: personal.data,
    loading: loading.models.personal,
    location,
    totalElement: personal.totalElements,
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'personal/onUpdate', payload: id });
    },
    onShow:(id) => {
      console.log(id)
      dispatch({type: 'personal/onShow', payload: id}).then(()=> {
        dispatch({type: "personal/modifyState", payload: {showVisible: true}});
      });
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: personal.addVisible,
    title: "添加乡镇",
    confirmLoading: loading.effects['personal/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'personal/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'personal/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'personal/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: personal.updateVisible,
    title: `修改成员[${personal.item.xzmc} - ${personal.item.xm}]`,
    item: personal.item,
    confirmLoading: loading.effects['personal/addOrUpdate'],
    onCancel: () => {
      dispatch({ type: 'personal/modifyState', payload: { updateVisible: false } });
    },
    updateBasic: (obj) => {
      dispatch({type: "personal/updateBasic", payload: obj}).then(()=>handleRefresh());
    },
    updateWork: (obj)=> {
      dispatch({type: "personal/updateWork", payload: obj}).then(()=>handleRefresh());
    },
    updateMove: (obj)=> {
      dispatch({type: "personal/updateMove", payload: obj}).then(()=>handleRefresh());
    },
    updateStudy: (obj)=> {
      dispatch({type: "personal/updateStudy", payload: obj}).then(()=>handleRefresh());
    },
    updateSafe: (obj)=> {
      dispatch({type: "personal/updateSafe", payload: obj}).then(()=>handleRefresh());
    },
    updateIndustry: (obj)=> {
      dispatch({type: "personal/updateIndustry", payload: obj}).then(()=>handleRefresh());
    },
    addPersonal: (obj)=> {
      dispatch({type: "personal/addPersonal", payload: obj}).then(()=>handleRefresh());
    },
    addAssets: (obj) => {
      dispatch({type: "personal/addAssets", payload: obj}).then(()=>handleRefresh());
    },
  };

  const showOpts = {
    maskClosable: false,
    visible: personal.showVisible,
    title: `家庭详情[${personal.family.xm} ${personal.personal.yhzgx} ${personal.personal.xm}]`,
    personalList: personal.personalList,
    family: personal.family,
    personal: personal.personal,
    assetsList: personal.assetsList,
    onOk: ()=> {
      dispatch({type: 'personal/modifyState', payload: {showVisible: false}});
    },
    onCancel: ()=> {
      dispatch({type: 'personal/modifyState', payload: {showVisible: false}});
    }
  };

  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader">
        <h3><Icon type="bars"/> 易迁户管理<b>（{personal.totalElements}）</b></h3>
        {/*<Operator {...operatorOpts}/>*/}
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {personal.addVisible && <AddModal {...addOpts}/>}
      {personal.updateVisible && <UpdateModal {...updateOpts}/>}
      {personal.showVisible && <ShowFamilyModal {...showOpts}/>}
    </div>
  );
}

export default connect(({ loading, personal }) => ({ loading, personal }))(Personal);
