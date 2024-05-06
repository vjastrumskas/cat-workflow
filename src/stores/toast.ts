// import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
// eslint-disable-next-line import/prefer-default-export
export const useToastMsg = defineStore('toast', () => {
  const toast = useToast();

  const showToast = (
    severity:
      | 'success'
      | 'info'
      | 'warn'
      | 'error'
      | 'secondary'
      | 'contrast'
      | undefined,
    summary: string,
    detail: string
  ) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 4000,
    });
  };
  return { showToast };
});
