<template>
  <div class="content">
    <div id="ui">

      <h1>Events</h1>

      <div v-if="$store.state.loggedIn">
        <input type="button" value="Create new event" @click="$store.dispatch('openPostUI')">
        <div id="post-ui" v-if="$store.state.showPostUI">
          <CreateEvent></CreateEvent>
        </div>
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

        <h2>These will come:</h2>
        <div id="participants">
          <div :key="goer" v-for="goer in $store.state.events[$store.state.eventIndex].eventGoers">
            {{ goer }}
          </div>
        </div>

        <div id="type">This is an event of type: {{ $store.state.events[$store.state.eventIndex].eventSport }}</div>
        <div id="description">{{ $store.state.events[$store.state.eventIndex].eventDescription }}</div>
        <div id="created-by">Created by: {{ $store.state.events[$store.state.eventIndex].eventUserName }}</div>

        <div v-if="$store.state.activeUser === $store.state.events[eventIndex].eventUserId">
          <input type="button" value="Edit" @click="$store.dispatch('openPatchUI')">
          <div id="patch-ui" v-if="$store.state.showPatchUI">
            <UpdateEvent></UpdateEvent>
          </div>
          <input type="button" value="Delete" @click="$store.dispatch('deleteEvent')">
        </div>

      </div>
      <div v-else>
        <h1>Wow how empty. You should create a new event!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '../scripts/computed.js'
import CreateEvent from '../components/CreateEvent.vue'
import UpdateEvent from '../components/UpdateEvent.vue'

export default {
  beforeCreate() {
    this.$store.dispatch('getEvents')
  },
  name: 'EventView',
  computed: computed,
  components: {
    CreateEvent,
    UpdateEvent
  },
  methods: {
    selectEvent(newIndex) {
      this.$store.commit('setEventIndex', newIndex)
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