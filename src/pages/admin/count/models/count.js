import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    xbPie:[],
    town:{},
    showDataVisible: false,
    showDataTitle:'统计',
    personalList:[],
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({payload: query}, {call,put}) {
      const data = yield call(objService.index, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {town: data.town}})
    },
    *queryData({payload: query}, {call, put}) {
      const data = yield call(objService.queryData, query);
      // console.log(data);
      yield put({type: 'modifyState', payload: {personalList: data.personalList}});
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
