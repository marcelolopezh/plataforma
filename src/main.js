import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCnRmWADiNgUzVIUAaFxFccSFTJT7d-9PY",
  authDomain: "platformproject-555a3.firebaseapp.com",
  databaseURL: "https://platformproject-555a3.firebaseio.com",
  projectId: "platformproject-555a3",
  storageBucket: "platformproject-555a3.appspot.com",
  messagingSenderId: "296805382097",
  appId: "1:296805382097:web:e1d43673c9156abf9a12f0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
