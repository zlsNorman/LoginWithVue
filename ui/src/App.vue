<template>
  <div id="app">
    <Startseite msg="Startseite"/>
  </div>
</template>

<script>
import Startseite from './components/Startseite.vue'

export default {
  name: 'App',
  components: {
    Startseite
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
</style>
