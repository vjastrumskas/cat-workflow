<script setup lang="ts">
import StatusDisplay from './StatusDisplay.vue';
import { useUserData } from '../stores/userData.ts';

const user = useUserData();
</script>

<template>
  <div class="container-status-chart">
    <div class="formula-display">
      Base Goal - Food + Exercise =
      {{
        user.computeRemainder(
          user.getGoal(),
          user.computeConsumedEnergy(user.getRoute(), user.getUserObject()),
          user.computeTotalCaloriesBurnt()
        )
      }}
    </div>
    <div class="innner-container-status-chart">
      <StatusDisplay />
      <div class="donut-inner">
        <div>
          {{
            user.computeRemainder(
              user.getGoal(),
              user.computeConsumedEnergy(user.getRoute(), user.getUserObject()),
              user.computeTotalCaloriesBurnt()
            )
          }}
        </div>
        <div class="remainder-indicator">Remaining</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-status-chart {
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
  height: 230px;
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
  font-size: 2.5em;
}

.remainder-indicator {
  font-size: 0.3em;
  position: relative;
}

.formula-display {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 0.75em;
}

@media screen and (max-width: 620px) {
  .container-status-chart {
    width: 90vw;
    min-width: 300px;
    font-size: 0.75em;
  }
}
</style>
