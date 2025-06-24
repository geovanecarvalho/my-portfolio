import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FolderSimple } from "@phosphor-icons/react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProjetoData {
  id: string;
  nome: string;
  destaque: boolean;
  likes?: number;
  tecnologias: string[];
}

interface Props {
  projetos: ProjetoData[];
}

const SobreProjetosCard: React.FC<Props> = ({ projetos }) => {
  // Conta quantos projetos usam cada tecnologia
  const tecnologiasCount: { [tec: string]: number } = {};
  projetos.forEach((p) => {
    p.tecnologias.forEach((tec) => {
      tecnologiasCount[tec] = (tecnologiasCount[tec] || 0) + 1;
    });
  });

  // Total de curtidas
  const totalCurtidas = projetos.reduce((acc, p) => acc + (p.likes || 0), 0);

  // Dados do gráfico
  const pieData = {
    labels: Object.keys(tecnologiasCount),
    datasets: [
      {
        data: Object.values(tecnologiasCount),
        backgroundColor: [
          "#60a5fa", "#fbbf24", "#34d399", "#f87171", "#a78bfa", "#f472b6", "#facc15", "#818cf8"
        ],
      },
    ],
  };

  // Opções para texto mais claro no gráfico
  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#e0e7ef", // texto mais claro
          font: { size: 13 }
        }
      },
      tooltip: {
        bodyColor: "#e0e7ef",
        titleColor: "#e0e7ef",
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} projetos (${percent}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="md:col-span-1 bg-white/10 rounded-2xl shadow-lg border-2 border-blue-200/40 p-6 flex flex-col min-h-[340px]">
      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
  Sobre os Projetos
</h4>
      <hr className="m-2 border-mb-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]"></hr>
      <ul className="text-white/90 text-sm space-y-2 mb-4">
        <li><b>Total de projetos:</b> {projetos.length}</li>
        <li><b>Projetos em destaque:</b> {projetos.filter(p => p.destaque).length}</li>
        <li>
          <b>Mais curtido:</b>{" "}
          {projetos.length > 0
            ? projetos.reduce((a, b) => (a.likes || 0) > (b.likes || 0) ? a : b, projetos[0])?.nome
            : "-"}
        </li>
        <li className="flex items-center gap-1">
          <b>Total de curtidas:</b>
          <span className="text-pink-400 font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 fill-current mx-1" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            {totalCurtidas}
          </span>
        </li>
      </ul>
      {Object.keys(tecnologiasCount).length > 0 && (
        <>
            <hr className="mb-4 border-mb-2" />
          <h5 className="text-base font-semibold text-blue-200 mb-2 text-center">Tecnologias mais usadas (%)</h5>
          <div className="w-full flex justify-center items-center">
            <Pie data={pieData} options={pieOptions} style={{ maxWidth: 220, maxHeight: 220 }} />
          </div>
        </>
      )}
    </div>
  );
};

export default SobreProjetosCard;