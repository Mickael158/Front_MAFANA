import React, { useState, useEffect } from 'react';
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

const Cotisation = () => {
    const [cotisations, setCotisations] = useState([]);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const ListeCotisation = async () => {
            try {
                const response = await axios.get('https://localhost:8000/api/StatCotisation',{
                    headers:
                    {
                      'Authorization' : `Bearer ${token}`
                    }
                  });
                const data = response.data;
                // Transform the data into the format needed for the chart
                const labels = Array(12).fill('').map((_, i) => new Date(2024, i).toLocaleString('default', { month: 'short' }));
                const dataSet = labels.map(month => {
                    const item = data.find(d => new Date(d.mois).getMonth() === labels.indexOf(month));
                    return item ? parseFloat(item.total_paye_par_mois) : 0;
                });
                
                setChartData({
                    labels,
                    datasets: [{
                        label: "Total Payé par Mois",
                        borderColor: "#f96332",
                        pointBorderColor: "#FFF",
                        pointBackgroundColor: "#f96332",
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        backgroundColor: "#f96332",
                        borderWidth: 2,
                        data: dataSet
                    }]
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };
        ListeCotisation();
    }, []);
    
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

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
                    display: false
                },
                ticks: {
                    display: false
                },
            },
            x: {
                display: false,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
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
            <Bar data={chartData} options={options} />
        </>
    );
}

export default Cotisation;
