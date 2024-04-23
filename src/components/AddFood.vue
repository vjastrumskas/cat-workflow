<script setup lang="ts">
import { ref } from 'vue';
import { useUserData } from '../stores/userData.ts';

const newFood = ref('');
const foodEnergy = ref('');

const katinas = useUserData();
</script>

<template>
  <div>
    <form @submit.prevent="katinas.addFood(newFood, foodEnergy)">
      <div>
        <p>You can add new foods here.</p>
      </div>
      <div>
        <label for="newFood" style="display: none">User Name:</label>
        <input v-model="newFood" placeholder="New food..." />
      </div>
      <div>
        <label for="foodEnergy" style="display: none">User Name:</label>
        <input v-model="foodEnergy" placeholder="Kcal per 100g..." />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
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
