<template>
  <div class="content">
    <div id="ui">
      <h1>Events</h1>
      <div :key="index" v-for="(event, index) in $store.state.events">
        <div @click="selectEvent(index)">{{ event.eventTitle }}</div>
      </div>
    </div>
    <div id="event">
      <h1>{{ $store.state.events[$store.state.eventIndex].eventTitle }}</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EventView',
  computed: {
    eventIndex: {
      get() {
        return this.$store.state.eventIndex
      },
      set(newIndex) {
        this.state.commit('setEventIndex', newIndex)
      }
    }
  },
  methods: {
    selectEvent(newIndex) {
      this.$store.state.eventIndex = newIndex
    }
  }
}
</script>

<style scoped>
  .content {
    display: flex;
  }
  #ui {
    background-color: red;
    color: white;
    height: 90vh;
    width: 25vw;
  }
  #event {
    background-color: yellow;
    height: 90vh;
    flex-grow: 1;
  }
</style>