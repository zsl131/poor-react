import * as userService from '../services/login';
import * as objService from '../services/objectService';
import router from 'umi/router';
import {message} from 'antd';
import {checkLogin, setLoginUser} from '../../../utils/authUtils';

export default {
  namespace: 'login',
  state:{
    wxLogin:{},
    phone:null,
    canInputCode: false,
    code:null,
    sendCodeSuc: true,
    loginUsername: '',
    wxError:'0',
    wxMessage:'打开微信扫一扫',
    wxInterval:null,
    loginToken:'',
  },
  reducers: {
    'cacheLogin'(state, { payload: datas }) {
      setLoginUser(datas.obj);
      // router.push("/admin/index");
      router.push("/login/town");
    },
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      const data = yield call(userService.remoteCheckLogin, values);
      if(data) {
        setLoginUser(data.obj);
        router.push("/login/town");
        // router.push("/admin/index");
      }
    },
    *onQrScene({payload: query}, {call,put}) {
      const data = yield call(objService.queryWxLogin, {});
      if(data) {
        yield put({type: 'modifyState', payload: {wxLogin: data.obj}});
        yield sessionStorage.setItem("wxLoginToken", data.obj.token);
      }
    },
    *wxLoginCheck({payload: token}, {call,put,select}) {
      const data = yield call(objService.wxLoginCheck, {token});
      if(data.error) {
        yield put({type: "modifyState", payload: {wxMessage: data.message, wxError: data.error}});
      } else {
        const stateArr = yield select(state=>state); //获取所有state
        clearInterval(stateArr.login.wxInterval); //清除Interval
        yield put({type: 'loginByUsername', payload: {username: data.username, token: data.token}}); //登陆成功
      }
    },
    *sendCode({payload: phone}, {call,put}) {
      const data = yield call(objService.sendCode, {phone});
      if(!data.error) {
        message.success("验证码已发送到手机，请注意查收");
        yield put({type: 'modifyState', payload: {code: data.code, phone: data.phone, canInputCode: true, sendCodeSuc: true, loginUsername: data.username, loginToken: data.token}});
      } else {
        message.error(data.message);
        yield put({type: 'modifyState', payload: {sendCodeSuc: false}});
      }
    },
    *loginByUsername({payload: username}, {call}) {
      const data = yield call(userService.loginByUsername, username);
      if(data) {
        setLoginUser(data.obj);
        // router.push("/admin/index");
        router.push("/login/town");
      }
    }
  },
  subscriptions: {
    setup({history}) {
      return history.listen((location) => {
        if(location.pathname === "/login") {
          if(checkLogin()) {
            // router.push("/admin/index");
            router.push("/login/town");
          }
        }
      });
    }
  }
}
