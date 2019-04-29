import React from 'react';
import {connect} from 'dva';
import {Col, Icon, Row} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import LeftTree from "./components/LeftTree";
import {Helmet} from 'react-helmet';

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
    pid: town.pid,
    pname: town.pname,
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
  };

  const treeOpts = {
    menuTree: town.menuTree,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      dispatch({ type: 'town/modifyState', payload: {pid: selectKey, pname: title} });
    }
  };

  return(
    <div>
      <Helmet>
        <title>乡镇管理</title>
      </Helmet>
      <Row style={{"height":"100%"}}>
        <Col span={5} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={19} style={{"background":"#FFF"}}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 乡镇管理<b>（{town.pname}：{town.totalElements}）</b><span className="red">仅限2级，多级无效</span></h3>
            <Operator {...operatorOpts}/>
          </div>
          <List {...listOpts}/>
          {town.updateVisible && <UpdateModal {...updateOpts}/>}
          {town.addVisible && <AddModal {...addOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ loading, town }) => ({ loading, town }))(Town);
