<template>
  <div id="wrapper">
    <div id="div">
      <div id="form-wrapper">
        <input id="signup-name" type="text" placeholder="Choose a username..." />
        <input id="signup-password" type="password" placeholder="Choose a password..." />
        <input id="confirm-password" type="password" placeholder="Confirm password..." />
        <input id="signup-mail" type="text" placeholder="Enter your e-mail..." />
        <input id="create" type="button" value="Create account" @click="$store.dispatch('signup')" />
      </div>
    </div>
    <div id="info">
      <!-- <img src="../assets/daniel-van-den-berg-29Jx9qyTW14-unsplash.jpg" alt /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpView"
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
  background-color: lemonchiffon;
  width: 100vw;
  height: 100vh;
}
#form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 60vh;
  width: 25vw;
}
#create {
  position: relative;
  background-color: tomato;
  border: solid 2px;
  border-radius: 20px;

  margin: 15px;
  font-size: 20px;
}
input {
  position: relative;
  background-color: dimgrey;
  border: solid 2px;
  border-radius: 20px;
  padding: 5px;
  margin: 15px;
  font-size: 20px;
}
#info {
  /* background-image: url("../assets/daniel-van-den-berg-29Jx9qyTW14-unsplash.jpg"); */
  width: 60vw;
}
#div {
  width: 40vw;
  padding: 25px;
}
background-img {
  object-fit: cover;
  /*object-fit: scale-down;*/
  object-position: -40% 10;

  width: 100%;
  height: 100%;
}
</style>