<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import getWeekdaysWithDates from './computePossibleDays.ts';
import { useUserData } from '../stores/userData.ts';

const obj = ref(getWeekdaysWithDates());
const katinas = useUserData();
const route = useRoute();

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
  katinas.insertDateTemplate(route.params.date);
  const activeItem = document.querySelector('.router-link-active');
  if (activeItem) {
    activeItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }
});

watch(route, (newValue, oldValue) => {
  console.log('Route changed:', newValue, oldValue);
  katinas.insertDateTemplate(route.params.date);
  // Perform your desired actions here...
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
  margin-top: 10px;
  margin-bottom: 10px;

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

.box-middle-dates::-webkit-scrollbar {
  display: none;
}

.box-middle-dates {
  -ms-overflow-style: none; /* IE and Edge */
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
