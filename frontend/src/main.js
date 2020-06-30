import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import EventView from './views/EventView.vue'
import SignUpView from './views/SignUpView.vue'
import ContactView from './views/ContactView.vue'
import PrivacyView from './views/PrivacyView.vue'
import ResetPasswordView from './views/ResetPasswordView.vue'
import ForgotPasswordView from './views/ForgotPasswordView.vue'

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
    { component: SignUpView, path: '/signup' },
    { component: PrivacyView, path: '/privacypolicy'},
    { component: ContactView, path: '/contact'},
    { component: ForgotPasswordView, path: '/forgotpassword'},
    { component: ResetPasswordView, path: '/:resettoken'},
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
    filteredEvents: [],
    eventIndex: 0,
    showPostUI: false,
    showPatchUI: false,
    activeUser: -1,
    userName: '',
    loggedIn: false,
    canReset: false,
    resetToken: null
  },
  mutations: {
    setEvents(state, newEvents) {
      state.events = newEvents
    },
    setFilteredEvents(state, newFilteredEvents) {
      state.filteredEvents = newFilteredEvents
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
    },
    setCanReset(state, newReset) {
      state.canReset = newReset
    },
    setResetToken(state, newResetToken) {
      state.resetToken = newResetToken
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
