<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="logo" />
      <div id="header-title">Sporty</div>
      <nav id="links">
        <router-link to="/">Home</router-link>
        <router-link to="/events">Events</router-link>
      </nav>
      <div id="login-ui">
        <div v-if="!$store.state.loggedIn">
          <LogIn></LogIn>
          <router-link to="/signup">Got no account? Sign up here!</router-link>
          <router-link to="/forgotpassword">Forgot your password?</router-link>
        </div>
        <div v-else>
          <LogOut></LogOut>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <footer>
      <router-link to="/contact">Contact us</router-link>
      <router-link to="/privacypolicy">Privacy policy</router-link>
    </footer>
  </div>
</template>

<script>
import LogIn from "./components/LogIn.vue";
import LogOut from "./components/LogOut.vue";

export default {
  created() {
    if (localStorage.getItem("token") !== null) {
      this.$store.dispatch("getSession");
    }
  },
  name: "App",
  components: {
    LogIn,
    LogOut
  }
};
</script>

<style>
body,
html {
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
.wrapper {
  height: 300px;
  width: 40%;
  display: inline-block;
  overflow: auto;
  position: relative;
  background-color: red;
}
header {
  display: flex;
  flex-direction: row;
  background-color: dimgray;

  height: 10vh;
}
header > img {
  object-fit: contain;
  padding: 5px;
  margin: 5px;
}
#header-title {
  margin: auto auto auto 10px;
  color: black;
  font-size: 2em;
}
#links {
  display: flex;
  padding: 20px;
  align-items: flex-end;
}
a {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}
#login-ui {
  align-self: flex-end;
  margin-right: 20px;
}
#view {
  height: 80vh;
}
#relative {
  position: relative;
}
</style>
