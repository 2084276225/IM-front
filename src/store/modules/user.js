// const state = {
//   username: ''
// }
//
// const actions = {
//   setUsername(state,username){
//     state.username = username
//   }
// }
//
// const mutations = {
//
// }
//
// const getters = {
//
// }

const users = {
  namespaced: true,
  state: {username: '',isLogin:false,avatar:'',nickname:''},
  actions: {},
  mutations: {
    setUsername(state,username){
      state.username = username
    },
    setIsLogin(state,value){
      state.isLogin = value
    },
  }
}

export default users
