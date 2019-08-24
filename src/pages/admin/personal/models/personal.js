import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    xbPie:[],
    assetsList:[], //资产列表
    family:{},
    town:{},
    personal:{},
    personalList:{},
    addVisible: false,
    updateVisible: false,
    showVisible: false,
    uploadVisible: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {data: data.data, totalElements: data.size, xbPie: data.xbPie, town: data.town}});
    },
    *onUpdate({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      yield put({type: 'modifyState', payload: {item: data.personal, assetsList: data.assetsList, updateVisible: true}})
    },
    *onShow({payload: id}, {call, put}) {
      const data = yield call(objService.onShow, {id: id, type: 'p'});
      yield put({type: 'modifyState', payload: {family: data.family, personalList: data.personalList, personal: data.personal, assetsList: data.assetsList}});
    },
    *updateBasic({payload: obj}, {call}) {
      const data = yield call(objService.updateBasic, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *updateWork({payload: obj}, {call}) {
      const data = yield call(objService.updateWork, obj);
      if(data.flag==='1') {
        message.success(data.message);
      } else if(data.flag==='0') {
        message.error(data.errorMsg);
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
    *addAssets({payload: obj}, {call}) {
      const data = yield call(objService.addAssets, obj);
      if(data) {
        message.success(data.message);
      }
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
