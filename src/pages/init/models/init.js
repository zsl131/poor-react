import * as initService from '../service/initService';
import router from 'umi/router';
import { message } from 'antd';
export default {
  namespace: 'init',
  state: {
    spinVisible: true
  },
  reducers: {
    showSpin(state) {
      return {...state, spinVisible: true};
    },
    hideSpin(state) {
      return {...state, spinVisible: false};
    }
  },
  effects: {
    *load({payload}, { put, call }) {
      const data = yield call(initService.remoteLoad);
      if(data.size===0 || data.datas.initFlag !== '1') {
        yield put({ type: 'hideSpin' });
      } else {
        router.push("/login");
      }
    },
    *initSystem({ payload: values }, { put, call }) {
      const data = yield call(initService.initSystem, values);
      if(data) {
        yield put({ type: 'showSpin' });
        message.success(data.message, 3, (res) => {
          router.push("/login");
        });
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/init') {
          dispatch({ type: 'load' });
        }
      });
    }
  }
}
