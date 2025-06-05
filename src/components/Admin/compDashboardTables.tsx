import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

interface ProfileRow {
  id: string;
  nomeCompleto: string;
  ativo: boolean;
}

interface ConferenciaRow {
  id: string;
  nome: string;
  local: string;
}

const DashboardTables: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [conferencias, setConferencias] = useState<ConferenciaRow[]>([]);

  useEffect(() => {
    // Buscar perfis
    getDocs(collection(db, "perfil")).then((snapshot) => {
      const rows: ProfileRow[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nomeCompleto: data.perfil?.nomeCompleto || "",
          ativo: !!data.perfil?.ativo,
        });
      });
      setProfiles(rows);
    });
    // Buscar conferências
    getDocs(collection(db, "conferencias")).then((snapshot) => {
      const rows: ConferenciaRow[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nome: data.nome || "",
          local: data.local || "",
        });
      });
      setConferencias(rows);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-2 text-blue-900">Perfis Cadastrados</h3>
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">Ativo</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length === 0 ? (
              <tr><td colSpan={2} className="text-center py-4 text-gray-400">Nenhum perfil cadastrado</td></tr>
            ) : (
              profiles.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-2 border-b">{p.nomeCompleto}</td>
                  <td className="px-4 py-2 border-b">{p.ativo ? "Sim" : "Não"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-green-900">Conferências Cadastradas</h3>
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">Local</th>
            </tr>
          </thead>
          <tbody>
            {conferencias.length === 0 ? (
              <tr><td colSpan={2} className="text-center py-4 text-gray-400">Nenhuma conferência cadastrada</td></tr>
            ) : (
              conferencias.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-2 border-b">{c.nome}</td>
                  <td className="px-4 py-2 border-b">{c.local}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTables;
