<template>
  <div>
    <div>
      <form>
        <input id="login-name" type="text" placeholder="Username...">
        <input id="login-password" type="password" placeholder="Password...">
        <input value="Log in" type="submit" @click.prevent="login($event)">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  methods: {
    login(event) {
      event.stopPropagation()
      this.$store.dispatch('login')
    }
  }
}
</script>

<style scoped>
</style>