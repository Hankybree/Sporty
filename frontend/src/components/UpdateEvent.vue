<template>
  <div>
    <input id="patch-sport" type="text" placeholder="What sport?" :value="$store.state.events[$store.state.eventIndex].eventSport">
    <input id="patch-title" type="text" placeholder="Give the event a title..." :value="$store.state.events[$store.state.eventIndex].eventTitle">
    <textarea id="patch-description" placeholder="Describe the event..." cols="30" rows="10" :value="$store.state.events[$store.state.eventIndex].eventDescription"></textarea>
    <div id="date-time">
      <input id="patch-date" type="date" :value="$store.state.events[$store.state.eventIndex].eventDate">
      <input id="patch-time" type="time" :value="$store.state.events[$store.state.eventIndex].eventDate">
    </div>
    <input id="patch-location" type="text" placeholder="Where will the event take place?" :value="$store.state.events[$store.state.eventIndex].eventLocation">
    <input id="patch-price" type="number" placeholder="What's the price?" :value="$store.state.events[$store.state.eventIndex].eventPrice">
    <input id="patch-max" type="number" placeholder="Maximum number of attendees..." :value="$store.state.events[$store.state.eventIndex].eventMaxAttend">
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
#date-time {
  display: flex;
  flex-direction: row;
}
</style>