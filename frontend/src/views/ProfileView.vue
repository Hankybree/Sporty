<template>
  <div class="content">
    Profile

    <input type="button" value="Delete account" @click="$store.dispatch('deleteAccount')">
  </div>
</template>

<script>

export default {
  name: 'ProfileView'
}
</script>

<style scoped>

</style>