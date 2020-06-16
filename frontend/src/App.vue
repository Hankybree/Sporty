<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Logo" height="128" width="128">
      <nav id="links">
        <router-link to="/">Home</router-link>
        <router-link to="/events">Events</router-link>
      </nav>
      <div id="login-ui">
        <div v-if="!$store.state.loggedIn">
          <LogIn></LogIn>
          <router-link to="/signup">Got no account? Sign up here!</router-link>
        </div>
        <div v-else>
          <LogOut></LogOut>
        </div>
      </div>
    </header>
    <router-view id="view"></router-view>
  </div>
</template>

<script>
import LogIn from './components/LogIn.vue'
import LogOut from './components/LogOut.vue'

export default {
  created() {
    if (localStorage.getItem('token') !== null) {
      this.$store.dispatch('getSession')
    }
  },
  name: 'App',
  components: {
    LogIn,
    LogOut
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  display: flex;
  background-color: green;
  height: 20vh;
}
#links {
  display: flex;
  padding: 20px;
}
a {
  margin-right: 20px;
  text-decoration: none;
  color: white;
}
#login-ui {
  float: right;
}
#view {
  min-height: 80vh;
}
</style>
