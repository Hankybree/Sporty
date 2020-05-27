<template>
  <div class="content">
    <div id="ui">
      <h1>Events</h1>
      <div :key="index" v-for="(event, index) in $store.state.events">
        <div @click="selectEvent(index)">{{ event.eventTitle }}</div>
      </div>
    </div>
    <div id="event">
      <h1 id="title">{{ $store.state.events[$store.state.eventIndex].eventTitle }}</h1>
      <h2>Dessa kommer:</h2>
      <div id="participants">
        <div :key="goer" v-for="goer in $store.state.events[$store.state.eventIndex].eventGoers">
          {{ goer }}
        </div>
      </div>
      <div id="type">Detta är ett event av typen: {{ $store.state.events[$store.state.eventIndex].eventSport }}</div>
      <div id="description">{{ $store.state.events[$store.state.eventIndex].eventDescription }}</div>
      <div id="created-by">Skapat av: {{ $store.state.events[$store.state.eventIndex].eventUser }}</div>
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
    text-align: center;
  }
  #event > div {
    margin: 20px;
  }
  #participants {
    display: inline-flex;
    flex-direction: row;
  }
</style>