<template>
  <div id="app">
    <Title msg="Welcome to Your Vue.js App"/>
    <Box />
  </div>
</template>

<script>
import Title from './components/Title.vue'
import Box from './components/Box.vue';

export default {
  name: 'App',
  components: {
    Title, Box
  }
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
}
</style>
