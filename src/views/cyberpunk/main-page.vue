<template>
  <div id="app">
    <BackgroundStars :key="componentKey" />
  </div>
</template>

<script lang="ts" setup>
import BackgroundStars from '@/views/component/background-stars.vue'
const componentKey = Date.now()
</script>