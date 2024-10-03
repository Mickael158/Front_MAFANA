import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Donnation = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: "Email Stats",
            borderColor: "#18ce0f",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#18ce0f",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            backgroundColor: "#18ce0f",
            borderWidth: 2,
            data: []
        }]
    });

    const ListeDonnations = () => {
        axios.get('https://localhost:8000/api/StatDonnation',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          }).then(response => {
            const apiData = response.data;
            const labels = apiData.map(item => {
                // Convert the date to your required format here
                const date = new Date(item.mois);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            });
            const values = apiData.map(item => parseFloat(item.total_montant));
            
            setData({
                labels: labels,
                datasets: [{
                    ...data.datasets[0],
                    data: values
                }]
            });
        });
    };

    useEffect(() => {
        ListeDonnations(); 
    } , []);

    const options = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
        },
        responsive: true,
        scales: {
            y: {
                display: false,
                grid: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            },
            x: {
                display: false,
                grid: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 15,
                bottom: 15
            }
        }
    };

    return (
        <>
            <Bar data={data} options={options} />
        </>
    );
}

export default Donnation;
