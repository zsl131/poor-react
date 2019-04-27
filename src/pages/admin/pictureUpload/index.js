import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router'
import Operator from './components/Operator';
import Filter from './components/Filter';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import configApi from "../../../utils/configApi";
import Helmet from 'react-helmet';

const PictureUpload = ({
                  dispatch,
                  loading,
                  pictureUpload,
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
      dispatch({ type: 'pictureUpload/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: pictureUpload.data,
    loading: loading.models.pictureUpload,
    location,
    totalElement: pictureUpload.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'pictureUpload/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({ type: 'pictureUpload/onShow', payload: id });
    },
  }

  const addOpts = {
    maskClosable: false,
    visible: pictureUpload.addVisible,
    title: "上传图片",
    confirmLoading: loading.effects['pictureUpload/addOrUpdate'],
    onOk:() => {
      dispatch({ type: 'pictureUpload/modifyState', payload: { addVisible: false } });
    },
    onCancel: ()=> {
      dispatch({ type: 'pictureUpload/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: pictureUpload.updateVisible,
    title: `查看出错数据[${pictureUpload.item.batchNo}][共 ${pictureUpload.recordList.length} 条]`,
    item: pictureUpload.item,
    recordList: pictureUpload.recordList,
    confirmLoading: loading.effects['pictureUpload/onShow'],
    onOk(datas) {
      dispatch({ type: 'pictureUpload/modifyState', payload: { updateVisible: false } });
    },
    onCancel: () => {
      dispatch({ type: 'pictureUpload/modifyState', payload: { updateVisible: false } });
    }
  }

  return(
    <div>
      <Helmet><title>{configApi.appName}</title></Helmet>
      <div className="listHeader">
        <h3><Icon type="bars"/> 图片上传管理<b>（{pictureUpload.totalElements}）</b></h3>
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        <List {...listOpts} />
      </div>
      {pictureUpload.addVisible && <AddModal {...addOpts}/>}
      {pictureUpload.updateVisible && <UpdateModal {...updateOpts}/>}
    </div>
  );
}

export default connect(({ loading, pictureUpload }) => ({ loading, pictureUpload }))(PictureUpload);
