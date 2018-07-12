<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        appName: "safety-pin"
      }
    }
  }
</script>

<style>

  * {
    font-family: 'Nanum Gothic', sans-serif;
  }

  html {
    overflow: auto !important;
  }
</style>
