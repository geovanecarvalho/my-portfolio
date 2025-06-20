import type React from "react";
import ComponentMenuHome from "../components/Home/compMenuHome";
import CompPerfil from "../components/Home/compPerfil";
import CompProjetos from "../components/Home/compProjetos";
import CompConferencia from "../components/Home/compConferencia";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-300 to-blue-400">
      <ComponentMenuHome pageName="Seja bem-vindo ao meu portfólio" />
      <main className="max-w-screen-xl mx-auto flex flex-col gap-6 px-2 md:px-6 py-4">
        {/* Painel de destaque do perfil */}
        <section className="w-full flex flex-col items-center bg-gradient-to-br from-blue-700 via-blue-400 to-blue-450 rounded-3xl shadow-2xl p-2 mb-4 animate-slide-down">
          <CompPerfil />
        </section>
        {/* Conferências e Comunidade */}
        <section className="w-full flex flex-col items-center bg-gradient-to-br from-blue-700 via-blue-400 to-blue-450 rounded-3xl shadow-2xl p-2 mb-4 animate-slide-down">
          <CompConferencia />
        </section>
        {/* Projetos em destaque, centralizados */}
        <section className="w-full flex flex-col items-center bg-gradient-to-br from-blue-700 via-blue-400 to-blue-450 rounded-3xl shadow-2xl p-2 mb-4 animate-slide-down">
          <CompProjetos />
        </section>
      </main>
    </div>
  );
};

export default Home;



