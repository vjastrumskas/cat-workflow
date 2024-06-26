<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';
import { useUserData } from '../stores/userData.ts';
import { useToaster } from '../stores/toastMsg.ts';

import CloseVector from '../assets/CloseVector.vue';

const modalController = useModalSettingsActive();
const user = useUserData();
const toast = useToaster();
const steps = ref('');
const calories = ref('');
const userName = ref('');
const weight = ref('');
const age = ref('');
const goal = ref('');
const editFoodName = ref('');
const editCalories = ref('');
const confirmedDeletion = ref(false);
const route = useRoute();

const handleEscKey = (event: any) => {
  if (event.key === 'Escape' && modalController.newStepsIsActive) {
    modalController.toggleNewStepsIsActive();
  } else if (event.key === 'Escape' && modalController.newCaloriesIsActive) {
    modalController.toggleNewCaloriesIsActive();
  } else if (event.key === 'Escape' && modalController.replaceNameIsActive) {
    modalController.toggleReplaceNameIsActive();
  } else if (event.key === 'Escape' && modalController.replaceWeightIsActive) {
    modalController.toggleReplaceWeightIsActive();
  } else if (event.key === 'Escape' && modalController.replaceAgeIsActive) {
    modalController.toggleReplaceAgeIsActive();
  } else if (event.key === 'Escape' && modalController.replaceGoalIsActive) {
    modalController.toggleReplaceGoalIsActive();
  } else if (event.key === 'Escape' && modalController.editFoodItem) {
    modalController.toggleEditFoodItem();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});

const submitForm = (trigger: String) => {
  if (trigger === 'newSteps') {
    user.changeSteps(route.params.date, steps.value);
    modalController.toggleNewStepsIsActive();
    steps.value = '';
  } else if (trigger === 'specific') {
    user.updateCalories(route.params.date, 'specific', calories.value);
    modalController.toggleNewCaloriesIsActive();
    calories.value = '';
  } else if (trigger === 'replaceName') {
    if (user.validateUserName(userName.value)) {
      user.replaceName(userName.value);
      modalController.toggleReplaceNameIsActive();
      toast.setToast(`Name changed to ${userName.value}`);
      userName.value = '';
    } else {
      toast.setToast(
        `Name not changed, must be between 3 to 12 characters long`
      );
    }
  } else if (trigger === 'replaceWeight' && user.validateWeight(weight.value)) {
    user.replaceWeight(weight.value);
    modalController.toggleReplaceWeightIsActive();
    weight.value = '';
  } else if (trigger === 'replaceAge') {
    if (user.validateAge(age.value)) {
      user.replaceAge(age.value);
      modalController.toggleReplaceAgeIsActive();

      toast.setToast(`Age was changed to ${age.value}`);
      age.value = '';
    } else {
      toast.setToast(`Age not changed. Must be a number between 16 to 120`);
      age.value = '';
    }
  } else if (trigger === 'replaceGoal') {
    if (user.validateGoal(goal.value)) {
      user.replaceGoal(goal.value);
      modalController.toggleReplaceGoalIsActive();
      goal.value = '';

      toast.setToast(`Goal was changed to ${goal.value}`);
    } else {
      toast.setToast(`Goal not changed, must be a number`);
    }
  } else if (trigger === 'editFood') {
    if (confirmedDeletion.value) {
      user.deleteFoodByName(modalController.oldFoodName);
      modalController.toggleEditFoodItem();
      editFoodName.value = '';
      editCalories.value = '';
      confirmedDeletion.value = false;
    } else if (user.isFoodValid(editFoodName.value, editCalories.value)) {
      user.changeCalories(modalController.oldFoodName, editCalories.value);
      user.changeFoodName(modalController.oldFoodName, editFoodName.value);
      modalController.toggleEditFoodItem();
      toast.setToast(
        `Name changed to ${editFoodName.value} and calories to ${editCalories.value} kcal/100g`
      );
      editFoodName.value = '';
      editCalories.value = '';
      confirmedDeletion.value = false;
    } else {
      toast.setToast(
        `Food item not changed. Only short names and number of kcal permitted.`
      );
    }
  }
};
</script>

