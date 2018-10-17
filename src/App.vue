<template>
  <div id="app">
    <Vugantt msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Vugantt from './components/Vugantt.vue'

export default {
  name: 'app',
  components: {
    Vugantt
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
