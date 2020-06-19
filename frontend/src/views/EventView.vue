<template>
  <div class="content">
    <div id="ui">
      <div id="event-list">
        <h1>Events</h1>

        <div v-if="$store.state.loggedIn">
          <input type="button" value="Create new event" @click="$store.dispatch('openPostUI')" />
          <div id="post-ui" v-if="$store.state.showPostUI">
            <CreateEvent></CreateEvent>
          </div>
        </div>

        <div v-if="$store.state.events.length > 0">
          <div :key="index" v-for="(event, index) in $store.state.events">
            <div @click="selectEvent(index)" class="wrapper">
              <img src="../assets/logo.png" alt />
              <div id="eventcell-info">
                <h2>{{ event.eventTitle }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="event">
      <div v-if="$store.state.events.length > 0">
        <h1 id="title">{{ $store.state.events[$store.state.eventIndex].eventTitle }}</h1>

        <h2>These will come:</h2>
        <div id="participants">
          <div
            :key="goer"
            v-for="goer in $store.state.events[$store.state.eventIndex].eventGoers"
          >{{ goer }}</div>
          <div v-if="$store.state.loggedIn">
            <div
              v-if="!$store.state.events[$store.state.eventIndex].eventGoers.includes($store.state.userName, 0)"
            >
              <input type="button" value="Attend event" @click="$store.dispatch('attendEvent')" />
            </div>
            <div v-else>
              <input
                type="button"
                value="Stop attending event"
                @click="$store.dispatch('attendEvent')"
              />
            </div>
          </div>
        </div>

        <div id="type">
          <p>This is an event of type:</p>
          {{ $store.state.events[$store.state.eventIndex].eventSport }}
        </div>
        <p>Description:</p>
        <div id="description">{{ $store.state.events[$store.state.eventIndex].eventDescription }}</div>
        <div id="created-by">
          <p>Created by:</p>
          {{ $store.state.events[$store.state.eventIndex].eventUserName }}
        </div>

        <div v-if="$store.state.activeUser === $store.state.events[eventIndex].eventUserId">
          <input type="button" value="Edit" @click="$store.dispatch('openPatchUI')" />
          <div id="patch-ui" v-if="$store.state.showPatchUI">
            <UpdateEvent></UpdateEvent>
          </div>
          <input type="button" value="Delete" @click="$store.dispatch('deleteEvent')" />
        </div>
      </div>
      <div v-else>
        <h1>Wow how empty. You should create a new event!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "../scripts/computed.js";
import CreateEvent from "../components/CreateEvent.vue";
import UpdateEvent from "../components/UpdateEvent.vue";

export default {
  beforeCreate() {
    this.$store.dispatch("getEvents");
  },
  name: "EventView",
  computed: computed,
  components: {
    CreateEvent,
    UpdateEvent
  },
  methods: {
    selectEvent(newIndex) {
      this.$store.commit("setEventIndex", newIndex);
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
}
#event-list {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#ui {
  background-color: orange;
  padding: 5px;
  color: white;
  width: 25vw;
}
#event {
  background-color: tomato;
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
.wrapper {
  display: flex;
  height: 13vh;
  width: 20vw;
  border: solid 2px black;
  border-radius: 5px;
  background-color: blanchedalmond;
  overflow: hidden;
  margin: 10px;
}
.wrapper > img {
  border: solid 2px black;
  max-width: 4vw;
  background-color: purple;
}
#eventcell-info {
  display: flex;
  flex-direction: column;
}
h2 {
  color: black;
  margin: 5px;
}
h1 {
  color: black;
  margin: 5px;
}
p {
  color: black;
}
</style>