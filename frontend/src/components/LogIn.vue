<template>
  <div>
    <div>
      <input id="login-name" type="text" placeholder="Username..." />
      <input id="login-password" type="password" placeholder="Password..." />
      <input value="Log in" type="button" @click="$store.dispatch('login')" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn"
};
</script>

<style scoped>
</style>