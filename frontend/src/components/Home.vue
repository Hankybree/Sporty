<template>
  <div id="frame">
    <!-- <input type="button" value="Skapa event" />
    <input type="button" value="Se event" />-->
    <!-- <router-link to="/" tag="button">Home</router-link> -->
    <h1>Sporty</h1>
    <router-link to="/events" tag="button">Events</router-link>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
#frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: tomato;
}
#frame > button {
  position: relative;
  background-color: tomato;
  border: solid 2px;
  border-radius: 20px;
  width: 15%;
  height: 5%;
  margin: 15px;
  font-size: 20px;
}
</style>

