<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getWeekdaysWithDates from './computePossibleDays.ts';

const obj = ref(getWeekdaysWithDates());

const scrollX = (e: WheelEvent) => {
  const scrollContainer = document.querySelector('.box-middle-dates');
  if (scrollContainer) {
    // Check if the event is triggered by a mousewheel
    if (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
      scrollContainer.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }
};

onMounted(() => {
  const activeItem = document.querySelector('.router-link-active');
  if (activeItem) {
    activeItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }
});
</script>

<template>
  <ul class="box-middle-dates" @wheel="scrollX">
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
  /* overflow-y: hidden; */
  /* overflow: hidden; */
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

@media screen and (max-width: 620px) {
  .box-middle-dates {
    width: 90vw;
    min-width: 300px;
  }
}
</style>
