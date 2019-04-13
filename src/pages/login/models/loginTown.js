import * as userService from '../services/login';
import * as objService from '../services/objectService';
import router from 'umi/router';
import {message} from 'antd';
import {checkLogin, getUserTownLevel, setLoginUser} from '../../../utils/authUtils';

export default {
  namespace: 'loginTown',
  state:{
    townList:[],
    picList:[],
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *listTown({ payload: values }, { put, call }) {
      const level = getUserTownLevel();
      //console.log("level::", level);
      const data = yield call(objService.findTown, {level});
      //console.log(data);
      yield put({type: 'modifyState', payload: {townList: data.townList, picList: data.picList}});
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === "/login/town") {
          dispatch({type: 'listTown', payload: location.query});
        }
      });
    }
  }
}
