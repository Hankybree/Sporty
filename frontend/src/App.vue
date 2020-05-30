<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png" alt="Logo" height="128" width="128">
      <nav id="links">
        <router-link to="/">Hem</router-link>
        <router-link to="/profil/:anvandare">Profil</router-link>
        <router-link to="/evenemang">Evenemang</router-link>
      </nav>
    </header>
    <router-view id="view"></router-view>
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
  display: flex;
  background-color: green;
  height: 20vh;
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
#view {
  height: 80vh;
}
</style>
