export default {
  namespace: 'adminIndex',
  state : {
    noConfigTemplateMessage:[],
    noConfigScore:[]
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/index") {
          //dispatch({type: "findNoConfigTemplateMessage", payload: location.query});
        }
      })
    }
  }
}
