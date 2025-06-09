import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

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
    <footer className="max-w-4xl mx-auto p-4 grid gap-8">
      <div className="w-full bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-2xl shadow border border-blue-200 p-8 mb-8 animate-slide-down" style={{ margin: 20 }}>
        <h4 className="text-xl font-bold text-blue-900 mb-6 text-center tracking-tight">Conferências e Comunidade</h4>
        {conferencias.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Nenhuma conferência encontrada.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full justify-center items-stretch">
            {conferencias.map((c) => (
              <div key={c.id} className="bg-white/70 rounded-xl shadow border border-blue-200 p-4 flex flex-col items-center">
                {c.imagem && (
                  <img src={c.imagem} alt={c.nome} className="w-20 h-20 rounded-full object-cover border-4 border-blue-300 shadow mb-2" />
                )}
                <h5 className="text-base font-bold text-blue-800 mb-1 text-center">{c.nome}</h5>
                <div className="w-full mb-1 text-sm">
                  <span className="font-semibold text-blue-700">📍 Local:</span> <span className="text-gray-700">{c.local}</span>
                </div>
                <div className="w-full text-sm">
                  <span className="font-semibold text-blue-700">🌐 Site:</span> {c.site ? (
                    <a href={c.site} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 break-all">{c.site}</a>
                  ) : (
                    <span className="text-gray-500">Não informado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default CompConferencia;
