import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    dataPie: [],
    dataPieBqsj:[],
    familyList:[],
    title: "",
    bqdd: '',
    bqsj:'',
    type: '',
    showDataVisible: false,
    showFamilyVisible: false,
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
      yield put({type: 'modifyState', payload: {dataPie: data.data}})
    },
    *queryData({payload: query}, {call, put}) {
      const data = yield call(objService.queryData, query);
      // console.log(data);
      const familyList = data.familyList;
      yield put({type: "modifyState", payload: {familyList: familyList, showDataVisible: true, title: query.title+"（"+familyList.length+"）"}});
    },
    *findByBqsj({payload: query}, {call, put}) {
      const data = yield call(objService.findByBqsj, query);
      // console.log(data);
      const res = data.data;
      yield put({type: "modifyState", payload: {dataPieBqsj: res, showDataVisible: true, title: query.title+"（"+res.length+"）"}});
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/moveCount') {
          dispatch({type: 'index', payload: location.query});
        }
      })
    }
  }
}
