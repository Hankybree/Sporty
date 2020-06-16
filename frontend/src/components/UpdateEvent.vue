<template>
  <div>
    <input id="patch-sport" type="text" placeholder="Vilken sport?" :value="$store.state.events[$store.state.eventIndex].eventSport">
    <input id="patch-title" type="text" placeholder="Ge evenemanget en titel..." :value="$store.state.events[$store.state.eventIndex].eventTitle">
    <textarea id="patch-description" placeholder="Beskriv evenemanget..." cols="30" rows="10" v-model="$store.state.events[$store.state.eventIndex].eventDescription"></textarea>
    <input type="button" value="Save changes" @click="$store.dispatch('patchEvent')">
  </div>
</template>

<script>
export default {
  name: 'UpdateEvent'
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>