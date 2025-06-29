import React, { useEffect, useState } from "react";
import ComponentMenuHome from "../components/Home/compMenuHome";
import CompPerfil from "../components/Home/compPerfil";
import CompProjetos from "../components/Home/compProjetos";
import CompConferencia from "../components/Home/compConferencia";
import DashboardProjects from "../components/Home/compHomeDashboard";

interface ProjetoData {
  id: string;
  nome: string;
  destaque: boolean;
  likes?: number;
  tecnologias: string[];
  categoria: string;
}

const Home: React.FC = () => {
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [dashboardAberto, setDashboardAberto] = useState(false);

  useEffect(() => {
    // Simulação de busca de projetos (você pode substituir pelo Firebase)
    const projetosFake: ProjetoData[] = [
      {
        id: "1",
        nome: "Sistema Web",
        destaque: true,
        likes: 15,
        tecnologias: ["React", "Firebase"],
        categoria: "Web",
      },
      {
        id: "2",
        nome: "App Mobile",
        destaque: false,
        likes: 22,
        tecnologias: ["React Native"],
        categoria: "Mobile",
      },
      {
        id: "3",
        nome: "Dashboard Admin",
        destaque: true,
        likes: 30,
        tecnologias: ["React", "Chart.js"],
        categoria: "Admin",
      },
    ];

    setProjetos(projetosFake);
  }, []);

  const handleProjectClick = () => {
    console.log("Novo projeto clicado");
    // Você pode redirecionar ou abrir um modal
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-300 to-blue-400 relative">
      {/* Menu no topo (fixo se quiser) */}
      <ComponentMenuHome pageName="Seja bem-vindo ao meu portfólio" />

      {/* Dashboard lateral (fixo/flutuante) */}
   
      <DashboardProjects
        onProjectClick={handleProjectClick}
        projetos={projetos}
      />
      

      {/* Conteúdo principal: com margem apenas quando o dashboard estiver fechado */}
      <main
        className={`max-w-screen-xl flex flex-col gap-6 px-2 md:px-6 py-4 pt-36 transition-all duration-300
          ${dashboardAberto ? '' : 'ml-16'}
        `}
      >
        {/* Perfil */}
        <section id="sobre" className="pt-36 w-full flex flex-col items-center">
          <CompPerfil />
        </section>

        {/* Conferência */}
        <section id="conferencia" className="pt-36 w-full flex flex-col items-center">
          <CompConferencia />
        </section>

        {/* Projetos */}
        <section id="projetos" className="pt-36 w-full flex flex-col items-center">
          <CompProjetos />
        </section>
      </main>
    </div>
  );
};

export default Home;
