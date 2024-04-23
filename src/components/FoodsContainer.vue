<script setup lang="ts">
import FoodItem from './FoodItem.vue';
// import { useUserData } from '../stores/userData.ts';

// const katinas = useUserData();
</script>

<template>
  <div class="container-foods">
    <FoodItem />
  </div>
</template>

<style scoped>
.container-foods {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  min-height: 50px;
  width: 300px;
  background-color: white;
  margin-top: 10px;
}
</style>
