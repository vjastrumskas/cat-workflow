<script setup lang="ts">
import FoodItem from './FoodItem.vue';
import { useUserData } from '../stores/userData.ts';
import ExclamationMark from '../assets/ExclamationMark.vue';

const katinas = useUserData();
</script>

<template>
  <div v-if="katinas.user.foods.length" class="container-foods-main">
    <div class="foods-title">Available foods</div>
    <div class="food-items">
      <FoodItem />
    </div>
  </div>
  <div v-else class="container-added-foods-main">
    <div class="container-no-foods-items">
      <ExclamationMark class="exclamation-mark" />
      No food items registered yet.
      <router-link :to="`/settings`">
        <span> Register here.</span>
      </router-link>
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
  padding-bottom: 10px;
}

.food-items {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: left;
  overflow-y: scroll;
  max-height: 500px;
}

.food-items::-webkit-scrollbar {
  display: none;
}

.food-items {
  -ms-overflow-style: none; /* IE and Edge */
}

.foods-title {
  display: flex;
  justify-content: left; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Additional horizontal centering */
  width: 90%;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid rgb(234, 234, 234);
  font-size: 0.75em;
}

.exclamation-mark {
  width: 20px;
  height: 20px;
  margin: 10px;
}

.container-no-foods-items {
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
  justify-items: center;
  padding-bottom: 10px;
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
