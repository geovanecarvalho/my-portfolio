import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

// Gráfico simples com Chart.js (react-chartjs-2)
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompGrafico: React.FC = () => {
  const [projetosCount, setProjetosCount] = useState(0);
  const [perfisCount, setPerfisCount] = useState(0);
  const [conferenciasCount, setConferenciasCount] = useState(0);

  useEffect(() => {
    // Buscar quantidade de projetos
    getDocs(collection(db, "projetos")).then((snap) => setProjetosCount(snap.size));
    // Buscar quantidade de perfis
    getDocs(collection(db, "perfil")).then((snap) => setPerfisCount(snap.size));
    // Buscar quantidade de conferências
    getDocs(collection(db, "conferencias")).then((snap) => setConferenciasCount(snap.size));
  }, []);

  const data = {
    labels: ['Projetos', 'Perfis', 'Conferências'],
    datasets: [
      {
        label: 'Quantidade',
        data: [projetosCount, perfisCount, conferenciasCount],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)', // azul
          'rgba(16, 185, 129, 0.7)', // verde
          'rgba(251, 191, 36, 0.7)', // amarelo
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Análise Geral do Sistema',
        color: '#1e293b',
        font: { size: 20, weight: 'bold' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#334155', font: { size: 14 } },
        grid: { color: '#e5e7eb' },
      },
      x: {
        ticks: { color: '#334155', font: { size: 14 } },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto my-8">
      <Bar data={data} options={options} height={300} />
    </div>
  );
};

export default CompGrafico;
