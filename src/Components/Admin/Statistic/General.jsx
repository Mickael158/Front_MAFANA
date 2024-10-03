import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment'; // Utilisé pour manipuler les dates

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const General = () => {
  const token = localStorage.getItem("token");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "Data",
      backgroundColor: "#1e3d60",
      borderWidth: 1,
      data: []
    }]
  });

  const ListeTresoreri = () => {
    axios.get('https://localhost:8000/api/StatTresoreri',{
      headers:
      {
        'Authorization' : `Bearer ${token}`
      }
    }).then(response => {
      const tresoreriData = response.data;

      // Transformer les montants et les dates
      const labels = tresoreriData.map(item => moment(item.date_tresoreri).format('MMM')); // ex : 'JAN', 'FEB'
      const data = tresoreriData.map(item => parseFloat(item.montant));

      // Mettre à jour les données du graphique
      setChartData({
        labels: labels,
        datasets: [{
          label: "Montant",
          backgroundColor: "#1e3d60",
          borderWidth: 1,
          data: data
        }]
      });
    });
  };

  useEffect(() => {
    ListeTresoreri();
  } , []);

  const options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0
      }
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      },
      x: {
        ticks: {
          fontColor: "rgba(255,255,255,0.4)",
          fontStyle: "bold"
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  )
}

export default General;
