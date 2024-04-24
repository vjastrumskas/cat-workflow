import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useModalActive = defineStore('modal', () => {
  const isActive = ref(false);
  const toggleModal = () => {
    isActive.value = !isActive.value;
  };
  return { isActive, toggleModal };
});
