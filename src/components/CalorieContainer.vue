<template>
  <div class="container-exercise">
    <div class="innner-container-exercise-chart">X</div>
  </div>
</template>

<style scoped>
.container-exercise {
  display: grid;
  grid-template-columns: 9fr 1fr;
  text-align: center;
  align-content: center;
  min-height: 60px;
  background-color: white;
  margin-top: 10px;
  border-radius: 15px;
}

.innner-container-exercise-chart {
  height: 50px;
  padding-left: 15px;
}

.icon-container {
  display: flex;
  text-align: center;
  align-content: center;
  height: 40px;
  width: 40px;
}

.shoe-icon {
  width: 100%; /* Ensure the SVG scales to fit the container */
  height: auto;
  transform: rotate(-30deg);
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f3f3f3;
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
