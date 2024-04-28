<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import { useModalActive } from '../stores/modalController.ts';

const katinas = useUserData();
const modal = useModalActive();
</script>

<template>
  <div class="container-greetings">
    <div class="inner-container-greetings-left">
      <div class="greetings-message">Hello, {{ katinas.user.name }}</div>
      <div class="not-you-class" @click="modal.toggleModal()">
        Not you? Click here
      </div>
    </div>
    <div class="inner-container-greetings-right">
      <router-link :to="`/settings`">
        <button>Settings</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container-greetings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  align-items: center;
  justify-content: space-evenly;
}
.inner-container-greetings-left {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 15px;
  justify-items: left;
}

.inner-container-greetings-right {
  display: flex;
  justify-content: right;
  padding: 15px;
}

.greetings-message,
.not-you-class {
  display: flex;
  align-items: center;
}
.greetings-message {
  font-size: 1.2em;
  border-bottom: 1px solid rgb(209, 209, 209);
}
.not-you-class {
  font-size: 0.7em;
}

.not-you-class:hover {
  cursor: pointer;
  color: #646cff;
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
</style>
