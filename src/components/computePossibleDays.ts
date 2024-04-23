export default function getWeekdaysWithDates(): Array<{
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
