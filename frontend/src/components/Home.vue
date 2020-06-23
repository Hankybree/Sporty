<template>
  <div class="content">
    <!-- <input type="button" value="Skapa event" />
    <input type="button" value="Se event" />-->
    <!-- <router-link to="/" tag="button">Home</router-link> -->
    <div id="copy">
      Haka på allt från tennis till discobowling. Spana in andras aktiviteter och lägg upp egna.
      Gå med du också, träffa nya människor med samma intressen som du och knyt meningsfulla kontakter i ditt närområde.
      Häng med, det blir kul!
    </div>
    <!-- <div id="frame">
      <h1>Sporty</h1>
      <router-link to="/events" tag="button">Events</router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
/* * {
  border: solid 1px black;
} */
.content {
  display: flex;
  flex-direction: column;
  background-color: tomato;
  min-height: 100vh;
}
#copy {
  margin: auto;
  width: 50vw;
  font-size: 1.5em;
}
#frame {
  display: flex;
  align-items: center;
  justify-content: center;
  
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

