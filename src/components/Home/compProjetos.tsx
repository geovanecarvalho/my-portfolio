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
  categoria: string;
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
          categoria: data.categoria || "",
          created_at: data.created_at || "",
          updated_at: data.updated_at || "",
          likes: typeof data.likes === "number" ? data.likes : 0,
        });
      });
      rows.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
      setProjetos(rows);
      setLoading(false);
    });
  }, []);

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

  if (loading) return <div className="text-center text-blue-900 py-4 animate-pulse">Carregando projetos...</div>;
  if (projetos.length === 0) return <div className="text-center text-gray-600 py-4">Nenhum projeto encontrado.</div>;

  return (
    <Fragment>
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 rounded-3xl border-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-8 tracking-tight font-inter">
          Projetos
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-1 gap-8">
            {projetos.map((p) => (
              <div
                key={p.id}
                className="bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900 p-6 rounded-2xl border border-blue-300/30 shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center mb-4">
                  {p.imagemCapa && (
                    <img
                      src={p.imagemCapa}
                      alt={p.nome}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400 mr-4"
                    />
                  )}
                  <h3 className="text-white text-xl font-bold drop-shadow tracking-tight">{p.nome}</h3>
                </div>

                <div className="mb-4">
                  <span className="font-semibold text-blue-200">📝 Descrição:</span>
                  <p className="text-white/80 text-sm text-justify mt-1">{p.descricao}</p>
                </div>

                <ul className="text-sm text-white/70 space-y-1 mb-4">
                  <li><span className="font-semibold text-blue-200">📌 Categoria:</span> {p.categoria}</li>
                  <li><span className="font-semibold text-blue-200">⭐ Destaque:</span> {p.destaque ? "Sim" : "Não"}</li>
                  <li><span className="font-semibold text-blue-200">📅 Publicação:</span> {formatDate(p.dataPublicacao)}</li>
                  <li className="text-xs text-blue-100">
                    <b>Criado:</b> {formatDate(p.created_at)} | <b>Atualizado:</b> {formatDate(p.updated_at)}
                  </li>
                </ul>

                <div className="mb-4">
                  <span className="font-semibold text-blue-200">🚀 Tecnologias:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {p.tecnologias.map((tec) => (
                      <span
                        key={tec}
                        className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-md border border-white/30"
                      >
                        {tec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-start mb-4">
                  {p.linkDetalhes && (
                    <a href={p.linkDetalhes} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-yellow-400 flex items-center gap-1 text-sm">
                      <LinkSimple size={18} /> Detalhes
                    </a>
                  )}
                  {p.linkRepositorio && (
                    <a href={p.linkRepositorio} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-yellow-400 flex items-center gap-1 text-sm">
                      <GithubLogo size={18} /> Repositório
                    </a>
                  )}
                  {p.linkDemo && (
                    <a href={p.linkDemo} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-yellow-400 flex items-center gap-1 text-sm">
                      <Monitor size={18} /> Demo
                    </a>
                  )}
                </div>

                {p.gifPreview && (
                  <div className="mb-4">
                    <img
                      src={p.gifPreview}
                      alt="Preview do projeto"
                      className="rounded-xl w-full max-h-64 object-cover border border-white/20 shadow-inner"
                    />
                  </div>
                )}

                <button
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-xl flex justify-center items-center gap-2 shadow-md transition-all"
                  onClick={() => handleLike(p.id)}
                  disabled={likeLoading === p.id}
                >
                  ❤️ Curtir <span className="text-xs font-light">({p.likes || 0})</span>
                </button>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <SobreProjetosCard projetos={projetos} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CompProjetos;