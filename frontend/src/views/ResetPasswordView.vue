<template>
  <div class="content">
    <div id="new-pw-ui" v-if="$store.state.canReset">
      <input id="new-password" type="password" placeholder="New password..." />
      <input id="confirm-new-password" type="password" placeholder="Confirm new password..." />
      <input type="button" value="Change password" @click="resetPassword" />
    </div>
    <div
      v-else
    >You have not requested a password change or your reset session has timed out. Please order a new password reset.</div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("validateReset");
  },
  name: "ResetPasswordView",
  methods: {
    resetPassword() {
      console.log(this.$store.state.resetToken)
      let newPassword = document.querySelector("#new-password").value
      let confirmPassword = document.querySelector("#confirm-new-password").value

      if (newPassword === confirmPassword) {
        fetch("http://localhost:3500/resetpassword/" + this.$store.state.resetToken, {
          body: JSON.stringify({
            userPassword: newPassword
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PATCH'
        })
          .then(response => response.json())
          .then(result => {
            alert(result.message)
            window.location.replace('http://localhost:8080/#/')
          })
      } else {
        alert('The passwords does not match')
      }
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