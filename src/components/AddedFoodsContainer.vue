<script setup lang="ts">
import AddedFoodItem from './AddedFoodItem.vue';
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div v-if="katinas.isAdded().length" class="container-added-foods">
    <AddedFoodItem />
  </div>
</template>

<style scoped>
.container-added-foods {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: center;
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
}
</style>
