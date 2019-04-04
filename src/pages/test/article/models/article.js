import * as articleService from '../services/articleService';

export default {
  namespace: 'article',
  state: {
    datas:[],
    totalElements: 0
  },
  reducers: {
    indexPage(state, { payload: data }) {
      return {...state, datas: data.datas, totalElements: data.size};
    }
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      const data = yield call(articleService.list, query);
      console.log("index:", data);
      yield put({ type: 'indexPage', payload: data });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(( location ) => {
        // console.log(location);
        if(location.pathname === '/test/article') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
