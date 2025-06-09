import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";

interface ProfileRow {
  id: string;
  nomeCompleto: string;
  foto: string;
  email: string;
  telefone: string;
  ativo: boolean;
}

interface ConferenciaRow {
  id: string;
  nome: string;
  local: string;
  imagem: string;
  site: string;
}

const DashboardTables: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [conferencias, setConferencias] = useState<ConferenciaRow[]>([]);

  // Função para buscar conferências
  const fetchConferencias = async () => {
    const snapshot = await getDocs(collection(db, "conferencias"));
    const rows: ConferenciaRow[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      rows.push({
        id: doc.id,
        nome: data.nome || "",
        local: data.local || "",
        imagem: data.imagem || "",
        site: data.site || ""
      });
    });
    setConferencias(rows);
  };

  useEffect(() => {
    // Buscar perfis
    getDocs(collection(db, "perfil")).then((snapshot) => {
      const rows: ProfileRow[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          nomeCompleto: data.perfil?.nomeCompleto || "",
          foto: data.perfil?.foto || "",
          email: data.contatos?.email || "",
          telefone: data.contatos?.telefone || "",
          ativo: !!data.perfil?.ativo
        });
      });
      setProfiles(rows);
    });
    fetchConferencias();
  }, []);

  // Função para excluir conferência
  const handleDeleteConferencia = async (id: string) => {
    if (confirm('Deseja realmente excluir esta conferência?')) {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(db, "conferencias", id));
      fetchConferencias();
    }
  };

  // Função para ativar apenas um perfil
  const handleSetActiveProfile = async (id: string) => {
    // Desativa todos e ativa apenas o selecionado
    const { doc, updateDoc, getDocs, collection } = await import('firebase/firestore');
    const snapshot = await getDocs(collection(db, "perfil"));
    const batchUpdates: Promise<void>[] = [];
    snapshot.forEach((d) => {
      const ativo = d.id === id;
      batchUpdates.push(updateDoc(doc(db, "perfil", d.id), { "perfil.ativo": ativo }));
    });
    await Promise.all(batchUpdates);
    setProfiles((prev) => prev.map((p) => ({ ...p, ativo: p.id === id })));
  };

  // Adicionar função para excluir perfil
  const handleDeleteProfile = async (id: string) => {
    if (confirm('Deseja realmente excluir este perfil?')) {
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(db, "perfil", id));
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-2 text-blue-900">Perfis Cadastrados</h3>
        <div className="w-full overflow-x-auto md:overflow-x-visible">
          <table className="min-w-full bg-white rounded shadow text-sm md:text-base block md:table overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
            <thead>
              <tr className="hidden md:table-row">
                <th className="px-2 py-2 border-b">Foto</th>
                <th className="px-2 py-2 border-b">Nome</th>
                <th className="px-2 py-2 border-b">E-mail</th>
                <th className="px-2 py-2 border-b">Telefone</th>
                <th className="px-2 py-2 border-b">Ativo</th>
                <th className="px-2 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {profiles.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4 text-gray-400">Nenhum perfil cadastrado</td></tr>
              ) : (
                profiles.map((p) => (
                  <tr key={p.id} className="flex flex-col md:table-row w-full md:w-auto border-b md:border-0">
                    <td className="px-2 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                      {p.foto ? <img src={p.foto} alt={p.nomeCompleto} className="w-10 h-10 object-cover rounded-full" /> : "-"}
                    </td>
                    <td className="px-2 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                      {p.nomeCompleto}
                    </td>
                    <td className="px-2 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                      {p.email}
                    </td>
                    <td className="px-2 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                      {p.telefone}
                    </td>
                    <td className="px-2 py-2 border-b text-center flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                      <input
                        type="radio"
                        name="perfil-ativo"
                        checked={p.ativo}
                        onChange={() => handleSetActiveProfile(p.id)}
                        className="accent-green-600 w-4 h-4 cursor-pointer"
                        title={p.ativo ? "Usuário ativo" : "Ativar este usuário"}
                      />
                    </td>
                    <td className="px-2 py-2 border-b">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          className="text-blue-700 hover:underline text-sm"
                          onClick={() => alert(`Detalhes do perfil: ${p.nomeCompleto}`)}
                        >
                          Detalhes
                        </button>
                        <button
                          className="text-red-600 hover:underline text-sm"
                          onClick={() => handleDeleteProfile(p.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-green-900">Conferências Cadastradas</h3>
        <div className="w-full overflow-x-auto md:overflow-x-visible">
          <table className="min-w-full bg-white rounded shadow text-sm md:text-base block md:table overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
            <thead>
              <tr className="hidden md:table-row">
                <th className="px-4 py-2 border-b">Foto</th>
                <th className="px-4 py-2 border-b">Nome Conferência</th>
                <th className="px-4 py-2 border-b">Local</th>
                <th className="px-4 py-2 border-b">Site</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {conferencias.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-gray-400">Nenhuma conferência cadastrada</td></tr>
              ) : (
                conferencias.map((c) => (
                  <tr key={c.id} className="flex flex-col md:table-row w-full md:w-auto border-b md:border-0">
                    <td className="px-4 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">{c.imagem ? <img src={c.imagem} alt={c.nome} className="w-16 h-16 object-cover rounded" /> : "-"}</td>
                    <td className="px-4 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">{c.nome}</td>
                    <td className="px-4 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">{c.local}</td>
                    <td className="px-4 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">{c.site ? <a href={c.site} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Site</a> : "-"}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          className="text-blue-700 hover:underline text-sm"
                          onClick={() => alert(`Detalhes da conferência: ${c.nome}`)}
                        >
                          Detalhes
                        </button>
                        <button
                          className="text-red-600 hover:underline text-sm"
                          onClick={() => handleDeleteConferencia(c.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTables;
