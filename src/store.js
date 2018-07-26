import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      peerId: null
    },
    otherPeer: {
      username: null,
      peerId: null,
      avatar: null,
      subtitle: null,
    },
    users: null,
    loggedIn: false,
    convo: [],  
    conn: null,
    snackbar: {
      show: false,
      color: "green",
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 4000,
      text: 'Hello, I\'m a snackbar'
    }
  },
  mutations: {
    setUser (state, data){
      state.loggedIn = true
      state.user = data
    },
    setToken (state, data){
      state.token = data
    },
    logout (state){
      state.loggedIn = false
      state.token = null
      state.user.username = null
    },
    setOtherPeer (state, data){
      state.otherPeer = data
    },
    setAllUsers (state, data){
      state.users = data
    },
    setSnackbar (state, data){
      state.snackbar = data
    },
    setConn (state, data){
      state.conn = data
    },
    pushMessage (state, data){
      state.convo.push(data)
    }
  },
  actions: {
    setUser ({commit}, data){
      commit('setUser', data)
    },
    setToken ({commit}, data){
      commit('setToken', data)
    },
    logout ({commit}){
      commit('logout')
    },
    setOtherPeer ({commit}, data){
      commit('setOtherPeer', data)
    },
    setAllUsers ({commit}, data){
      commit('setAllUsers', data)
    },
    setSnackbar ({commit}, data){
        commit('setSnackbar', data)
    },
    setConn ({commit}, data){
        commit('setConn', data)
    },
    pushMessage ({commit}, data){
        commit('pushMessage', data)
    }
  }
})
