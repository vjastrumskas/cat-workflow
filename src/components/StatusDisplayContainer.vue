<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import StatusDisplay from './StatusDisplay.vue';

const katinas = useUserData();
</script>

<template>
  <div class="container-status-chart">
    <StatusDisplay />
    <div class="donut-inner">
      <h5>{{ katinas.user.goal }}</h5>
    </div>
  </div>
</template>

<style scoped>
.container-status-chart {
  height: 200px;
  width: 300px;
  background-color: white;
  position: relative;
}
.donut-inner {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 2em;
}
</style>
