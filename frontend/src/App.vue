<template>
  <div id="app">
    <header>
      <nav id="links">
        <router-link to="/">Home</router-link>
        <router-link to="/profile/:user">Profile</router-link>
        <router-link to="/events">Events</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
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
  background-color: green;
  height: 10vh;
}
#links {
  display: flex;
  padding: 20px;
}
#links > a {
  margin-right: 20px;
  text-decoration: none;
  color: white;
}
</style>
