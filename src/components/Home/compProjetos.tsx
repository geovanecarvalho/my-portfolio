import React, { useEffect, useState, Fragment } from "react";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../services/firebase";
import { LinkSimple, GithubLogo, Monitor } from "@phosphor-icons/react";
import SobreProjetosCard from "./SobreProjetosCard";

interface ProjetoData {
  id: string;
  nome: string;
  descricao: string;
  imagemCapa: string;
  gifPreview: string;
  linkDetalhes: string;
  linkRepositorio: string;
  linkDemo: string;
  tecnologias: string[];
  dataPublicacao: string;
  status: string;
  destaque: boolean;
  created_at: string;
  updated_at: string;
  likes?: number;
}

function formatDate(date: any) {
  if (date && typeof date === 'object' && 'seconds' in date) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }
  if (typeof date === 'string' && date.length > 0) {
    const d = new Date(date);
    if (!isNaN(d.getTime())) return d.toLocaleDateString();
    return date;
  }
  return '';
}

const CompProjetos: React.FC = () => {
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState<string | null>(null);

  useEffect(() => {
    getDocs(collection(db, "projetos")).then((snapshot) => {
      const rows: ProjetoData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nome: data.nome || "",
          descricao: data.descricao || "",
          imagemCapa: data.imagemCapa || "",
          gifPreview: data.gifPreview || "",
          linkDetalhes: data.linkDetalhes || "",
          linkRepositorio: data.linkRepositorio || "",
          linkDemo: data.linkDemo || "",
          tecnologias: Array.isArray(data.tecnologias) ? data.tecnologias : [],
          dataPublicacao: data.dataPublicacao || "",
          status: data.status || "",
          destaque: !!data.destaque,
          created_at: data.created_at || "",
          updated_at: data.updated_at || "",
          likes: typeof data.likes === "number" ? data.likes : 0,
        });
      });
      // Ordena: destaque primeiro
      rows.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
      setProjetos(rows);
      setLoading(false);
    });
  }, []);

  // Função para curtir um projeto
  const handleLike = async (projetoId: string) => {
    setLikeLoading(projetoId);
    const projetoRef = doc(db, "projetos", projetoId);
    await updateDoc(projetoRef, { likes: increment(1) });
    setProjetos((prev) =>
      prev.map((p) =>
        p.id === projetoId ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
    setLikeLoading(null);
  };

  if (loading)
    return <div className="text-center text-blue-900 py-4 animate-pulse">Carregando projetos...</div>;
  if (projetos.length === 0)
    return <div className="text-center text-gray-600 py-4">Nenhum projeto encontrado.</div>;

  return (
    <Fragment>
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 rounded-3xl border-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-8 tracking-tight font-inter">
          Projetos
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Cards dos projetos ocupando 2 colunas */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 ">
            {projetos.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border-2 border-white/30 p-6 flex flex-col min-h-[340px] md:col-span-2"
    
              >
                {/* Linha com imagem e título à esquerda */}
                <div className="flex flex-row items-center w-full mb-4">
                  {p.imagemCapa && (
                    <img
                      src={p.imagemCapa}
                      alt={p.nome}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-300 shadow mr-4"
                    />
                  )}
                  <h5 className="text-2xl font-bold text-white drop-shadow text-left">{p.nome}</h5>
                </div>

                {/* Dados do projeto alinhados à esquerda em fieldset */}
                <fieldset className="border-2 border-blue-200/60 rounded-xl px-4 py-3 bg-white/10 w-full mb-2">
                  <legend className="font-semibold text-white px-2 flex items-center gap-2">
                    Informações
                  </legend>
                  <div className="text-white text-sm mt-2 space-y-1 text-left">
                    <div>
                      <span className="font-semibold text-blue-200">📝 Descrição:</span>{" "}
                      <span
                        className="text-white/90 block text-justify indent-6 mb-2"
                        style={{ textIndent: "1rem", marginBottom: "0.75rem" }}
                      >
                        {p.descricao}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-200">🚀 Tecnologias:</span>{" "}
                      <span className="flex flex-wrap gap-2 mt-1">
                        {p.tecnologias
                          .join(",")
                          .split(",")
                          .map((tec) => (
                            <span
                              key={tec.trim()}
                              className="border border-white rounded-lg bg-white/20 text-white px-3 py-1 text-xs font-medium"
                            >
                              {tec.trim()}
                            </span>
                          ))}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-200">📅 Publicação:</span>{" "}
                      <span className="text-white/90">{formatDate(p.dataPublicacao)}</span>
                    </div>
                    <div className="text-xs text-blue-100">
                      <b>Criado em:</b> {formatDate(p.created_at)} &nbsp;|&nbsp;
                      <b>Atualizado em:</b> {formatDate(p.updated_at)}
                    </div>
                  </div>
                </fieldset>

                {/* Preview GIF ocupando toda a largura, tamanho padrão */}
                {p.gifPreview && (
                  <div className="w-full flex justify-center">
                    <img
                      src={p.gifPreview}
                      alt={p.nome + ' preview'}
                      className="w-full h-64 rounded-lg object-cover border-2 border-blue-200/60 shadow my-2 bg-white/10"
                    />
                  </div>
                )}

                {/* Fieldset para links com ícones */}
                <fieldset className="border-2 border-blue-200/60 rounded-xl px-4 py-3 bg-white/10 w-full mb-2 mt-2">
                  <legend className="font-semibold text-white px-2 flex items-center gap-2">
                    Links
                  </legend>
                  <div className="flex flex-wrap gap-4 justify-center w-full mt-2">
                    {p.linkDetalhes && (
                      <a
                        href={p.linkDetalhes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-200 hover:text-yellow-400 transition-colors text-sm"
                        title="Detalhes"
                      >
                        <LinkSimple size={20} weight="bold" />
                        Detalhes
                      </a>
                    )}
                    {p.linkRepositorio && (
                      <a
                        href={p.linkRepositorio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-200 hover:text-yellow-400 transition-colors text-sm"
                        title="Repositório"
                      >
                        <GithubLogo size={20} weight="bold" />
                        Repositório
                      </a>
                    )}
                    {p.linkDemo && (
                      <a
                        href={p.linkDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-200 hover:text-yellow-400 transition-colors text-sm"
                        title="Demo"
                      >
                        <Monitor size={20} weight="bold" />
                        Demo
                      </a>
                    )}
                  </div>
                </fieldset>

                {/* Botão de curtida ocupando toda a largura */}
                <div className="w-full mt-2">
                  <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600 text-white font-semibold shadow hover:bg-pink-500 transition-colors text-lg"
                    title="Curtir este projeto"
                    onClick={() => handleLike(p.id)}
                    disabled={likeLoading === p.id}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    Curtir
                    <span className="ml-1 text-xs">({p.likes || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Card lateral ocupando 1 coluna */}
            <SobreProjetosCard projetos={projetos} />
        </div>
      </div>
    </Fragment>
  );
};

export default CompProjetos;