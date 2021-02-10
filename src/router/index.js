import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import routes from './routes'

Vue.use(VueRouter)

const firebaseConfig = {
  apiKey: 'AIzaSyDEAw9bKHfqrH3xHseIU4dOrKh0S86AMt8',
  authDomain: 'owlietodo.firebaseapp.com',
  projectId: 'owlietodo',
  storageBucket: 'owlietodo.appspot.com',
  messagingSenderId: '96914357592',
  appId: '1:96914357592:web:df3c2405a477f15804b92d'
}

firebase.initializeApp(firebaseConfig)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
