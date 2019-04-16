import * as objService from '../services/objService';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:{},
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
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/record') {
          dispatch({type: 'list', payload: location.query});
        }
      })
    }
  }
}
