import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import {routerRedux} from 'dva/router'
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import RoleModal from './components/RoleModal';
import TownModal from "./components/TownModal";
import Operator from './components/Operator';
import List from './components/List';
import Filter from './components/Filter';
import {Helmet} from 'react-helmet';

const Users = ({ location, loading, users, dispatch }) => {

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
    onAdd() {
      // console.log("UserIndex operator");
      dispatch({ type: 'users/showModal'});
    }
  }

  const listOpts = {
    dataSource: users.datas,
    loading: loading.models.users,
    location,
    totalElement: users.totalElements,
    onDelConfirm: (id) => {
      dispatch({ type: 'users/delete', payload: id }).then(() => {handleRefresh()});
    },
    onPageChange: (page) => {
      // dispatch({ type: 'users/userList', payload: { page: page-1} });
      handleRefresh({page : page - 1});
    },
    onUpdate: (id) => {
      dispatch({ type: 'users/update', payload: id });
    },
    onMatchRole: (id, nickname) => {
      // console.log(id, nickname);
      dispatch({ type: 'users/setModalVisible', payload: {curId: id, curNickname: nickname} });
      dispatch({ type: 'users/onMatchRole', payload: id });
    },
    onMatchTown: (record) => {
      //console.log(record);
      dispatch({ type: 'users/onMatchTown', payload: record.id }).then(()=>{
        dispatch({type: 'users/modifyState', payload: {townVisible: true, item:record}});
      });
    }
  }

  const modalOpts = {
    maskClosable: false,
    visible: users.modalVisible,
    title: "添加用户",
    okText:'确认提交',
    cancelText: '取消并关闭',
    confirmLoading: loading.effects['users/saveUser'],
    onOk(datas) {
      dispatch({ type: 'users/saveUser', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'users/hideModal' });
    }
  }
  const updateOpts = {
    maskClosable: false,
    visible: users.updateModalVisible,
    title: `修改用户[${users.item.nickname}]`,
    okText:'确认提交',
    cancelText: '取消',
    item: users.item,
    confirmLoading: loading.effects['users/saveUser'],
    onOk(datas) {
      dispatch({ type: 'users/hideUpdateModal' });
      dispatch({ type: 'users/saveUser', payload: datas }).then(() => {handleRefresh()});
    },
    onCancel() {
      dispatch({ type: 'users/hideUpdateModal' });
    }
  }

  const roleOpts = {
    maskClosable: false,
    visible: users.roleVisible,
    title: `为【${users.curNickname}】分配角色`,
    okText: '确认保存',
    cancelText: '取消',
    authRoleIds: users.authRoleIds,
    roleList: users.roleList,
    confirmLoading: loading.effects['users/saveUser'],
    onOk() {
      dispatch({ type: 'users/setModalVisible', payload: { roleVisible: false } });
      // dispatch({ type: 'users/saveUser', payload: datas }).then(() => {handleRefresh()});
      dispatch({ type: 'users/setRoles', payload: { uid: users.curId, rids: users.selectRoleIds } });
    },
    onSetRole(rid) {
      // dispatch({ type: 'users/setRoles', payload: { uid: users.curId, rids: rid } });
      dispatch({ type: 'users/setModalVisible', payload: { selectRoleIds: rid } });
    },
    onCancel() {
      dispatch({ type: 'users/setModalVisible', payload: { roleVisible: false } });
    }
  }

  const townOpts = {
    maskClosable: false,
    visible: users.townVisible,
    title: `为【${users.item.nickname}】指定乡镇`,
    userTownIds: users.userTownIds,
    // townList: users.townList,
    treeDto: users.treeDto,
    confirmLoading: loading.effects['users/saveUserTown'],
    onOk: (value) => {
      // console.log(value);
      // dispatch({ type: 'users/modifyState', payload: { townVisible: false } });
      dispatch({ type: 'users/saveUserTown', payload: {townIds: value, userId: users.item.id,username: users.item.username } }).then(() => {dispatch({ type: 'users/modifyState', payload: { townVisible: false } });});
    },
    setUserTown(tid) {
      // dispatch({ type: 'users/setRoles', payload: { uid: users.curId, rids: rid } });
      //dispatch({ type: 'users/setUserTown', payload: { townId: tid, userId: users.item.id, username: users.item.username } });
    },
    onCancel() {
      dispatch({ type: 'users/modifyState', payload: { townVisible: false } });
    }
  }

  const filterOpts = {
    onFilter(values) {
      handleRefresh({conditions: JSON.stringify(values)});
    }
  }

  return (
    <div>
      <Helmet>
        <title>用户管理</title>
      </Helmet>
      <div className="listHeader">
        <h3><Icon type="bars"/> 用户管理<b>（{users.totalElements}）</b></h3>
        {/*<div className="listOperator"><Button type="primary" icon="plus">添加用户</Button></div>*/}
        <Operator {...operatorOpts}/>
      </div>
      <div className="listFilter">
        <Filter {...filterOpts}/>
      </div>
      <div className="listContent">
        {/*<Table dataSource={users.datas} columns={columns} loading={loading.models.users} rowKey="id"/>*/}
        <List {...listOpts} />
      </div>
      {users.modalVisible && <AddModal {...modalOpts}/>}
      {users.updateModalVisible && <UpdateModal {...updateOpts}/>}
      {users.roleVisible && <RoleModal {...roleOpts}/>}
      {users.townVisible && <TownModal {...townOpts}/>}
    </div>
  );
}

export default connect((({ users, loading }) => ({ users, loading })))(Users);
