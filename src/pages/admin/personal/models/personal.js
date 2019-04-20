import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    family:{},
    personal:{},
    personalList:{},
    addVisible: false,
    updateVisible: false,
    showVisible: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({type: 'modifyState', payload: {data: data.data, totalElements: data.size}})
    },
    *addOrUpdate({payload: obj}, {call}) {
      const data = yield call(objService.addOrUpdate, obj);
      if(data) {message.success("数据保存成功");}
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      yield put({type: 'modifyState', payload: {item: data.obj, updateVisible: true}})
    },
    *onShow({payload: id}, {call, put}) {
      const data = yield call(objService.onShow, {id: id, type: 'p'});
      yield put({type: 'modifyState', payload: {family: data.family, personalList: data.personalList, personal: data.personal}});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/personal') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
