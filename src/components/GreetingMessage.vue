<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import { useModalActive } from '../stores/modalController.ts';

const user = useUserData();
const modalController = useModalActive();
</script>

<template>
  <div class="container-greetings">
    <div class="inner-container-greetings-left">
      <div id="greetings-message" class="greetings-message">
        Hello, {{ user.user.name }}
      </div>
      <div class="not-you-class" @click="modalController.toggleModal()">
        Not you? Click here
      </div>
    </div>
    <div class="image-container">
      <router-link :to="`/`">
        <img src="../assets/brocco.png" alt="Icon" />
      </router-link>
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
  grid-template-columns: 2fr 1fr 2fr;
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

img {
  height: 50px;
  width: 50px;
  -webkit-filter: drop-shadow(1px 20px 10px #dcdcdc);
  filter: drop-shadow(1px 20px 10px #dcdcdc);
}

@media screen and (max-width: 620px) {
  .container-greetings {
    width: 90vw;
    min-width: 300px;
    font-size: 0.75em;
  }
  .container-greetings {
    display: grid;
    grid-template-columns: 2fr 2fr;
  }

  .image-container {
    display: none;
  }
}
</style>
