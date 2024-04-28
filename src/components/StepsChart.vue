<script lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import * as chartConfig from './chartConfigExercise.ts';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

export default {
  name: 'ExerciseChart',
  components: {
    Bar,
  },
  data() {
    return chartConfig;
  },
};
</script>

<template>
  <Bar :data="data()" :options="options()" />
</template>

<style scoped></style>
