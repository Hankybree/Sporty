<template>
  <div class="wrapper">
    <img src="../assets/Logo.png" alt />
  </div>
</template>

<script>
export default {
  name: "EventCell"
};
</script>

<style scoped>
.wrapper {
  display: flex;
  height: 13vh;
  width: 20vw;
  border: solid 2px black;
  border-radius: 5px;
  background-color: blanchedalmond;
  overflow: hidden;
}
.wrapper > img {
  border: solid 2px black;
  max-width: 4vw;
  background-color: purple;
}
h3 {
  margin: 5px;
  color: black;
}

h4 {
  margin: 5px;
  padding-top: 5px;
  color: black;
}
</style>