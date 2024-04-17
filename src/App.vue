<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import PiniaDisplay from './components/PiniaDisplay.vue';
import StatusDisplayContainer from './components/StatusDisplayContainer.vue';
import FoodsContainer from './components/FoodsContainer.vue';
import AddedFoodsContainer from './components/AddedFoodsContainer.vue';
</script>

<template>
  <HelloWorld />
  <StatusDisplayContainer />
  <AddedFoodsContainer />
  <FoodsContainer />
  <PiniaDisplay />
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
