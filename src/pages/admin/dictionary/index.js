import React from 'react';
import {connect} from 'dva';
import {Col, Icon, Row} from 'antd';
import {routerRedux} from 'dva/router'
import Operator from './components/Operator';
import List from './components/List';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import LeftTree from './components/LeftTree';
import {Helmet} from 'react-helmet';

const Dictionary = ({
                  dispatch,
                  loading,
                  dictionary,
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
      dispatch({ type: 'dictionary/modifyState', payload: {addVisible: true}});
    }
  }

  const filterOpts = {
    onFilter: (params) => {
      handleRefresh({conditions: JSON.stringify(params)});
    }
  }

  const listOpts = {
    dataSource: dictionary.data,
    loading: loading.models.dictionary,
    location,
    totalElement: dictionary.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'dictionary/deleteObj', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      // console.log("update::", id);
      dispatch({ type: 'dictionary/onUpdate', payload: id });
    },
    handleImport:(dictionary) => {
      console.log(dictionary)
      dispatch({type: 'dictionary/modifyState', payload: {item: dictionary, importVisible: true}});
    }
  }

  const addOpts = {
    maskClosable: false,
    visible: dictionary.addVisible,
    pid: dictionary.pid,
    title: "添加数据字典["+dictionary.pname+"]",
    confirmLoading: loading.effects['dictionary/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'dictionary/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'dictionary/modifyState', payload: { addVisible: false } });
      });
    },
    onCancel() {
      dispatch({ type: 'dictionary/modifyState', payload: { addVisible: false } });
    }
  }

  const updateOpts = {
    maskClosable: false,
    visible: dictionary.updateVisible,
    title: `修改数据[${dictionary.item.name}]`,
    item: dictionary.item,
    confirmLoading: loading.effects['dictionary/addOrUpdate'],
    onOk(datas) {
      dispatch({ type: 'dictionary/addOrUpdate', payload: datas }).then(() => {
        handleRefresh();
        dispatch({ type: 'dictionary/modifyState', payload: { updateVisible: false } });
      });
    },
    onCancel: () => {
      dispatch({ type: 'dictionary/modifyState', payload: { updateVisible: false } });
    }
  }

  const treeOpts = {
    menuTree: dictionary.menuTree,
    onSelect: (key, title) => {
      let selectKey = key[0];
      if(!selectKey) {title = "根分类"; selectKey = 0;}
      handleRefresh({"pid": selectKey});
      dispatch({ type: 'dictionary/modifyState', payload: {pid: selectKey, pname: title} });
    }
  }

  return(
    <div>
      <Helmet>
        <title>数据字典管理</title>
      </Helmet>
      <Row style={{"height":"100%"}}>
        <Col span={5} style={{"height":"100%"}}>
          <LeftTree {...treeOpts}/>
        </Col>
        <Col span={19} style={{"background":"#FFF"}}>
          <div className="listHeader">
            <h3><Icon type="bars"/> 数据字典管理<b>（{dictionary.pname}：{dictionary.totalElements}）</b><span className="red">仅限2级，多级无效</span></h3>
            <Operator {...operatorOpts}/>
          </div>
          <List {...listOpts}/>
          {dictionary.updateVisible && <UpdateModal {...updateOpts}/>}
          {dictionary.addVisible && <AddModal {...addOpts}/>}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ loading, dictionary }) => ({ loading, dictionary }))(Dictionary);
