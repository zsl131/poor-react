import {updatePwd} from "../services/users";
import { message } from "antd";
import * as smsService from "../services/smsService";
import * as wxBindService from '../services/wxBindService';
import {getLoginUser, setLoginUserOnly} from "../../../../utils/authUtils";
export default {
  namespace: 'userPwd',
  state: {
    phone:null,
    canInputCode: false,
    code:null,
    wxAccount: {},
    hasBindWx: '',
    wxError:'',
    wxMessage: '打开微信扫一扫',
    bindToken: '',
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *updatePwd({ payload: values }, { call }) {
      const data = yield call(updatePwd, values);
      // console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *sendCode({payload: phone}, {call,put}) {
      const data = yield call(smsService.sendCode, {phone});
      console.log(data);

      if(data) {
        message.success("验证码已发送到手机，请注意查收");
        yield put({type: 'modifyState', payload: {code: data.code, phone: data.phone, canInputCode: true}});
      }
    },
    *bindPhone({payload: phone}, {call}) {
      const data = yield call(smsService.bindPhone, {phone});
      if(data) {
        message.success(data.message);
        let loginUser = getLoginUser();
        loginUser.phone = phone;
        setLoginUserOnly(loginUser);
      }
    },
    *queryBindWx({payload: query}, {call,put}) {
      const loginUser = getLoginUser();
      query.username = loginUser.username;
      const data = yield call(wxBindService.buildQr4Bind, query);
      yield put({type: 'modifyState', payload: {hasBindWx: data.hasBind, wxAccount: data.obj}});
    },
    *wxBindCheck({payload: obj}, {call,put}) {
      const loginUser = getLoginUser();
      obj.username = loginUser.username;
      const data = yield call(wxBindService.wxBindCheck, obj);
      yield put({type: 'modifyState', payload: {wxError: data.error, wxMessage: data.message}});
      if(!data.error) { //绑定成功
        const newData = yield call(wxBindService.buildQr4Bind, {username: loginUser.username});
        yield put({type: 'modifyState', payload: {hasBindWx: newData.hasBind, wxAccount: newData.obj}});
      }
    }
  },
  subscriptions: {

  }
}
