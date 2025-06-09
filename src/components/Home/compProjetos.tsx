import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

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
}

// Função utilitária para converter Timestamp do Firebase ou string para data legível
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
          updated_at: data.updated_at || ""
        });
      });
      setProjetos(rows);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center text-blue-900 py-8">Carregando projetos...</div>;
  if (projetos.length === 0) return <div className="text-center text-gray-500 py-8">Nenhum projeto encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid gap-8">
      <div className="w-full bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-2xl shadow border border-blue-200 p-8 mb-8 animate-slide-down" style={{ margin: 20 }}>
        <h4 className="text-xl font-bold text-blue-900 mb-6 text-center tracking-tight">Projetos</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-center items-stretch">
          {projetos.map((p, idx) => (
            <div key={p.id} className="bg-white/70 rounded-xl shadow border border-blue-200 p-4 flex flex-col items-center animate-slide-card" style={{ animationDelay: `${idx * 80}ms` }}>
              {p.imagemCapa && (
                <img src={p.imagemCapa} alt={p.nome} className="w-24 h-24 rounded-lg object-cover border-4 border-blue-300 shadow mb-2" />
              )}
              {p.gifPreview && (
                <img src={p.gifPreview} alt={p.nome + ' preview'} className="w-24 h-24 rounded-lg object-cover border-2 border-blue-200 shadow mb-2" />
              )}
              <h5 className="text-base font-bold text-blue-800 mb-1 text-center">{p.nome}</h5>
              <div className="w-full mb-1 text-sm">
                <span className="font-semibold text-blue-700">📝 Descrição:</span> <span className="text-gray-700">{p.descricao}</span>
              </div>
              <div className="w-full mb-1 text-sm">
                <span className="font-semibold text-blue-700">🚀 Tecnologias:</span> <span className="text-gray-700">{p.tecnologias.join(", ")}</span>
              </div>
              <div className="w-full mb-1 text-sm">
                <span className="font-semibold text-blue-700">📅 Publicação:</span> <span className="text-gray-700">{formatDate(p.dataPublicacao)}</span>
              </div>
              <div className="w-full mb-1 text-sm">
                <span className="font-semibold text-blue-700">🔖 Status:</span> <span className="text-gray-700">{p.status}</span>
              </div>
              <div className="w-full mb-1 text-sm">
                <span className="font-semibold text-blue-700">🌟 Destaque:</span> <span className="text-gray-700">{p.destaque ? "Sim" : "Não"}</span>
              </div>
              <div className="w-full flex flex-wrap gap-2 mt-2 justify-center">
                {p.linkDetalhes && <a href={p.linkDetalhes} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 text-xs">Detalhes</a>}
                {p.linkRepositorio && <a href={p.linkRepositorio} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 text-xs">Repositório</a>}
                {p.linkDemo && <a href={p.linkDemo} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 text-xs">Demo</a>}
              </div>
              <div className="w-full mt-2 text-xs text-gray-500 text-center">
                <div><b>Criado em:</b> {formatDate(p.created_at)}</div>
                <div><b>Atualizado em:</b> {formatDate(p.updated_at)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompProjetos;
