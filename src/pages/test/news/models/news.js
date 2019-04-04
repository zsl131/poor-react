import * as newsService from '../services/newsService';
export default {
  namespace: 'news',
  state: {
    datas:[],
    totalElements:0
  },
  reducers: {
    'list'(state, { payload: datas }) {
      return {...state, datas: datas.datas, totalElements: datas.size};
    }
  },
  effects: {
    *newsList({ payload: query }, { call, put }) {
      const data = yield call(newsService.query, query);
      yield put({ type: 'list', payload: data });
    }
  },
  subscriptions: {
    setup({ history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/test/news') {
          dispatch({ type: 'newsList', payload: location.query });
        }
      });
    }
  }
}
