import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useToaster = defineStore('toaster', () => {
  const msgRef = ref('');

  const toastMessage = readonly(msgRef);
  const toastActive = ref(false);

  function setToast(msg: string) {
    msgRef.value = msg;
    toastActive.value = !toastActive.value;
    setTimeout(() => {
      if (toastActive.value) toastActive.value = false;
    }, 4000);
  }
  return { toastMessage, toastActive, setToast };
});
