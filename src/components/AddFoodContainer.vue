<script setup lang="ts">
import AddFood from './AddFood.vue';
// import { useUserData } from '../stores/userData.ts';

// const katinas = useUserData();
</script>

<template>
  <div class="container-foods-main">
    <div class="foods-title">You can add new food here.</div>
    <div class="food-items">
      <AddFood />
    </div>
  </div>
</template>

<style scoped>
.container-foods-main {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
  justify-items: center;
}

.food-items {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: left;
}

.foods-title {
  display: flex;
  justify-content: left; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Additional horizontal centering */
  width: 95%;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid rgb(234, 234, 234);
  font-size: 0.75em;
}

@media screen and (max-width: 620px) {
  .container-foods-main {
    width: 90vw;
    min-width: 300px;
    font-size: 0.75em;
  }
}
</style>
