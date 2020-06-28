<template>
  <div>
      <h1>Forgot your password? Enter your user name and follow instructions in your mail.</h1>
      <input id="new-pw-user-name" type="text" placeholder="Enter user name...">
      <input type="button" value="Request new password" @click="requestNewPassword()">
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordView",
  methods: {
      requestNewPassword() {
          fetch('http://localhost:3500/resetpassword', {
              body: JSON.stringify({
                  userName: document.querySelector('#new-pw-user-name').value
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          }).then(response => response.json())
          .then(result => {
              if (result.status === 1) {
                  alert(result.message)
                  window.location.replace('http://localhost:8080/#/')
              } else {
                  alert(result.message)
              }
          })
      }
  }
}
</script>

<style scoped>
</style>