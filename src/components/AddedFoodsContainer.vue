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
  height: 100px;
  width: 300px;
  background-color: white;
  margin-top: 10px;
}
</style>
