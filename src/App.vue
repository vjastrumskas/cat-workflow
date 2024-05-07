<script setup lang="ts">
import { RouterView } from 'vue-router';
import UserPrompt from './components/UserPrompt.vue';
import EditModal from './components/EditModal.vue';
import ToastMsg from './components/ToastMsg.vue';
</script>

<template>
  <UserPrompt />
  <RouterView />
  <EditModal />
  <ToastMsg />
</template>
