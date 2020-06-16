<template>
  <div>
    <div>
      <form>
        <input id="login-name" type="text" placeholder="Username...">
        <input id="login-password" type="password" placeholder="Password...">
        <input value="Log in" type="submit" @click="$store.dispatch('login')">
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LogIn'
}
</script>

<style scoped>
</style>