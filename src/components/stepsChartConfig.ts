import { useUserData } from '../stores/userData.ts';

export function data() {
  const user = useUserData();
  return {
    labels: ['goal'],
    datasets: [
      {
        backgroundColor: ['#ffc400'],
        data: [user.getStepsCompletedModifed(user.getStepsCompleted())],
        barPercentage: 0.3,
        barThickness: 10,
        borderRadius: 10,
      },
      {
        backgroundColor: ['#e1ecf5'],
        data: [
          user.computeStepsGoalAchievement(
            user.getStepsGoal(),
            user.getStepsCompleted()
          ),
        ],
        barPercentage: 0.3,
        barThickness: 10,
        borderRadius: 10,
      },
    ],
  };
}

export function options(): object {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    indexAxis: 'y',
    plugins: {
      roundedBars: {
        cornerRadius: 4,
        allCorners: true,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };
}
