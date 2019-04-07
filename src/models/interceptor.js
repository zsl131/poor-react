import * as interceptorService from '../services/interceptorService';
import {getAppConfig, setAppConfig} from "../utils/InitSystemUtils";

const APP_CONFIG_SESSION_NAME = "appConfig";
export default {
  namespace: 'interceptor',
  state: {
    appConfig:[],
  },
  reducers: {
    'cacheAppConfig'(state, { payload: data }) {
      sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data));
      return {...state, appConfig: data || []};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    reloadPage(state, {payload}) {
      window.location.reload();
      return {...state};
    }
  },
  effects: {
    *init({ payload }, { put, call }) {

      // const appConfig = sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
      // const wxConfig = sessionStorage.getItem(WX_CONFIG_SESSION_NAME);
      const appConfig = getAppConfig();
      // console.log(wxConfig, appConfig)
      if(appConfig === undefined || appConfig === null || appConfig === 'null') {
        const data = yield call(interceptorService.loadWebBaseConfig);
        // sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data.datas.ac));
        // sessionStorage.setItem(WX_CONFIG_SESSION_NAME, JSON.stringify(data.datas.wc));
        setAppConfig(JSON.stringify(data.datas.ac));
        yield put({type: 'modifyState', payload: {appConfig: data.datas.ac}});
      }  else {
        yield put({type: 'modifyState', payload: {appConfig: JSON.parse(appConfig)}});
      }
    },
    *queryLoginAccount({ payload: code }, { call, put }) {
      const data = yield call(interceptorService.queryLoginAccount, { code: code });
      if(data) {
        yield sessionStorage.setItem("loginAccount", JSON.stringify(data.datas));
        yield put({type: 'reloadPage', payload:{}});
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return dispatch({ type: 'init'})
    }
  }
}
