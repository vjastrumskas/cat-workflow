<script setup lang="ts">
import { RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import EditModal from './components/EditModal.vue';
</script>

<template>
  <ToastMessage style="width: 300px" position="bottom-center"> </ToastMessage>
  <HelloWorld />
  <RouterView />
  <EditModal />
</template>

<style scoped></style>
