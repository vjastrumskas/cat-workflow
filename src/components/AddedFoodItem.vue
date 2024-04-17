<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div v-for="(item, index) in katinas.isAdded()" :key="'addedFood' + index">
    <div @click="item.added = !item.added" class="item-food">
      {{ item.food }} {{ item.added }}
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
