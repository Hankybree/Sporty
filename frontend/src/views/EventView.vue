<template>
  <div class="content">
    <div id="ui">
      <h1>Evenemang</h1>
      <input type="button" value="Skapa nytt evenemang" @click="$store.dispatch('openPostUI')">
      <div id="post-ui" v-if="$store.state.showPostUI">
        <input id="post-sport" type="text" placeholder="Vilken sport?">
        <input id="post-title" type="text" placeholder="Ge evenemanget en titel...">
        <textarea id="post-description" placeholder="Beskriv evenemanget..." cols="30" rows="10"></textarea>
        <input type="button" value="Skapa" @click="$store.dispatch('postEvent')">
      </div>
      <div v-if="$store.state.events.length > 0">
        <div :key="index" v-for="(event, index) in $store.state.events">
          <div @click="selectEvent(index)">{{ event.eventTitle }}</div>
        </div>
      </div>
    </div>
    <div id="event">
      <div v-if="$store.state.events.length > 0">
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
        <input type="button" value="Redigera" @click="$store.dispatch('openPatchUI')">
        <div id="patch-ui" v-if="$store.state.showPatchUI">
          <input id="patch-sport" type="text" placeholder="Vilken sport?" :value="$store.state.events[$store.state.eventIndex].eventSport">
          <input id="patch-title" type="text" placeholder="Ge evenemanget en titel..." :value="$store.state.events[$store.state.eventIndex].eventTitle">
          <textarea id="patch-description" placeholder="Beskriv evenemanget..." cols="30" rows="10" v-model="$store.state.events[$store.state.eventIndex].eventDescription"></textarea>
          <input type="button" value="Spara ändringar" @click="$store.dispatch('patchEvent')">
        </div>
        <input type="button" value="Radera" @click="$store.dispatch('deleteEvent')">
      </div>
      <div v-else>
        <h1>Här var det tomt! Skapa ett nytt evenemang</h1>
      </div>
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
  #event > div > div {
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
  #patch-ui {
    display: flex;
    flex-direction: column;
  }

</style>