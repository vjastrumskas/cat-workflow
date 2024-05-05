<script setup lang="ts">
import { RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import EditModal from './components/EditModal.vue';
</script>

<template>
  <HelloWorld />
  <RouterView />
  <EditModal />
</template>
