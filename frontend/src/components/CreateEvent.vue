<template>
  <div>
    <input id="post-sport" type="text" placeholder="Vilken sport?" />
    <input id="post-title" type="text" placeholder="Ge evenemanget en titel..." />
    <textarea id="post-description" placeholder="Beskriv evenemanget..." cols="30" rows="10"></textarea>
    <input type="button" value="Skapa" @click="$store.dispatch('postEvent')" />
  </div>
</template>

<script>

export default {
  name: "CreateEvent"
}

</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
}

</style>