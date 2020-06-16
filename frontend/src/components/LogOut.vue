<template>
  <div>
    <div>
        <router-link to="/profile">{{ $store.state.activeUser }}</router-link>
        <input value="Log out" type="button" @click="$store.dispatch('logout')">
    </div>
  </div>
</template>

<script>

export default {
  name: 'LogOut'
}
</script>

<style scoped>
</style>