<template>
  <div
    class="modal"
    :style="{ display: modalController.newStepsIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleNewStepsIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('newSteps')">
          <div>Edit steps:</div>
          <div>
            <label for="stepsInput" style="display: none">Edit steps:</label>
            <input
              id="stepsInput"
              v-model="steps"
              placeholder="Type steps here..."
            />
          </div>
          <div class="note-message">
            * Note this will overwrite your steps for the day.
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{ display: modalController.newCaloriesIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleNewCaloriesIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('specific')">
          <div>Edit calories:</div>
          <div>
            <label for="newCalories" style="display: none"
              >Edit calories:</label
            >
            <input
              id="newCalories"
              v-model="calories"
              placeholder="Type calories here..."
            />
          </div>
          <div class="note-message">
            * Note this will overwrite your calories for the day.
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{ display: modalController.replaceNameIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleReplaceNameIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceName')">
          <div>Edit Name:</div>
          <div>
            <label for="replaceName" style="display: none">Edit Name:</label>
            <input
              id="replaceName"
              v-model="userName"
              placeholder="Type in name..."
            />
          </div>
          <div class="note-message">
            * Note this will change your name, but not your data.
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{
      display: modalController.replaceWeightIsActive ? 'block' : 'none',
    }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleReplaceWeightIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceWeight')">
          <div>Edit weight:</div>
          <div>
            <label for="replaceWeight" style="display: none"
              >Edit weight:</label
            >
            <input
              id="replaceWeight"
              v-model="weight"
              placeholder="Type in weight..."
            />
          </div>
          <div class="note-message">
            * Note this will change your weight only.
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{ display: modalController.replaceAgeIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleReplaceAgeIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceAge')">
          <div>Edit age:</div>
          <div>
            <label for="replaceAge" style="display: none">Edit age:</label>
            <input id="replaceAge" v-model="age" placeholder="Type in age..." />
          </div>
          <div class="note-message">* Note this will change your age only.</div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{ display: modalController.replaceGoalIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleReplaceGoalIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceGoal')">
          <div>Edit goal:</div>
          <div>
            <label for="replaceGoal" style="display: none">Edit goal:</label>
            <input
              id="replaceGoal"
              v-model="goal"
              placeholder="Type in goal..."
            />
          </div>
          <div class="note-message">
            * Note this will change your goal only.
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div
    class="modal"
    :style="{ display: modalController.editFoodItem ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="modalController.toggleEditFoodItem()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('editFood')">
          <div>Edit {{ modalController.oldFoodName }}:</div>
          <div>
            <label for="editFoodName" style="display: none"
              >Edit food name:</label
            >
            <input
              id="editFoodName"
              v-model="editFoodName"
              placeholder="Type in food name..."
              :disabled="confirmedDeletion"
            />
          </div>
          <div class="note-message">
            * Note this will affect food names of your previous entries.
          </div>
          <div>
            <label for="editFoodCalories" style="display: none"
              >Edit food calories:</label
            >
            <input
              id="editFoodCalories"
              v-model="editCalories"
              placeholder="Type in calories..."
              :disabled="confirmedDeletion"
            />
          </div>
          <div class="note-message">
            * Note this will affect calories on all records.
          </div>
          <div>
            <button type="submit" :disabled="confirmedDeletion">Submit</button>
          </div>
          <div class="delete-container">
            <div class="delete-helper">Click here to delete</div>
            <div class="delete-tickmark-container">
              <input
                type="checkbox"
                id="deletion"
                value="true"
                v-model="confirmedDeletion"
              />
            </div>
            <div>
              <label for="deletion" style="display: none">Delete</label>
              <button
                type="submit"
                :disabled="!confirmedDeletion"
                :style="{
                  backgroundColor: confirmedDeletion ? '#ffcece' : '',
                }"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(
    3px
  ); /* These have to come together to make blur effect. */
  backdrop-filter: blur(3px);
}

/* Modal Content/Box */
.modal-container {
  display: grid;
  grid-template-rows: 1fr 9fr;
  background-color: #ffffff;
  border-radius: 15px;
  margin: 5% auto; /* 15% from the top and centered */
  padding: 10px;
  width: 300px; /* Could be more or less, depending on screen size */
  height: auto;
}

.modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.exit-button {
  display: flex;
  justify-content: right;
  min-height: 20px;
}

svg {
  cursor: pointer;
}

.note-message {
  font-size: 0.5em;
}

.delete-tickmark-container {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 3%;
}

.delete-helper {
  font-size: 0.5em;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 3%;
}

form > div {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

input:not(#deletion) {
  box-sizing: border-box;
  background-color: whitesmoke;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #213547;
  width: 100%;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  margin: 0.5em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f9f9f9;
  color: #213547;

  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
