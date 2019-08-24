import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
    recordList:[],
    addVisible: false,
    updateVisible: false,
    importVisible: false,
    uploadVisible: false
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
    *onShow({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {batchNo: id});
      yield put({type: 'modifyState', payload: {item: data.pictureUpload, recordList: data.record, updateVisible: true}})
    },
    *deleteObj({payload: id}, {call}) {
      const data = yield call(objService.deleteObj, {batchNo: id});
      if(data) {message.success(data.message)}
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/pictureUpload') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
