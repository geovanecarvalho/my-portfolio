import React, { useEffect, useState, Fragment } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Globe, MapPin, CalendarBlank } from "@phosphor-icons/react";

interface ConferenciaData {
  id: string;
  nome: string;
  local: string;
  imagem: string;
  site: string;
  descricao: string;
  data: string;
  fotos: string[];
}

const CompConferencia: React.FC = () => {
  const [conferencias, setConferencias] = useState<ConferenciaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [carrosselIndex, setCarrosselIndex] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    getDocs(collection(db, "conferencias")).then((snapshot) => {
      const rows: ConferenciaData[] = [];
      const indices: { [id: string]: number } = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nome: data.nome || "",
          local: data.local || "",
          imagem: data.imagem || "",
          site: data.site || "",
          descricao: data.descricao || "",
          data: data.data || "",
          fotos: Array.isArray(data.fotos) ? data.fotos : [],
        });
        indices[doc.id] = 0;
      });

      setConferencias(rows);
      setCarrosselIndex(indices);
      setLoading(false);
    });
  }, []);

  // Carrossel automático a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCarrosselIndex((prev) => {
        const updated = { ...prev };
        for (const id in updated) {
          const conferencia = conferencias.find((c) => c.id === id);
          const total = conferencia?.fotos?.length || 0;
          if (total > 1) {
            updated[id] = (updated[id] + 1) % total;
          }
        }
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [conferencias]);

  const nextImage = (id: string, total: number) => {
    setCarrosselIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % total,
    }));
  };

  const prevImage = (id: string, total: number) => {
    setCarrosselIndex((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + total) % total,
    }));
  };

  if (loading)
    return (
      <div className="text-center text-blue-900 py-4 animate-pulse">
        Carregando conferências...
      </div>
    );

  if (conferencias.length === 0)
    return (
      <div className="text-center text-gray-600 py-4">
        Nenhuma conferência encontrada.
      </div>
    );

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center max-w-7xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 rounded-3xl border-2 border-blue-300 shadow-[0_0_24px_4px_#38bdf8]">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-8 tracking-tight font-inter">
          <span role="img" aria-label="coração">❤️</span> Conferências e Comunidades que Participo
        </h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {conferencias.map((c) => (
            <div
              key={c.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border-2 border-white/30 p-6 flex flex-col items-center min-h-[400px]"
            >
              {c.imagem && (
                <div className="mb-3">
                  <img
                    src={c.imagem}
                    alt={c.nome}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow-lg"
                  />
                </div>
              )}

              <h5 className="text-lg font-bold text-white drop-shadow mb-2 text-center font-inter">
                {c.nome}
              </h5>
              
              {c.descricao && (
                <p className="text-sm text-blue-100 text-justify indent-5 mb-2">
                  {c.descricao}
                </p>
              )}

              {c.data && (
                <div className="w-full mb-2 text-sm flex justify-center gap-2">
                  <CalendarBlank size={20} color="#38bdf8" />
                  <span className="font-semibold text-blue-100">Data:</span>
                  <span className="text-blue-50">{new Date(c.data).toLocaleDateString("pt-BR")}</span>
                  
                </div>
              )}

              <div className="w-full mb-2 text-sm flex justify-center gap-2">
                <MapPin size={20} color="#38bdf8" weight="fill" />
                <span className="font-semibold text-blue-100">Local:</span>
                <span className="text-blue-50 text-justify">{c.local}</span>
              </div>

              <div className="w-full text-sm flex  justify-center gap-2 mb-2">
                <Globe size={20} color="#fbbf24" weight="fill" />
                <span className="font-semibold text-blue-100">Site:</span>
                {c.site ? (
                  <a
                    href={c.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-100 break-all hover:text-yellow-400 transition-colors"
                  >
                    {c.nome}
                  </a>
                ) : (
                  <span className="text-blue-200">Não informado</span>
                )}
              </div>

              {/* Carrossel de fotos */}
              {c.fotos.length > 0 && (
                <div className="w-full mt-4 relative">
                  <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <img
                      src={c.fotos[carrosselIndex[c.id] || 0]}
                      alt={`Foto da conferência ${c.nome}`}
                      className="object-cover w-full h-full border-2 border-blue-200 rounded-md"
                    />

                    {c.fotos.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(c.id, c.fotos.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-700/70 text-white p-2 rounded-full shadow hover:bg-blue-800 transition"
                        >
                          ◀️
                        </button>
                        <button
                          onClick={() => nextImage(c.id, c.fotos.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700/70 text-white p-2 rounded-full shadow hover:bg-blue-800 transition"
                        >
                          ▶️
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CompConferencia;
