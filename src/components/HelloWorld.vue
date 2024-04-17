<script setup lang="ts">
import { ref } from 'vue';
import { useUserData } from '../stores/userData.ts';
import { setItem } from '../services/localStorage.ts';

const minAge = 16;
const maxAge = 120;

const katinas = useUserData();
const isActive = ref(true);
const userName = ref('');
const userWeight = ref('');
const userAge = ref(String(minAge));
const tabindex = ref(0);
const open = ref(false);

const options = ref(
  Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i)
);

/**
 * Calculates estimated daily calorie needs based on age and weight.
 * @param {number} weightInKg - Weight in kilograms.
 * @param {number} ageInYears - Age in years.
 * @returns {number} Estimated daily calorie needs.
 */
function calculateGoal(weightInKg: string, ageInYears: string): string {
  // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
  const calories =
    parseInt(weightInKg, 10) * 24 + parseInt(ageInYears, 10) * 3.5;
  return calories.toString();
}

function submitForm() {
  katinas.changeName(userName.value);
  katinas.changeWeight(userWeight.value);
  katinas.changeAge(userAge.value);
  katinas.changeGoal(calculateGoal(userWeight.value, userAge.value));
  setItem('mealTracker', katinas.user);
  isActive.value = false;
}
</script>

<template>
  <div class="modal" :style="{ display: isActive ? 'block' : 'none' }">
    <div class="modal-content">
      <form @submit.prevent="submitForm()">
        <div>
          <p>Hello there, stranger.</p>
        </div>
        <div>
          <label for="userName" style="display: none">User Name:</label>
          <input v-model="userName" placeholder="What's your name?" />
        </div>
        <div>
          <label for="userWeight" style="display: none">User Weight:</label>
          <input v-model="userWeight" placeholder="Your weight" />
        </div>
        <div class="options-select-menu">
          <div class="custom-select" :tabindex="tabindex" @blur="open = false">
            <div class="selected" :class="{ open: open }" @click="open = !open">
              {{ userAge }}
            </div>
            <div class="items" :class="{ selectHide: !open }">
              <div
                v-for="(option, i) of options"
                :key="i"
                @click="
                  userAge = String(option);
                  open = false;
                "
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  backdrop-filter: blur(5px);
  /* filter: blur(8px);
  -webkit-filter: blur(8px); */
  background-color: rgba(0, 0, 0, 0.4); /* Black with opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #d2dfea;
  border-radius: 15px;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 60%; /* Could be more or less, depending on screen size */
  height: 60%;
}

form {
  grid-template-rows: 1fr, 1fr, 1fr, 1fr;
}

form > div {
  padding-bottom: 5px;
  margin: 0 auto;
  width: 200px;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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

.custom-select {
  position: relative;
  text-align: left;
  outline: none;
  width: 100%;
}

.custom-select .selected {
  background-color: whitesmoke;
  border-radius: 6px;
  color: #213547;
  cursor: pointer;
  user-select: none;
  padding: 0.6em 1.2em;
}

.custom-select .selected.open {
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 1em;

  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #213547;
  border-radius: 0px 0px 6px 6px;
  position: absolute;
  background-color: whitesmoke;
  left: 0;
  right: 0;
  z-index: 1;
}

.items {
  overflow-y: scroll;
  max-height: 200px;
}

.custom-select .items div {
  color: #213547;
  padding: 0.6em 1.2em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: rgb(221, 212, 212);
}

.selectHide {
  display: none;
}
</style>
