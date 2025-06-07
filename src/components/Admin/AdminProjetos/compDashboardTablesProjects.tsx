import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebase";

export interface ProjectRow {
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

interface DashboardTablesProjectsProps {
  projects: ProjectRow[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectRow[]>>;
}

const DashboardTablesProjects: React.FC<DashboardTablesProjectsProps> = ({ projects, setProjects }) => {
  // Função para excluir projeto
  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Deseja realmente excluir este projeto?')) {
      await deleteDoc(doc(db, "projetos", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-900">Projetos Cadastrados</h3>
      </div>
      <div className="w-full overflow-x-auto md:overflow-x-visible">
        <table className="min-w-full bg-white rounded shadow text-sm md:text-base block md:table overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal">
          <thead>
            <tr className="hidden md:table-row">
              <th className="px-2 py-2 border-b">Imagem</th>
              <th className="px-2 py-2 border-b">Nome</th>
              <th className="px-2 py-2 border-b">Descrição</th>
              <th className="px-2 py-2 border-b">Tecnologias</th>
              <th className="px-2 py-2 border-b">Status</th>
              <th className="px-2 py-2 border-b">Destaque</th>
              <th className="px-2 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-4 text-gray-400">Nenhum projeto cadastrado</td></tr>
            ) : (
              projects.map((p) => (
                <tr key={p.id} className="flex flex-col md:table-row w-full md:w-auto border-b md:border-0">
                  <td className="px-2 py-2 border-b flex md:table-cell w-full md:w-auto items-center justify-between md:justify-start">
                    {p.imagemCapa ? <img src={p.imagemCapa} alt={p.nome} className="w-16 h-16 object-cover rounded" /> : "-"}
                  </td>
                  <td className="px-2 py-2 border-b">{p.nome}</td>
                  <td className="px-2 py-2 border-b">
                    {p.descricao.length > 40
                      ? p.descricao.slice(0, 40) + '...'
                      : p.descricao}
                  </td>
                  <td className="px-2 py-2 border-b">{p.tecnologias?.join(", ")}</td>
                  <td className="px-2 py-2 border-b">{p.status}</td>
                  <td className="px-2 py-2 border-b text-center">{p.destaque ? "Sim" : "Não"}</td>
                  <td className="px-2 py-2 border-b">
                    <div className="flex flex-col gap-1 items-start">
                      <button
                        className="text-blue-700 hover:underline text-sm"
                        onClick={() => alert(`Detalhes do projeto: ${p.nome}`)}
                      >
                        Detalhes
                      </button>
                      <button
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => handleDeleteProject(p.id)}
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
  );
};

export default DashboardTablesProjects;
