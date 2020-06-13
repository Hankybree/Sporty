<template>
  <div>
    <input id="signup-name" type="text" placeholder="Choose a username...">
    <input id="signup-password" type="password" placeholder="Choose a password...">
    <input id="confirm-password" type="password" placeholder="Confirm password...">
    <input id="signup-mail" type="text" placeholder="Enter your e-mail...">
    <input type="button" value="Create account" @click="$store.dispatch('signup')">
  </div>
</template>

<script>

export default {
  name: 'SignUpView'
}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
  }
</style>