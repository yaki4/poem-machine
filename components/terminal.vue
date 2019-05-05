<script>
let VueTerminal = {}
if (process.browser) {
  VueTerminal = require('vue-terminal-ui')
}
export default {
  components: {
    VueTerminal
  },
  methods: {
    onCommand(data, resolve, reject) {
      /* eslint-disable */
      console.log('CO', data)
    }
  }
}
</script>
<template lang="pug">
.terminal
    VueTerminal(intro="bnoj", console-sign="$", allow-arbitrary, height="500px", @command='onCommand')
</template>
<style>
.index{
  background-color: #0000FF !important;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 2em;
}
.command{
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 2em;
}
.startcommand{
  display: flex;
}
</style>
