import { useUserData } from '../stores/userData.ts';

// Function to create the data object
export function data() {
  const user = useUserData();
  return {
    labels: [
      ['Food', user.computeConsumedEnergy()],
      ['Base Goal', user.user.goal],
      ['Exercise', user.computeTotalCaloriesBurnt().toString()],
    ],
    datasets: [
      {
        backgroundColor: ['#7ec099', '#e1ecf5', '#ffc400'],
        data: [
          user.computeConsumedEnergy(),
          parseInt(
            user.computeRemainder(
              user.getGoal(),
              user.computeConsumedEnergy(),
              user.computeTotalCaloriesBurnt()
            ),
            10
          ),
          user.computeTotalCaloriesBurnt(),
        ],
        borderRadius: 5,
        drawBorder: false,
        hoverBorderWidth: 1,
        hoverBorderColor: '#646cff',
      },
    ],
  };
}

// Function to create the options object
export function options(): object {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };
}
