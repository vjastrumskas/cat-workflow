<script setup lang="ts">
import FireIcon from '../assets/FireIcon.vue';
import { useUserData } from '../stores/userData.ts';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';

const katinass = useModalSettingsActive();

const katinas = useUserData();
</script>

<template>
  <div class="container-steps">
    <div class="title-container">Exercise</div>
    <div class="steps-completed-container">
      <div class="icon-container"><FireIcon class="shoe-icon" /></div>
      <div class="steps-completed">
        {{ katinas.computeCaloriesBurntSteps() }} +
        {{ katinas.getCaloriesBurnt() }} =
        {{ katinas.computeTotalCaloriesBurnt().toString() }}
      </div>
    </div>
    <div class="goal-container">
      <div class="input-containter">
        <button
          @click="katinas.updateCalories($route.params.date, 'increment')"
        >
          +
        </button>
        <button
          @click="katinas.updateCalories($route.params.date, 'decrement')"
        >
          -
        </button>
        <button @click="katinass.toggleNewCaloriesIsActive()">Edit</button>

        <button @click="katinas.updateCalories($route.params.date, 'zero')">
          Zero
        </button>
      </div>
    </div>
    <div class="innner-container-exercise-chart">
      <div class="goal-statement">
        Have you exercised today? Enter your calories here.
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-steps {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  text-align: center;
  align-content: center;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
}

.innner-container-exercise-chart {
  height: 30px;
  width: 260px;
  padding-left: 15px;
  padding-right: 15px;
}

.icon-container {
  display: flex;
  text-align: end;
  justify-content: end;
  height: 40px;
  width: 40px;
  padding-top: 10px;
}

.shoe-icon {
  width: 100%; /* Ensure the SVG scales to fit the container */
  height: auto;
}

.steps-completed-container {
  margin-left: 15px;
  display: grid;
  grid-template-columns: 2fr 8fr;
}

.goal-statement {
  display: flex;
  text-align: left;
}

.steps-completed {
  display: flex;
  text-align: left;
  align-items: center;
  font-size: 1.5em;
}

.input-containter {
  display: flex;
  text-align: left;
  align-items: center;
  padding: 10px;
}

.title-container {
  display: flex;
  text-align: left;
  align-items: center;
  padding-left: 10px;
  font-size: 2em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.4em 0.8em;
  margin-left: 5px;

  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f3f3f3;
  color: #213547;

  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
