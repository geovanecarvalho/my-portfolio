import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Globe, MapPin } from "@phosphor-icons/react";

interface ConferenciaData {
  id: string;
  nome: string;
  local: string;
  imagem: string;
  site: string;
}

const CompConferencia: React.FC = () => {
  const [conferencias, setConferencias] = useState<ConferenciaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "conferencias")).then((snapshot) => {
      const rows: ConferenciaData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nome: data.nome || "",
          local: data.local || "",
          imagem: data.imagem || "",
          site: data.site || "",
        });
      });
      setConferencias(rows);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center text-blue-900 py-8">Carregando conferências...</div>;
  if (conferencias.length === 0) return <div className="text-center text-gray-500 py-8">Nenhuma conferência encontrada.</div>;

  return (
    <section className="w-full flex flex-col items-center bg-gradient-to-br from-blue-700 via-blue-600 to-blue-450 rounded-[2rem] shadow-2xl p-8 mb-8 border-4 border-blue-300">
      <h4 className="text-2xl font-extrabold text-white drop-shadow-lg mb-8 text-center tracking-tight font-inter">Conferências e Comunidade</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full justify-center items-stretch">
        {conferencias.map((c) => (
          <div key={c.id} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border-4 border-white/30 p-6 flex flex-col items-center min-h-[260px]">
            {c.imagem && (
              <div className="mb-3">
                <img src={c.imagem} alt={c.nome} className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg" />
              </div>
            )}
            <h5 className="text-lg font-bold text-white drop-shadow mb-2 text-center font-inter">{c.nome}</h5>
            <div className="w-full mb-2 text-sm flex items-center justify-center gap-2">
              <MapPin size={20} color="#38bdf8" weight="fill" />
              <span className="font-semibold text-blue-100">Local:</span>
              <span className="text-blue-50 text-justify">{c.local}</span>
            </div>
            <div className="w-full text-sm flex items-center justify-center gap-2">
              <Globe size={20} color="#fbbf24" weight="fill" />
              <span className="font-semibold text-blue-100">Site:</span>
              {c.site ? (
                <a href={c.site} target="_blank" rel="noopener noreferrer" className="underline text-blue-100 break-all hover:text-yellow-400 transition-colors">{c.site}</a>
              ) : (
                <span className="text-blue-200">Não informado</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompConferencia;
