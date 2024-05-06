<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';
import HeartVector from '../assets/HeartVector.vue';

const user = useUserData();
const modalController = useModalSettingsActive();

function toggleFavoriteFood(foodName: string) {
  try {
    const foundFood = user.user.foods.find(food => food.food === foodName);
    if (foundFood) {
      foundFood.favorite = !foundFood.favorite;
    } else {
      throw new Error(`Food "${foodName}" not found.`);
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}
function handleFood(food: string, date: string | string[]) {
  if (modalController.youAreAtSettings) {
    modalController.oldFoodName = food;
    modalController.toggleEditFoodItem();
  } else {
    user.insertFood(food, date);
  }
}
</script>

<template>
  <TransitionGroup name="fade" tag="ul">
    <li
      v-for="(item, index) in user.getFavorite(user.favoriteIsActive)"
      :key="'food' + index"
      class="item-food"
    >
      <div
        @click="handleFood(item.food, $route.params.date)"
        class="inner-item-food"
      >
        {{ item.food }}
        <span
          @click.stop="toggleFavoriteFood(item.food)"
          class="favorite-ticker"
        >
          <HeartVector :favorite-state="item.favorite" />
        </span>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.item-food {
  cursor: pointer;
  position: relative;
  transition: all 1s ease;
}
.inner-item-food {
  padding: 10px;
  background-color: #646cff;
  border-radius: 15px;
  color: white;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 5px;
}
.inner-item-food:hover {
  background-color: #8f94ff;
}

ol,
ul {
  list-style: none outside none;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: left;
  margin: 0 auto;
  padding-left: 0;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
