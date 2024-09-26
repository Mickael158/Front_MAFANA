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
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Membre = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState({ labels: [], datasets: [] });

    const ListeMembres = () => {
        axios.get('https://localhost:8000/api/StatPersonne',{
            headers:
            {
              'Authorization' : `Bearer ${token}`
            }
          })
            .then(response => {
                const apiData = response.data;

                // Initialisez les labels des mois
                const months = [
                    "January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"
                ];

                // Créez un tableau pour les valeurs du graphique
                const values = new Array(12).fill(0);

                // Mappez les données de l'API aux mois et valeurs
                apiData.forEach(item => {
                    const date = new Date(item.mois);
                    const monthIndex = date.getMonth(); // Les mois sont de 0 (Janvier) à 11 (Décembre)
                    values[monthIndex] = item.nombre_personnes;
                });

                setData({
                    labels: months,
                    datasets: [{
                        label: "Nombre de personnes inscrites",
                        backgroundColor: "#2CA8FF",
                        borderColor: "#2CA8FF",
                        pointBorderColor: "#FFF",
                        pointBackgroundColor: "#2CA8FF",
                        pointBorderWidth: 2,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        borderWidth: 1,
                        data: values
                    }],
                });
            });
    };

    useEffect(() => {
        ListeMembres();
    }, []);

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                bodySpacing: 4,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            }
        },
        responsive: true,
        scales: {
            y: {
                display: true,
                grid: {
                    color: "transparent"
                },
                ticks: {
                    display: true
                }
            },
            x: {
                display: true,
                grid: {
                    color: "transparent"
                },
                ticks: {
                    display: true
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

export default Membre;
