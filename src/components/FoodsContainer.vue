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
  align-content: center;
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
  padding: 10px;
}
</style>
