<script setup lang="ts">
import { useToaster } from '../stores/toastMsg.ts';

const toast = useToaster();
</script>

<template>
  <Transition>
    <div v-if="toast.toastActive" class="msg-toast">
      {{ toast.toastMessage }}
      <button type="button" @click="toast.toastActive = false">✖️</button>
    </div>
  </Transition>
</template>

<style scoped>
.msg-toast {
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 15px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
  bottom: 30px;
  font-size: 17px;
  min-width: 250px;
  max-width: 300px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
