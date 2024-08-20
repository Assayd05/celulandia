import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './NavBar.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graficas = () => {
  const [celulares, setCelulares] = useState([]);

  useEffect(() => {
    fetchCelulares();
  }, []);

  const fetchCelulares = async () => {
    try {
      const response = await axios.get('https://inventarios-api.onrender.com/api/celulares');
      const sortedData = response.data.sort((a, b) => b.precio - a.precio); // Ordenar por precio descendente
      setCelulares(sortedData);
    } catch (error) {
      console.error('Error al obtener los celulares:', error);
    }
  };

  const data = {
    labels: celulares.map(cel => cel.nombre),
    datasets: [
      {
        label: 'Precio',
        data: celulares.map(cel => cel.precio),
        backgroundColor: 'rgba(0, 188, 212, 0.6)',
        borderColor: 'rgba(0, 188, 212, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#444444'
        },
        ticks: {
          color: '#eeeeee'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#444444'
        },
        ticks: {
          color: '#eeeeee'
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#eeeeee'
        }
      },
      title: {
        display: true,
        text: 'Precios de Celulares',
        color: '#00bcd4',
        font: {
          size: 20,
          family: 'Roboto, sans-serif'
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <h1>Gráfica de Precios</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graficas;
