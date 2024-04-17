<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import * as chartConfig from './chartConfig.ts';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'App',
  components: {
    Doughnut,
  },
  data() {
    return chartConfig;
  },
};
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>

<style scoped></style>
