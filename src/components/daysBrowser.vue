<script setup lang="ts">
import { ref } from 'vue';

function getWeekdaysWithDates(): Array<{
  weekday: string;
  calendarday: string;
  fullcalendarday: string;
  key: string;
  class: string;
  id: string;
}> {
  const today = new Date();
  const weekday = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const dateKeyId = 'date-id-';
  let assignedClass = 'date-box';
  let dateId = 'ordinary-id';
  let keyIdCounter = 0;

  const weekdaysWithDatesArray: Array<{
    weekday: string;
    calendarday: string;
    fullcalendarday: string;
    key: string;
    class: string;
    id: string;
  }> = [];

  // Define the interval for days displayed in the app.
  for (let i = -28; i <= 0; i += 1) {
    const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);

    if (today.getDate() === currentDate.getDate()) {
      assignedClass = 'date-box today-date';
      dateId = 'today-date';
    }
    const dayName = weekday[currentDate.getDay()];
    const calendarDay = String(currentDate.getDate());

    const year = currentDate.getFullYear();
    const month = `0${currentDate.getMonth() + 1}`.slice(-2);
    const day = `0${currentDate.getDate()}`.slice(-2);

    weekdaysWithDatesArray.push({
      weekday: dayName,
      calendarday: calendarDay,
      fullcalendarday: `${year}-${month}-${day}`,
      key: dateKeyId + keyIdCounter,
      class: assignedClass,
      id: dateId,
    });

    keyIdCounter += 1;
    assignedClass = 'date-box';
    dateId = 'ordinary-id';
  }

  return weekdaysWithDatesArray;
}

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
