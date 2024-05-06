<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import { useModalSettingsActive } from '../stores/modalSettingsController.ts';

const user = useUserData();
const modalController = useModalSettingsActive();
</script>

<template>
  <div class="content-settings">
    <div class="content-settings-grid-container">
      <div class="disclaimer-settings">You can edit your settings here.</div>
      <div class="name-container-settings">
        <div class="name-settings">Current name:</div>
        <div class="stats">{{ user.user.name }}</div>
        <div>
          <button @click="modalController.toggleReplaceNameIsActive()">
            Edit
          </button>
        </div>
      </div>
      <div class="weight-container-settings">
        <div class="weight-settings">Current weight:</div>
        <div class="stats">{{ user.user.weight }} kg</div>
        <div>
          <button @click="modalController.toggleReplaceWeightIsActive()">
            Edit
          </button>
        </div>
      </div>
      <div class="age-container-settings">
        <div class="age-settings">Current age:</div>
        <div class="stats">{{ user.user.age }} y/o</div>
        <div>
          <button @click="modalController.toggleReplaceAgeIsActive()">
            Edit
          </button>
        </div>
      </div>
      <div class="goal-container-settings">
        <div class="goal-settings">Current calorie goal:</div>
        <div class="stats">{{ user.user.goal }} kcal/day</div>
        <div>
          <button @click="modalController.toggleReplaceGoalIsActive()">
            Edit
          </button>
        </div>
      </div>
      <div>
        <router-link :to="`/`">
          <button>Back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-settings {
  min-height: 200px;
  width: 600px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 10px;
}
.content-settings-grid-container {
  justify-items: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.content-settings-grid-container > div {
  padding-bottom: 5px;
  width: 90%;
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

.disclaimer-settings {
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  width: 95%;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(234, 234, 234);
  font-size: 0.75em;
}

.name-container-settings,
.weight-container-settings,
.age-container-settings,
.goal-container-settings {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}

.name-settings,
.weight-settings,
.age-settings,
.goal-settings {
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 5px;
}

.stats {
  display: flex;
  justify-content: left;
  align-items: center;
  padding-right: 5px;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
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

@media screen and (max-width: 620px) {
  .content-settings {
    width: 90vw;
    min-width: 300px;
    font-size: 0.6em;
  }
}
</style>
