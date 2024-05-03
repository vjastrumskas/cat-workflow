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
  text-align: center;
  align-content: center;
  border-radius: 15px;
  gap: 2%;
}

@media screen and (max-width: 620px) {
  .exercise-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 5fr;
    gap: 0%;
  }
}
</style>
