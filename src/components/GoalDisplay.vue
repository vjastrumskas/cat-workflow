<script setup lang="ts">
import { useUserData } from '../stores/userData.ts';

const user = useUserData();
</script>

<template>
  <div class="donut-inner">{{ user.user.goal }}</div>
</template>

<style scoped>
.donut-inner {
  margin-top: -125px;
  margin-right: 125px;
}
.donut-inner h5 {
  margin-bottom: 5px;
  margin-top: 0;
}
.donut-inner span {
  font-size: 12px;
}
</style>
