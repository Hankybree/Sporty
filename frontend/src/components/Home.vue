<template>
  <div id="frame">
    <input type="button" value="Skapa event" />
    <input type="button" value="Se event" />
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
#frame > input {
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

