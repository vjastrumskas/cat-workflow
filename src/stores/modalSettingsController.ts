import { ref } from 'vue';
import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useModalSettingsActive = defineStore('modalSettings', () => {
  const newStepsIsActive = ref(false);
  const newCaloriesIsActive = ref(false);
  const replaceNameIsActive = ref(false);
  const replaceWeightIsActive = ref(false);
  const replaceAgeIsActive = ref(false);
  const replaceGoalIsActive = ref(false);
  const youAreAtSettings = ref(false);
  const editFoodItem = ref(false);
  const oldFoodName = ref('');

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
  const toggleReplaceGoalIsActive = () => {
    replaceGoalIsActive.value = !replaceGoalIsActive.value;
  };
  const toggleYouAreAtSettings = () => {
    youAreAtSettings.value = !youAreAtSettings.value;
  };
  const getyouAreAtSettings = () => youAreAtSettings.value;
  const toggleEditFoodItem = () => {
    editFoodItem.value = !editFoodItem.value;
  };

  return {
    newStepsIsActive,
    newCaloriesIsActive,
    replaceNameIsActive,
    replaceWeightIsActive,
    replaceAgeIsActive,
    replaceGoalIsActive,
    youAreAtSettings,
    editFoodItem,
    oldFoodName,
    toggleNewStepsIsActive,
    toggleNewCaloriesIsActive,
    toggleReplaceNameIsActive,
    toggleReplaceAgeIsActive,
    toggleReplaceWeightIsActive,
    toggleReplaceGoalIsActive,
    toggleYouAreAtSettings,
    getyouAreAtSettings,
    toggleEditFoodItem,
  };
});
