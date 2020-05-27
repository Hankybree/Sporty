import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import ProfileView from './views/ProfileView.vue'
import EventView from './views/EventView.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes: [
    { component: HomeView, path: '/'},
    { component: ProfileView, path: '/profile/:user' },
    { component: EventView, path: '/events' }
  ]
})

const store = new Vuex.Store({
  state: {
    events: [
      {
        eventSport: "Fotboll",
        eventTitle: "Fotbollsmatch",
        eventDescription: "Vi ska spela fotboll",
        eventGoers: ["Frank-Jakob", "Jakob"],
        eventUser: 1
      },
      {
        eventSport: "Basket",
        eventTitle: "21an",
        eventDescription: "21an yo!",
        eventGoers: ["Frank-Jakob", "Jakob"],
        eventUser: 1
      }
    ],
    eventIndex: 0
  },
  mutations: {
    setEventIndex(state, newIndex) {
      state.eventIndex = newIndex
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
