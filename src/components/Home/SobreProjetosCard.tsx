import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface ProjetoData {
  id: string;
  nome: string;
  destaque: boolean;
  likes?: number;
  tecnologias: string[];
  categoria: string;
}

interface Props {
  projetos: ProjetoData[];
}

const SobreProjetosCard: React.FC<Props> = ({ projetos }) => {
  const tecnologiasCount: { [tec: string]: number } = {};
  projetos.forEach((p) => {
    p.tecnologias.forEach((tec) => {
      tecnologiasCount[tec] = (tecnologiasCount[tec] || 0) + 1;
    });
  });

  const totalCurtidas = projetos.reduce((acc, p) => acc + (p.likes || 0), 0);

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

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#e0e7ef",
          font: { size: 13 }
        }
      },
      tooltip: {
        bodyColor: "#e0e7ef",
        titleColor: "#e0e7ef",
        callbacks: {
          label: function (context: any) {
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

  const barData = {
    labels: Object.keys(tecnologiasCount),
    datasets: [
      {
        label: "Projetos por Tecnologia",
        data: Object.values(tecnologiasCount),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const barOptions = {
    indexAxis: "x" as const,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#e0e7ef" },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "#e0e7ef" },
        grid: { color: "#334155" },
      },
    },
  };

  const categoriasCount: { [cat: string]: number } = {};
  projetos.forEach((p) => {
    categoriasCount[p.categoria] = (categoriasCount[p.categoria] || 0) + 1;
  });

  return (
    <div className="md:col-span-1 bg-white/10 rounded-2xl shadow-lg border-2 border-blue-200/40 p-6 flex flex-col min-h-[340px]">
      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h3.172a2 2 0 011.414.586l1.828 1.828A2 2 0 0012.828 8H19a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
        Sobre os Projetos
      </h4>
      <hr className="m-2 border-mb-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]" />

      <ul className="text-white/90 text-sm space-y-2 mb-4">
        <li><b>Total de projetos:</b> {projetos.length}</li>
        <li><b>Projetos em destaque:</b> {projetos.filter(p => p.destaque).length}</li>

        <li><b>Categorias:</b></li>
        {Object.entries(categoriasCount).sort((a, b) => b[1] - a[1]).map(([categoria, count]) => {
          const projetosDaCategoria = projetos
            .filter(p => p.categoria === categoria)
            .sort((a, b) => (b.likes || 0) - (a.likes || 0));

          return (
            <li key={categoria} className="indent-6">
              <b>{categoria} {count}</b>
              <ul className="ml-4 list-disc list-inside text-white/80 text-xs">
                {projetosDaCategoria.map((p) => (
                  <li key={p.id}>
                    <a
                        href={`#${p.nome}`}
                        className="hover:underline text-blue-300 whitespace-nowrap text-sm"
                      >
                        {p.nome}{" "}
                        <span className="text-pink-400 font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline h-3 w-3 fill-current mx-1"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        {p.likes || 0}
                      </span>
                      
                      </a>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}

        <li>
          <b>Mais curtido:</b>{" "}
          {projetos.length > 0 ? (
            <a
              href={`#${projetos.reduce((a, b) => (a.likes || 0) > (b.likes || 0) ? a : b).nome}`}
              className="text-blue-300 hover:underline"
            >
              {projetos.reduce((a, b) => (a.likes || 0) > (b.likes || 0) ? a : b).nome}
            </a>
          ) : "-"}
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
          <h5 className="text-base font-semibold text-blue-200 mb-2 text-center">Tecnologias mais usadas</h5>

          {/* Lista com porcentagens */}
          <ul className="text-sm text-white/90 space-y-1 mb-4">
            {Object.entries(tecnologiasCount)
              .sort((a, b) => b[1] - a[1])
              .map(([tec, count]) => {
                const total = Object.values(tecnologiasCount).reduce((a, b) => a + b, 0);
                const percent = ((count / total) * 100).toFixed(1);
                return (
                  <li key={tec} className="flex justify-between">
                    <span className="font-medium">{tec}</span>
                    <span className="text-blue-200">{percent}%</span>
                  </li>
                );
              })}
          </ul>

          {/* Gráfico de Pizza */}
          <div className="w-full flex justify-center items-center mb-6">
            <Pie data={pieData} options={pieOptions} style={{ maxWidth: 260, maxHeight: 260 }} />
          </div>

          {/* Gráfico de Barras Verticais */}
          <div className="w-full mb-2">
            <Bar data={barData} options={barOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default SobreProjetosCard;
