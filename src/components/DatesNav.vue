<script setup lang="ts">
import { ref } from 'vue';
import getWeekdaysWithDates from './computePossibleDays.ts';

const obj = ref(getWeekdaysWithDates());

const scrollX = (e: WheelEvent) => {
  const scrollContainer = document.querySelector('.box-middle-dates');
  if (scrollContainer) {
    scrollContainer.scrollLeft += e.deltaY;
    e.preventDefault();
  }
};
</script>

<template>
  <ul class="box-middle-dates" @mousewheel="scrollX">
    <router-link
      v-for="date in obj"
      :key="date.key"
      :to="`/date/${date.fullcalendarday}`"
    >
      <li :class="date.class" :id="date.id">
        {{ date.weekday }}
        <div>{{ date.calendarday }}</div>
      </li>
    </router-link>
  </ul>
</template>

<style>
.box-middle-dates {
  width: 600px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: hidden;
  /* mask-image: linear-gradient(
    to left,
    #00000030,
    black 20%,
    black 80%,
    #00000030 100%
  ); */
}

ul.box-middle-dates {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

.date-box {
  background-color: white;
  margin-left: 5px;
  margin-right: 5px;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.date-box:hover {
  background-color: rgb(230, 230, 230);
}

li.today-date {
  font-weight: bold;
  border: 1px dotted #646cff;
}

a.router-link-active > li {
  border: 1px solid #646cff;
}
</style>
