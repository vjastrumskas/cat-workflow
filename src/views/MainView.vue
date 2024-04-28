<script setup lang="ts">
import PiniaDisplay from '../components/PiniaDisplay.vue';
import StatusDisplayContainer from '../components/StatusDisplayContainer.vue';
import FoodsContainer from '../components/FoodsContainer.vue';
import AddedFoodsContainer from '../components/AddedFoodsContainer.vue';
import DatesNav from '../components/DatesNav.vue';
import GreetingMessage from '../components/GreetingMessage.vue';
import ExcerciseContainter from '../components/ExcerciseContainter.vue';
</script>

<template>
  <GreetingMessage />
  <StatusDisplayContainer />
  <DatesNav />
  <AddedFoodsContainer />
  <FoodsContainer />
  <ExcerciseContainter />
  <PiniaDisplay />
</template>

<style scoped></style>
