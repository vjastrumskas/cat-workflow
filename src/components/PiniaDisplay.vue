<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div class="container-pinia">
    <h4>Ymia: {{ katinas.user.name }}</h4>
    <h4>Amzius: {{ katinas.user.age }}</h4>
    <h4>Svoris: {{ katinas.user.weight }}</h4>
    <h4>Goal: {{ katinas.user.goal }}</h4>
  </div>
</template>

<style scoped>
.container-pinia {
  max-height: 200px;
  width: 300px;
  background-color: white;
}
</style>
