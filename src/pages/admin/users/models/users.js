import * as userService from '../services/users';
import {message} from 'antd';

export default {
  namespace: 'users',
  state: {
    datas:[],
    item:{},
    totalElements:0,
    modalVisible: false,
    updateModalVisible: false,
    townVisible: false,
    roleVisible: false,
    curId: 0,
    curNickname: '',
    authRoleIds: [],
    roleList: [],
    selectRoleIds:[],
    townList:[],
    userTownIds:[],
    treeDto:[],
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
    'list'(state, { payload: datas }) {
      // console.log("list", datas, state);
      const newState = {...state, datas: datas.datas, totalElements: datas.size};
      // console.log("newState", newState);
      return newState;
    },
    'updateUser'(state, { payload: user }) {
      return {...state, item: user, updateModalVisible: true};
    },
    showModal(state, { payload }) {
      return {...state, modalVisible: true}
    },
    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showUpdateModal(state) {
      return {...state, updateModalVisible: true}
    },
    hideUpdateModal(state) {
      return {...state, updateModalVisible: false}
    },
    setModalVisible(state, { payload: options }) {
      return {...state, ...options};
    },
    showRoleModal(state, { payload: datas }) {
      return {...state, roleVisible: true, authRoleIds: datas.authIds, roleList: datas.roleList};
    }
  },
  effects: {
    *userList({ payload: query }, { put, call }) {
      const data = yield call(userService.remoteUserList, query);
      yield put({ type:'list', payload: data });
    },
    *saveUser({payload}, { put, call }) {
      const data = yield call(userService.remoteSaveUser, payload);
      if(data) {
        yield put({ type: 'hideModal' })
      }
    },
    *saveUserTown({payload: obj}, { call}) {
      const data = yield call(userService.saveUserTown, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *delete({ payload: id }, { call }) {
      const data = yield call(userService.remoteDelete, {id});
      if(data) {
        message.success(data.message);
      }
    },
    *update({ payload: id }, { put, call }) {
      const data = yield call(userService.loadOne, {id});
      console.log(data);
      if(data) {
        yield put({ type: 'updateUser', payload: data.obj });
      } else {
        message.warning("没有对应数据");
      }
    },
    *onMatchRole({ payload: id }, { put, call }) {
      const data = yield call(userService.matchRole, {id});
      yield put({ type: 'showRoleModal', payload: data.obj });
    },
    *setRoles({ payload: obj }, { put, call }) {
      yield call(userService.authRole, obj);
      // console.log("setRoles", data);
    },
    *onMatchTown({payload: userId}, {put, call}) {
      const data = yield call(userService.onSetUserTown, {userId});
      if(data) {
        yield put({type: 'modifyState', payload: {userTownIds: data.townIds, townList: data.townList, treeDto: data.treeDto}});
      }
    },
    *setUserTown({payload: obj}, {put,call}) {
      const data = yield call(userService.setUserTown, obj);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/users') {
          dispatch({ type: 'userList', payload: location.query });
        }
      });
    }
  }
}
