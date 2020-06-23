import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import EventView from './views/EventView.vue'
import SignUpView from './views/SignUpView.vue'

import { actions } from './scripts/actions.js'

//import VideoBg from "vue-videobg";

Vue.use(VueRouter)
Vue.use(Vuex)
//Vue.component("video-bg", VideoBg);

const router = new VueRouter({
  routes: [
    { component: HomeView, path: '/' },
    { component: ProfileView, path: '/profile' },
    { component: EventView, path: '/events' },
    { component: SignUpView, path: '/signup' }
  ]
})

const store = new Vuex.Store({
  actions: actions,
  state: {
    events: [
      {
        eventSport: '',
        eventTitle: '',
        eventDescription: '',
        eventGoers: [],
        eventUser: 1,
        eventUserName: ''
      }
    ],
    eventIndex: 0,
    showPostUI: false,
    showPatchUI: false,
    activeUser: -1,
    userName: '',
    loggedIn: false
  },
  mutations: {
    setEvents(state, newEvents) {
      state.events = newEvents
    },
    setEventIndex(state, newIndex) {
      state.eventIndex = newIndex
    },
    setPostUI(state, newPostUI) {
      state.showPostUI = newPostUI
    },
    setPatchUI(state, newPatchUI) {
      state.showPatchUI = newPatchUI
    },
    setActiveUser(state, newActiveUser) {
      state.activeUser = newActiveUser
    },
    setLoggedIn(state, newLoggedIn) {
      state.loggedIn = newLoggedIn
    },
    setUserName(state, newUserName) {
      state.userName = newUserName
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  // VideoBg

}).$mount('#app')
