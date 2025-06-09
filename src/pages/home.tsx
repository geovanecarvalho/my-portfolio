import type React from "react";
import ComponentMenuHome from "../components/Home/compMenuHome";
import CompPerfil from "../components/Home/compPerfil";
import CompProjetos from "../components/Home/compProjetos";
import CompConferencia from "../components/Home/compConferencia";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700">
      <ComponentMenuHome pageName="Seja bem-vindo ao meu portfólio" />
      <main className="max-w-5xl mx-auto flex flex-col gap-12 px-2 md:px-6 py-10">
        {/* Perfil em destaque no topo */}
        <section className="w-full flex flex-col items-center">
          <CompPerfil />
        </section>
        {/* Projetos em destaque, centralizados */}
        <section className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center tracking-tight">
            
          </h2>
          <CompProjetos />
        </section>
        {/* Conferências e Comunidade */}
        <section className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center tracking-tight">
            
          </h2>
          <CompConferencia />
        </section>
      </main>
    </div>
  );
};

export default Home;



