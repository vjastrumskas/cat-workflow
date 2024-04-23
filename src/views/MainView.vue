<script setup lang="ts">
import PiniaDisplay from '../components/PiniaDisplay.vue';
import StatusDisplayContainer from '../components/StatusDisplayContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
import AddedFoodsContainer from '../components/AddedFoodsContainer.vue';
import DatesNav from '../components/DatesNav.vue';
</script>

<template>
  <StatusDisplayContainer />
  <DatesNav />
  <AddedFoodsContainer />
  <FoodsContainer />
  <PiniaDisplay />
</template>

<style scoped></style>
