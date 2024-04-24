<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';
import { useModalActive } from '../stores/modalController.ts';

const katinas = useUserData();
const modal = useModalActive();
</script>

<template>
  <div class="container-greetings">
    <div class="inner-container-greetings">
      <div class="greetings-message">Hello, {{ katinas.user.name }}</div>
      <div class="not-you-class" @click="modal.toggleModal()">
        Not you? Click here
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-greetings {
  min-height: 60px;
  width: 600px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
}
.inner-container-greetings {
  justify-items: left;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 15px;
}
.inner-container-greetings > div {
  display: flex;
  align-items: center;
}
.greetings-message {
  font-size: 1.2em;
  border-bottom: 1px solid rgb(209, 209, 209);
}
.not-you-class {
  font-size: 0.7em;
  cursor: pointer;
}
</style>
