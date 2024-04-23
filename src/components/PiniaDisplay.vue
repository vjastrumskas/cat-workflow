<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div class="container-pinia">
    <h4>Ymia: {{ katinas.user.name }}</h4>
    <h4>Amzius: {{ katinas.user.age }}</h4>
    <h4>Svoris: {{ katinas.user.weight }}</h4>
    <h4>Goal: {{ katinas.user.goal }}</h4>
    <button @click="katinas.incrementGoal()">Increment Goal</button>
    <router-link :to="`/settings`">
      <button>Settings</button>
    </router-link>
  </div>
</template>

<style scoped>
.container-pinia {
  max-height: 200px;
  width: 300px;
  background-color: white;
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
