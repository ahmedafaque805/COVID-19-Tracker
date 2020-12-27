import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ infected, recovered, deaths }) => {
  const data = {
    labels: ['Infected', 'Recovered', 'Deaths'],
    datasets: [
      {
        data: [infected, recovered, deaths],
        backgroundColor: ['#f4d03f', '#adff2f', '#ed3b43'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      fontSize: -50,
    },
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div>
      <center>
        <h3>CoronaVirus Cases</h3>
      </center>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;