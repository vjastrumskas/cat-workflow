<script setup>
import { ref } from 'vue';
import getWeekdaysWithDates from './computePossibleDays.ts';

const x = ref(getWeekdaysWithDates());
</script>

<template>
  <ul class="box-middle-dates">
    <router-link
      v-for="date in x"
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
  width: 300px;
  display: flex;
  overflow-x: scroll;
  margin-bottom: 5px;
  mask-image: linear-gradient(
    to left,
    #00000030,
    black 20%,
    black 80%,
    #00000030 100%
  );
}

ul.box-middle-dates {
  list-style: none;
  padding: 0;
  margin-bottom: 5px;
}

a {
  text-decoration: none;
  color: inherit;
}

.date-box {
  background-color: white;
  margin: 5px;
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
  background-color: rgb(221 221 221);
}

li.today-date {
  font-weight: bold;
  border: 1px dotted gray;
}

a.router-link-active > li {
  border: 1px solid gray;
}
</style>
