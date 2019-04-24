import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    assetsList:[], //资产列表
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
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      yield put({type: 'modifyState', payload: {item: data.personal, assetsList: data.assetsList, updateVisible: true}})
    },
    *onShow({payload: id}, {call, put}) {
      const data = yield call(objService.onShow, {id: id, type: 'p'});
      yield put({type: 'modifyState', payload: {family: data.family, personalList: data.personalList, personal: data.personal}});
    },
    *updateBasic({payload: obj}, {call}) {
      const data = yield call(objService.updateBasic, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateWork({payload: obj}, {call}) {
      const data = yield call(objService.updateWork, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateMove({payload: obj}, {call}) {
      const data = yield call(objService.updateMove, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateStudy({payload: obj}, {call}) {
      const data = yield call(objService.updateStudy, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateSafe({payload: obj}, {call}) {
      const data = yield call(objService.updateSafe, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateIndustry({payload: obj}, {call}) {
      const data = yield call(objService.updateIndustry, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *addPersonal({payload: obj}, {call}) {
      const data = yield call(objService.addPersonal, obj);
      if(data) {
        message.success(data.message);
      }
    },
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
