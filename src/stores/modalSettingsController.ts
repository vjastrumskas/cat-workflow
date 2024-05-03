import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useModalSettingsActive = defineStore('modalSettings', () => {
  const newStepsIsActive = ref(false);
  const newCaloriesIsActive = ref(false);
  const replaceNameIsActive = ref(false);
  const replaceWeightIsActive = ref(false);
  const replaceAgeIsActive = ref(false);
  const toggleNewStepsIsActive = () => {
    newStepsIsActive.value = !newStepsIsActive.value;
  };
  const toggleNewCaloriesIsActive = () => {
    newCaloriesIsActive.value = !newCaloriesIsActive.value;
  };
  const toggleReplaceNameIsActive = () => {
    replaceNameIsActive.value = !replaceNameIsActive.value;
  };
  const toggleReplaceWeightIsActive = () => {
    replaceWeightIsActive.value = !replaceWeightIsActive.value;
  };
  const toggleReplaceAgeIsActive = () => {
    replaceAgeIsActive.value = !replaceAgeIsActive.value;
  };
  return {
    newStepsIsActive,
    newCaloriesIsActive,
    replaceNameIsActive,
    replaceWeightIsActive,
    replaceAgeIsActive,
    toggleNewStepsIsActive,
    toggleNewCaloriesIsActive,
    toggleReplaceNameIsActive,
    toggleReplaceAgeIsActive,
    toggleReplaceWeightIsActive,
  };
});
