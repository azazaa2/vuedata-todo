<template>
  <div class="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '@/components/UI/navbar.vue'
export default {
  components: {
    navbar
  }
}
</script>

<style>
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>