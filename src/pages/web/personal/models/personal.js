import * as objService from '../services/objService';

export default {
  namespace: 'webPersonal',
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
    *onShow({payload: query}, {call, put}) {
      // console.log(query);
      query.type = "p";
      const data = yield call(objService.onShow, query);
      yield put({type: 'modifyState', payload: {family: data.family, personalList: data.personalList, personal: data.personal}});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/web/personal/show') {
          dispatch({type: 'onShow', payload: location.query});
        }
      })
    }
  }
}
