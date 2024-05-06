<script setup lang="ts">
import { RouterView } from 'vue-router';
import UserPrompt from './components/UserPrompt.vue';
import EditModal from './components/EditModal.vue';
import ToastMessage from './components/ToastMessage.vue';
</script>

<template>
  <UserPrompt />
  <RouterView />
  <EditModal />
  <ToastMessage />
</template>
