<script setup lang="ts">
import { ref } from 'vue';
import { useUserData } from '../stores/userData.ts';

const newFood = ref('');
const foodEnergy = ref('');

const katinas = useUserData();

const addFood = () => {
  katinas.addFood(newFood.value, foodEnergy.value);
  newFood.value = '';
  foodEnergy.value = '';
};
</script>

<template>
  <div>
    <form @submit.prevent="addFood()">
      <div>
        <label for="newFood" style="display: none">User Name:</label>
        <input v-model="newFood" placeholder="New food..." tabindex="1" />
      </div>
      <div>
        <label for="foodEnergy" style="display: none">User Name:</label>
        <input
          v-model="foodEnergy"
          placeholder="Kcal per 100g..."
          tabindex="2"
        />
        <button type="submit" tabindex="3">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  grid-template-rows: 1fr, 1fr, 1fr, 1fr;
}

form > div {
  margin: 5px auto;
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

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f9f9f9;
  color: #213547;
  margin: 5px;
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
