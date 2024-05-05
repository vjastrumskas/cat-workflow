<script setup lang="ts">
import AddedFoodItem from './AddedFoodItem.vue';
import { useUserData } from '../stores/userData.ts';

const user = useUserData();
</script>

<template>
  <div v-if="user.isAdded().length" class="container-added-foods-main">
    <div class="added-foods-title">Logged food: {{ $route.params.date }}</div>
    <div class="container-added-foods-items">
      <AddedFoodItem />
    </div>
  </div>
</template>

<style scoped>
.container-added-foods-main {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
  justify-items: center;
}

.container-added-foods-items {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: center;
  padding-bottom: 10px;
  overflow-y: scroll;
  max-height: 400px;
}

.container-added-foods-items::-webkit-scrollbar {
  display: none;
}

.container-added-foods-items {
  -ms-overflow-style: none; /* IE and Edge */
}

.added-foods-title {
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

@media screen and (max-width: 620px) {
  .container-added-foods-main {
    width: 90vw;
    min-width: 300px;
    font-size: 0.75em;
  }
}
</style>
