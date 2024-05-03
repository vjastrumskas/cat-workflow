<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();

const toggleFavorite = (index: number) => {
  katinas.user.foods[index].favorite = !katinas.user.foods[index].favorite;
};
</script>

<template>
  <div
    v-for="(item, index) in katinas.getFavorite(katinas.favoriteIsActive)"
    :key="'food' + index"
    class="item-food"
  >
    <div
      @click="katinas.insertFood(item.food, $route.params.date)"
      class="inner-item-food"
    >
      {{ item.food }}
      <span
        @click.stop="toggleFavorite(index)"
        :style="{ color: item.favorite ? '#7ec099' : 'white' }"
        class="favorite-ticker"
      >
        ❤
      </span>
    </div>
  </div>
</template>

<style scoped>
.item-food {
  cursor: pointer;
  position: relative;
}
.inner-item-food {
  padding: 10px;
  background-color: #8d93ff;
  border-radius: 15px;
  color: white;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 5px;
}
.inner-item-food:hover {
  background-color: #afb3ff;
}
</style>
