import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/peer.min'
import App from './App.vue'
import router from './router'
import store from './store'

import config from './plugins/firebase'

try{
  //initialize fireabse app
  // eslint-disable-next-line
  firebase.initializeApp(config);
  console.log('[Firebase] init');
  // console.log(firebase.auth());
}catch(err){
  console.log('[Firebase] init error');
}

Vue.config.productionTip = false

export const bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
