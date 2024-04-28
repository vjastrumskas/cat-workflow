<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div
    class="item-food"
    v-for="(item, index) in katinas.isAdded()"
    :key="'addedFood' + index"
  >
    <div class="innter-item-food">
      <button @click="katinas.incrementPortion(item.food, $route.params.date)">
        +
      </button>
      {{ item.food }} {{ item.portion }}g
      <button @click="katinas.decrementPortion(item.food, $route.params.date)">
        -
      </button>
    </div>
  </div>
</template>

<style scoped>
.item-food {
  margin: 15px;
}
.inner-item-food {
  padding: 5px;
  background-color: white;
}
.inner-item-food:hover {
  background-color: rgb(247, 247, 247);
}
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
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
