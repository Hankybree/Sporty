<template>
  <div class="content">
      Do you have a question or want to report an issue? Use this contact form and we'll get back to you!
      <form id="contact-form">
          <input id="contact-subject" type="text" placeholder="Subject..." required>
          <input id="contact-mail" type="email" placeholder="Your e-mail..." required>
          <textarea id="contact-message" cols="30" rows="10" placeholder="Enter your message here..." required></textarea>
          <input id="contact-button" type="submit" value="Submit question" @click.prevent="sendMessage()">
      </form>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  methods: {
      sendMessage() {
          const subject = document.querySelector('#contact-subject')
          const email = document.querySelector('#contact-mail')
          const message = document.querySelector('#contact-message')
          
          if(subject.checkValidity() && email.checkValidity() && message.checkValidity()) {
              alert('Sent')
          } else {
              alert('Fill in all fields')
          }
      }
  }
}
</script>

<style scoped>
.content {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
}
#contact-form {
    display: flex;
    flex-direction: column;
    width: 30vw;
    margin: auto;
}
</style>