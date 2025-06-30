// src/pages/ProjetoDetalhe.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import MenuDetail from "../components/Detail/MenuDetail";

interface ProjetoData {
  id: string;
  nome: string;
  descricao: string;
  imagemCapa: string;
  gifPreview: string;
  linkRepositorio: string;
  linkDemo: string;
  tecnologias: string[];
  dataPublicacao: string;
  status: string;
  categoria: string;
  created_at: string;
  updated_at: string;
  likes?: number;
}

function formatDate(date: any) {
  if (date && typeof date === "object" && "seconds" in date) {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }
  if (typeof date === "string" && date.length > 0) {
    const d = new Date(date);
    if (!isNaN(d.getTime())) return d.toLocaleDateString();
    return date;
  }
  return "";
}

const ProjetoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projeto, setProjeto] = useState<ProjetoData | null>(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      if (id) {
        const docRef = doc(db, "projetos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProjeto({
            id: docSnap.id,
            nome: data.nome,
            descricao: data.descricao,
            imagemCapa: data.imagemCapa,
            gifPreview: data.gifPreview,
            linkRepositorio: data.linkRepositorio,
            linkDemo: data.linkDemo,
            tecnologias: data.tecnologias || [],
            dataPublicacao: data.dataPublicacao,
            status: data.status,
            categoria: data.categoria,
            created_at: data.created_at,
            updated_at: data.updated_at,
            likes: data.likes || 0,
          });
        }
      }
    };

    fetchProjeto();
  }, [id]);

  if (!projeto) return <div className="text-white text-center mt-10">Carregando projeto...</div>;

  return (
      
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-300 to-blue-400 py-12 px-4">
      <MenuDetail pageName={"Detalhes do Projeto - 📝 " +  projeto.nome}/>
      <div className="w-full mt-28 max-w-7xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 rounded-3xl border-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]">
        <h1 className="text-3xl font-bold mb-4">{projeto.nome}</h1>
          
        {projeto.imagemCapa && (
          <img src={projeto.imagemCapa} alt={projeto.nome} className="w-full h-64 object-cover rounded-xl mb-6" />
        )}

        <p className="mb-4"><span className="font-semibold">📌 Categoria:</span> {projeto.categoria}</p>
        <p className="mb-4"><span className="font-semibold">📝 Descrição:</span> {projeto.descricao}</p>
        <p className="mb-4"><span className="font-semibold">🚀 Tecnologias:</span> {projeto.tecnologias.join(", ")}</p>
        <p className="mb-4"><span className="font-semibold">📅 Publicado:</span> {formatDate(projeto.dataPublicacao)}</p>
        <p className="mb-4"><span className="font-semibold">👍 Likes:</span> {projeto.likes}</p>

        <div className="flex gap-4 flex-wrap mt-4">
          {projeto.linkDemo && (
            <a href={projeto.linkDemo} target="_blank" className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Ver Demo</a>
          )}
          {projeto.linkRepositorio && (
            <a href={projeto.linkRepositorio} target="_blank" className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-800">Ver Código</a>
          )}
        </div>

        {projeto.gifPreview && (
          <div className="mt-8">
            <img src={projeto.gifPreview} alt="Preview" className="rounded-xl w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjetoDetalhe;
