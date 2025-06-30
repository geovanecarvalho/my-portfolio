import type React from "react";
import ComponentMenuHome from "../components/Home/compMenuHome";
import CompPerfil from "../components/Home/compPerfil";
import CompProjetos from "../components/Home/compProjetos";
import CompConferencia from "../components/Home/compConferencia";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-300 to-blue-400">
      <ComponentMenuHome pageName="Seja bem-vindo ao meu portfólio" />
      <main className="max-w-screen-xl mx-auto flex flex-col gap-6 px-2 md:px-6 py-4 pt-32">

        {/* Painel de destaque do perfil */}
        <section id="sobre" className="w-full flex flex-col items-center">
          <CompPerfil />
        </section>
        {/* Conferências e Comunidade */}
        <section id="conferencia" className="w-full flex flex-col items-center">
          <CompConferencia />
        </section>
        {/* Projetos em destaque, centralizados */}
        <section id="projetos" className=" w-full flex flex-col items-center">
          <CompProjetos />
        </section>
      </main>
    </div>
  );
};

export default Home;



