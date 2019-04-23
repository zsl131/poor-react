import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    xbPie:[],
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({payload: query}, {call,put}) {
      const data = yield call(objService.index, query);
      yield put({type: 'modifyState', payload: data})
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/count') {
          dispatch({type: 'index', payload: location.query});
        }
      })
    }
  }
}
