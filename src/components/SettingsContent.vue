<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
// import { setItem } from '../services/localStorage.ts';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';

const katinass = useModalSettingsActive();

const katinas = useUserData();

/**
//  * Calculates estimated daily calorie needs based on age and weight.
//  * @param {number} weightInKg - Weight in kilograms.
//  * @param {number} ageInYears - Age in years.
//  * @returns {number} Estimated daily calorie needs.
//  */
// function calculateGoal(weightInKg: string, ageInYears: string): string {
//   // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
//   const calories =
//     parseInt(weightInKg, 10) * 24 + parseInt(ageInYears, 10) * 3.5;
//   return calories.toString();
// }

// function submitForm() {
//   katinas.changeName(userName.value);
//   katinas.changeWeight(userWeight.value);
//   katinas.changeAge(userAge.value);
//   katinas.changeGoal(calculateGoal(userWeight.value, userAge.value));
//   setItem('mealTracker', katinas.user);
//   isActive.value = false;
// }
</script>

<template>
  <div class="content-settings">
    <div class="content-settings-grid-container">
      <div class="disclaimer-settings">You can edit your settings here.</div>
      <div class="name-container-settings">
        <div class="name-settings">Current name: {{ katinas.user.name }}</div>
        <div>
          <!-- <label for="userName" style="display: none">User Name:</label>
          <input v-model="userName" placeholder="Change name..." /> -->
          <!-- <button @click="katinas.replaceName('sabaka')">Test</button> -->
          <button @click="katinass.toggleReplaceNameIsActive()">Edit</button>
        </div>
      </div>
      <div class="weight-container-settings">
        <div class="weight-settings">
          Current weight: {{ katinas.user.weight }}
        </div>
        <div>
          <!-- <label for="userWeight" style="display: none">User Weight:</label>
          <input v-model="userWeight" placeholder="Change weight" /> -->
          <button @click="katinass.toggleReplaceWeightIsActive()">Edit</button>
        </div>
      </div>
      <div class="age-container-settings">
        <div class="age-settings">Current age: {{ katinas.user.age }}</div>
        <div>
          <button @click="katinass.toggleReplaceAgeIsActive()">Edit</button>
        </div>
      </div>
      <div class="goal-container-settings">
        <div class="goal-settings">
          Current calorie goal: {{ katinas.user.goal }}
        </div>
        <div>
          <button @click="katinass.toggleReplaceAgeIsActive()">Edit</button>
          <!-- <button @click="katinas.incrementGoal()">Increment Goal</button> -->
        </div>
      </div>
      <div>
        <router-link :to="`/`">
          <button>Back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-settings {
  min-height: 200px;
  width: 600px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 10px;
}
.content-settings-grid-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.content-settings-grid-container > div {
  padding-bottom: 5px;
  margin: 0 auto;
  width: 90%;
}

input {
  box-sizing: border-box;
  background-color: whitesmoke;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #213547;
  width: 100%;
}

.disclaimer-settings {
  display: flex;
  justify-content: left; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Additional horizontal centering */
  width: 95%;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(234, 234, 234);
  font-size: 0.75em;
}

.name-container-settings,
.weight-container-settings,
.age-container-settings,
.goal-container-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.name-settings,
.weight-settings,
.age-settings,
.goal-settings {
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 5px;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f9f9f9;
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
