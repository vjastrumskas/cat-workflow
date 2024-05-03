<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div
    v-for="(item, index) in katinas.user.foods"
    class="item-food"
    :key="'food' + index"
  >
    <div
      @click="katinas.insertFood(item.food, $route.params.date)"
      class="inner-item-food"
    >
      {{ item.food }}
    </div>
  </div>
</template>

<style scoped>
.item-food {
  cursor: pointer;
}
.inner-item-food {
  padding: 10px;
  background-color: #646cff;
  border-radius: 15px;
  color: white;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  margin-left: 10px;
}
.inner-item-food:hover {
  background-color: #8288fd;
}
</style>
