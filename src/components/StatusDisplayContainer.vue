<script setup lang="ts">
import StatusDisplay from './StatusDisplay.vue';
import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();
</script>

<template>
  <div class="container-status-chart">
    <div class="innner-container-status-chart">
      <StatusDisplay />
      <div class="donut-inner">
        <h5>
          {{
            katinas.computeRemainder(
              katinas.user.goal,
              katinas.computeConsumedEnergy()
            )
          }}
          kcal
        </h5>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-status-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 600px;
  background-color: white;
  border-radius: 15px;
}

.innner-container-status-chart {
  height: 200px;
  width: 300px;
  padding: 5px;
  position: relative;
}

.donut-inner {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  font-size: 2em;
}
</style>
