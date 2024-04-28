<script setup lang="ts">
import StepsContainer from './StepsContainer.vue';
import CalorieContainer from './CalorieContainer.vue';
</script>

<template>
  <div class="exercise-container">
    <StepsContainer />
    <CalorieContainer />
  </div>
</template>

<style scoped>
.exercise-container {
  display: grid;
  grid-template-columns: 5fr 5fr;
  gap: 2%;
  text-align: center;
  align-content: center;
  min-height: 60px;
  border-radius: 15px;
}
</style>
