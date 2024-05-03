<script setup lang="ts">
import SettingsContent from '../components/SettingsContent.vue';
import AddFoodContainer from '../components/AddFoodContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
</script>

<template>
  <AddFoodContainer />
  <FoodsContainer />

  <SettingsContent />
</template>

<style scoped>
.container-settings {
  min-height: 300px;
  width: 300px;
  background-color: white;
  margin-top: 10px;
}
</style>
