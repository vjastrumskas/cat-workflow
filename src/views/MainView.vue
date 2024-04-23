<script setup lang="ts">
import PiniaDisplay from '../components/PiniaDisplay.vue';
import StatusDisplayContainer from '../components/StatusDisplayContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
import AddedFoodsContainer from '../components/AddedFoodsContainer.vue';
import DaysBrowser from '../components/DaysBrowser.vue';
</script>

<template>
  <StatusDisplayContainer />
  <DaysBrowser />
  <AddedFoodsContainer />
  <FoodsContainer />
  <PiniaDisplay />
</template>

<style scoped></style>
