import * as objService from '../services/objectService';

export default {
  namespace: 'loginTown',
  state:{
    townList:[],
    picList:[],
    town:{},
    children:[], //子乡镇
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *listTown({ payload: values }, { put, call }) {
      // const level = getUserTownLevel();
      //console.log("level::", level);
      const data = yield call(objService.findTown, values);
      // console.log(data);
      yield put({type: 'modifyState', payload: {townList: data.townList, picList: data.picList, town: data.town, children: data.children}});
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
