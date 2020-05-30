<template>
  <div class="content">
    <div id="ui">
      <h1>Evenemang</h1>
      <input type="button" value="Skapa nytt evenemang" @click="$store.dispatch('openPostUI')">
      <div id="post-ui" v-if="$store.state.showPostUI">
        <input id="e-sport" type="text" placeholder="Vilken sport?">
        <input id="e-title" type="text" placeholder="Ge evenemanget en titel...">
        <textarea id="e-description" placeholder="Beskriv evenemanget..." cols="30" rows="10"></textarea>
        <input type="button" value="Skapa" @click="$store.dispatch('postEvent')">
      </div>
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
import {computed} from '../scripts/computed.js'

export default {
  beforeCreate() {
    this.$store.dispatch('getEvents')
  },
  name: 'EventView',
  computed: computed,
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
    width: 25vw;
  }
  #event {
    background-color: yellow;
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
  #post-ui {
    display: flex;
    flex-direction: column;
  }
</style>