<template>
  <div>
    <input id="post-sport" type="text" placeholder="What sport?">
    <input id="post-title" type="text" placeholder="Give the event a title...">
    <textarea id="post-description" placeholder="Describe the event..." cols="30" rows="10"></textarea>
    <div id="date-time">
      <input id="post-date" type="date">
      <input id="post-time" type="time">
    </div>
    <input id="post-location" type="text" placeholder="Where will the event take place?">
    <input id="post-price" type="number" placeholder="What's the price?" value="0">
    <input id="post-max" type="number" placeholder="Maximum number of attendees...">
    <input type="button" value="Create" @click="$store.dispatch('postEvent')" />
  </div>
</template>

<script>
export default {
  name: "CreateEvent",
  methods: {
    print() {
      // console.log(document.querySelector('#post-date').value + ' ' + document.querySelector('#post-time').value)
    }
  }
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