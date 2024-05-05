<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';
import { useUserData } from '../stores/userData.ts';

import CloseVector from '../assets/CloseVector.vue';

const katinas = useModalSettingsActive();
const user = useUserData();
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
  if (event.key === 'Escape' && katinas.newStepsIsActive) {
    katinas.toggleNewStepsIsActive();
  } else if (event.key === 'Escape' && katinas.newCaloriesIsActive) {
    katinas.toggleNewCaloriesIsActive();
  } else if (event.key === 'Escape' && katinas.replaceNameIsActive) {
    katinas.toggleReplaceNameIsActive();
  } else if (event.key === 'Escape' && katinas.replaceWeightIsActive) {
    katinas.toggleReplaceWeightIsActive();
  } else if (event.key === 'Escape' && katinas.replaceAgeIsActive) {
    katinas.toggleReplaceAgeIsActive();
  } else if (event.key === 'Escape' && katinas.replaceGoalIsActive) {
    katinas.toggleReplaceGoalIsActive();
  } else if (event.key === 'Escape' && katinas.editFoodItem) {
    katinas.toggleEditFoodItem();
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
    katinas.toggleNewStepsIsActive();
    steps.value = '';
  } else if (trigger === 'specific') {
    user.updateCalories(route.params.date, 'specific', calories.value);
    katinas.toggleNewCaloriesIsActive();
    calories.value = '';
  } else if (trigger === 'replaceName') {
    user.replaceName(userName.value);
    katinas.toggleReplaceNameIsActive();
    userName.value = '';
  } else if (trigger === 'replaceWeight') {
    user.replaceWeight(weight.value);
    katinas.toggleReplaceWeightIsActive();
    weight.value = '';
  } else if (trigger === 'replaceAge') {
    user.replaceAge(age.value);
    katinas.toggleReplaceAgeIsActive();
    age.value = '';
  } else if (trigger === 'replaceGoal') {
    user.replaceGoal(goal.value);
    katinas.toggleReplaceGoalIsActive();
    goal.value = '';
  } else if (trigger === 'editFood') {
    if (confirmedDeletion.value) {
      user.deleteFoodByName(katinas.oldFoodName);
      katinas.toggleEditFoodItem();
      editFoodName.value = '';
      editCalories.value = '';
      console.log('deleted');
    } else {
      user.changeCalories(katinas.oldFoodName, editCalories.value);
      user.changeFoodName(katinas.oldFoodName, editFoodName.value);
      katinas.toggleEditFoodItem();
      editFoodName.value = '';
      editCalories.value = '';
      console.log('edited');
      console.log(confirmedDeletion.value);
    }
  }
};
</script>

<template>
  <div
    class="modal"
    :style="{ display: katinas.newStepsIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleNewStepsIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('newSteps')">
          <div>Edit steps:</div>
          <div>
            <label for="newSteps" style="display: none">Edit steps:</label>
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
    :style="{ display: katinas.newCaloriesIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleNewCaloriesIsActive()" />
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
    :style="{ display: katinas.replaceNameIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleReplaceNameIsActive()" />
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
    :style="{ display: katinas.replaceWeightIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleReplaceWeightIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceWeight')">
          <div>Edit weight:</div>
          <div>
            <label for="replaceName" style="display: none">Edit weight:</label>
            <input
              id="replaceName"
              v-model="weight"
              placeholder="Type in name..."
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
    :style="{ display: katinas.replaceAgeIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleReplaceAgeIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceAge')">
          <div>Edit age:</div>
          <div>
            <label for="replaceName" style="display: none">Edit age:</label>
            <input
              id="replaceName"
              v-model="age"
              placeholder="Type in name..."
            />
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
    :style="{ display: katinas.replaceGoalIsActive ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleReplaceGoalIsActive()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('replaceGoal')">
          <div>Edit goal:</div>
          <div>
            <label for="replaceGoal" style="display: none">Edit goal:</label>
            <input
              id="replaceGoal"
              v-model="goal"
              placeholder="Type in name..."
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
    :style="{ display: katinas.editFoodItem ? 'block' : 'none' }"
  >
    <div class="modal-container">
      <div class="exit-button">
        <CloseVector @click="katinas.toggleEditFoodItem()" />
      </div>
      <div class="modal-content">
        <form @submit.prevent="submitForm('editFood')">
          <div>Edit {{ katinas.oldFoodName }}:</div>
          <div>
            <label for="editFoodName" style="display: none"
              >Edit food name:</label
            >
            <input
              id="editFoodName"
              v-model="editFoodName"
              placeholder="Type in new name..."
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
              :style="{ color: confirmedDeletion ? 'grey' : 'black' }"
            />
          </div>
          <div class="note-message">
            * Note this will affect calories on all records.
          </div>
          <div>
            <button type="submit" :disabled="confirmedDeletion">Submit</button>
          </div>
          <div class="delete-container">
            <div>
              <input
                type="checkbox"
                id="deletion"
                value="true"
                v-model="confirmedDeletion"
              />
            </div>
            <div>
              <label for="deletion" style="display: none">Delete</label>
              <button type="submit" :disabled="!confirmedDeletion">
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

.delete-container {
  display: flex;
  width: 100%;
  align-items: center;
  /* justify-content: center; */
  justify-items: right;
  gap: 3%;
}

form > div {
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
}

input {
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
