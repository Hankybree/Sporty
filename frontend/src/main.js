import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import EventView from './views/EventView.vue'

import {actions} from './scripts/actions.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: HomeView, path: '/'},
    { component: ProfileView, path: '/profil' },
    { component: EventView, path: '/evenemang' }
  ]
})

const store = new Vuex.Store({
  actions: actions,
  state: {
    events: [
      {
        eventSport: "",
        eventTitle: "",
        eventDescription: "",
        eventGoers: [],
        eventUser: 1
      }
    ],
    eventIndex: 0,
    showPostUI: false,
    showPatchUI: false,
    activeUser: -1
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
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
