<template>
  <div class="content">
      <div id="new-pw-ui" v-if="$store.state.canReset">
        <input id="new-password" type="password" placeholder="New password...">
        <input id="confirm-new-password" type="password" placeholder="Confirm new password...">
        <input type="button" value="Change password">
      </div>
      <div v-else>
        You have not requested a password change or your reset session has timed out. Please order a new password reset.
      </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch('validateReset')
  },
  name: 'ResetPasswordView',
  methods: {
  },
  data() {
    return {
      resetToken: null
    }
  }
}
</script>

<style scoped>
.content {
  height: 80vh;
  display: flex;
  flex-direction: column;
}
#new-pw-ui {
  display: flex;
  flex-direction: column;
  width: 30vw;
  margin: auto;
}
</style>