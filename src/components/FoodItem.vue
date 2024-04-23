<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div v-for="(item, index) in katinas.user.foods" :key="'food' + index">
    <div
      @click="katinas.insertFood(item.food, $route.params.date)"
      class="item-food"
    >
      {{ item.food }}
    </div>
  </div>
</template>

<style scoped>
.item-food {
  padding: 10px;
  background-color: white;
  font-size: 0.75em;
}
.item-food:hover {
  background-color: rgb(247, 247, 247);
}
</style>
