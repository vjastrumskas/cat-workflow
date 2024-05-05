<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { useUserData } from '../stores/userData.ts';
import { useModalActive } from '../stores/modalController.ts';

import { setItem, getItem } from '../services/localStorage.ts';

const minAge = 16;
const maxAge = 120;
const route = useRoute();

const katinas = useUserData();
const modal = useModalActive();
const userName = ref('');
const userWeight = ref('');
const userAge = ref(String(minAge));
const tabindex = ref(0);
const open = ref(false);
const userExists = ref(false);

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
  katinas.resetUserData();
  katinas.changeName(userName.value);
  if (!userExists.value) {
    katinas.changeWeight(userWeight.value);
    katinas.changeAge(userAge.value);
    katinas.changeGoal(calculateGoal(userWeight.value, userAge.value));
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [katinas.user.name]: katinas.user, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
    katinas.insertDateTemplate(route.params.date);

    modal.toggleModal();
  } else {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');

    katinas.changeWeight(existingData?.[userName.value]?.weight);
    katinas.changeAge(existingData?.[userName.value]?.age);
    katinas.changeFoods(existingData?.[userName.value]?.foods);
    katinas.changeDates(existingData?.[userName.value]?.dates);
    katinas.changeGoal(calculateGoal(katinas.user.weight, katinas.user.age));
    modal.toggleModal();
  }
}

function checkLocalStorageForKey(key: string) {
  const value: { [key: string]: any } | null = getItem(key);
  if (value !== null) {
    // // The value exists in local storage.
    // console.log('Value found:', (value as { name: string }).name);
    const allKeys = Object.keys(value as Record<string, any>);

    // Access the first object (in this case, "Vaidis")
    const firstObjectName = allKeys[0];

    const firstObject: { [key: string]: any } = value[firstObjectName];
    console.log(firstObject);
    katinas.changeName(firstObject.name);
    katinas.changeWeight(firstObject.weight);
    katinas.changeAge(firstObject.age);
    katinas.changeFoods(firstObject.foods);
    katinas.changeDates(firstObject.dates);

    katinas.changeGoal(calculateGoal(katinas.user.weight, katinas.user.age));
  } else {
    // The value does not exist in local storage.
    console.log('Value not found or is null.');
    modal.toggleModal();
  }
}

const checkForKeyMatch = () => {
  const existingData = getItem<{ [key: string]: any }>('mealTracker');

  // Check if the 'Artiom' key exists in the parsed data
  if (existingData && existingData[userName.value]) {
    console.log('Input matches Artiom');
    userExists.value = true;
    // Handle the case where the input matches "Artiom"
    // You can access Artiom's data using parsedData.Artiom
    // For example: const artiomName = parsedData.Artiom.name;
  } else {
    console.log('Input does not match Artiom');
    // Handle other cases
    userExists.value = false;
  }
};
// Call the function
onMounted(() => {
  checkLocalStorageForKey('mealTracker');
});
</script>

<template>
  <div class="modal" :style="{ display: modal.isActive ? 'block' : 'none' }">
    <div class="modal-content">
      <form data-test="form" @submit.prevent="submitForm()">
        <div>
          <p>Hello there, stranger.</p>
        </div>
        <div>
          <label for="userName" style="display: none">User Name:</label>
          <input
            v-model="userName"
            @input="checkForKeyMatch"
            placeholder="What's your name?"
            id="userNameInput"
          />
        </div>
        <div v-if="!userExists">
          <label for="userWeight" style="display: none">User Weight:</label>
          <input
            id="userWeightInput"
            v-model="userWeight"
            placeholder="Your weight"
          />
        </div>
        <div v-if="!userExists" class="options-select-menu">
          <div class="custom-select" :tabindex="tabindex" @blur="open = false">
            <div
              class="selected"
              :class="{ open: open }"
              @click="open = !open"
              id="initial-option"
            >
              {{ userAge }}
            </div>
            <div class="items" :class="{ selectHide: !open }">
              <div
                v-for="(option, i) of options"
                :key="i"
                :id="'options' + i"
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
        <button id="submit-user-details" type="submit">Submit</button>
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
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(
    3px
  ); /* These have to come together to make blur effect. */
  backdrop-filter: blur(3px);
}

/* Modal Content/Box */
.modal-content {
  background-color: #ffffff;
  border-radius: 15px;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 200px; /* Could be more or less, depending on screen size */
  height: auto;
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
