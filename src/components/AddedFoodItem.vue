<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div v-for="(item, index) in katinas.isAdded()" :key="'addedFood' + index">
    <div class="item-food">
      <button @click="katinas.incrementPortion(item.food, $route.params.date)">
        +
      </button>
      <button @click="katinas.decrementPortion(item.food, $route.params.date)">
        -</button
      >{{ item.food }} {{ item.portion }}g
    </div>
  </div>
</template>

<style scoped>
.item-food {
  padding: 5px;
  background-color: white;
}
.item-food:hover {
  background-color: rgb(247, 247, 247);
}
</style>
