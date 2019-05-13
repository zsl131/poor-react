import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import Helmet from 'react-helmet';
import configApi from "../../../utils/configApi";
import List from './components/List';
import ShowDataModal from "./components/ShowDataModal";
import ShowDataTable from "./components/ShowDataTable";
import ShowPieTable from "./components/ShowPieTable";
import ShowFamilyModal from "./components/ShowFamilyModal";

const MoveCount = ({
  dispatch,
  moveCount,
  loading,
  location
}) => {

  const listOpts = {
    dataSource: moveCount.dataPie,
    loading: loading.models.moveCount,
    location,
    totalElement: moveCount.totalElements,
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'moveCount/onUpdate', payload: id });
    },
    showData: (obj, type) => {
      // console.log(type, obj);
      dispatch({ type: 'moveCount/modifyState', payload: {type: type, bqdd: obj.name}});
      if(type==='0') {
        dispatch({ type: 'moveCount/queryData', payload: {bqdd: obj.name, title: obj.name}});
      } else if(type==='1') {
        dispatch({ type: 'moveCount/findByBqsj', payload: {bqdd: obj.name, title: obj.name}});
      }
    }
  };

  const showOpts = {
    maskClosable: false,
    title: moveCount.title,
    visible: moveCount.showDataVisible,
    onOk: ()=> {
      dispatch({type: 'moveCount/modifyState', payload: {showDataVisible: false}});
    },
    onCancel: ()=> {
      dispatch({type: 'moveCount/modifyState', payload: {showDataVisible: false}});
    }
  };

  const dataOpts = {
    dataSource: moveCount.familyList,
  };

  const pieOpts = {
    dataSource: moveCount.dataPieBqsj,
    bqdd: moveCount.bqdd,
    showData: (obj, type) => {
      // console.log(type, obj);
      if(type==='0') {
        dispatch({ type: 'moveCount/queryData', payload: {bqsj: obj.name, bqdd: moveCount.bqdd, title: moveCount.bqdd}});
        dispatch({ type: 'moveCount/modifyState', payload: {bqsj: obj.name, showFamilyVisible: true}});
      }
    }
  };

  const showData = (type) => {
    return (
      <div>
        {type === '0' && <ShowDataTable {...dataOpts}/>}
        {type === '1' && <ShowPieTable {...pieOpts}/>}
      </div>
    )
  };

  const showFamilyOpts = {
    dataSource: moveCount.familyList,
    bqdd: moveCount.bqdd,
    bqsj: moveCount.bqsj,
    maskClosable: false,
    title: moveCount.title,
    visible: moveCount.showFamilyVisible,
    onOk: ()=> {
      dispatch({type: 'moveCount/modifyState', payload: {showFamilyVisible: false}});
    },
    onCancel: ()=> {
      dispatch({type: 'moveCount/modifyState', payload: {showFamilyVisible: false}});
    }
  }

  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader" style={{"height":"auto"}}>
        <h3><Icon type="bars"/> 搬迁统计管理<b>（{moveCount.dataPie.length}）</b></h3>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {moveCount.showDataVisible && <ShowDataModal {...showOpts}>{showData(moveCount.type)}</ShowDataModal>}
      {moveCount.showFamilyVisible && <ShowFamilyModal {...showFamilyOpts}/>}
    </div>
  );
}

export default connect(({ loading, moveCount }) => ({ loading, moveCount }))(MoveCount);
