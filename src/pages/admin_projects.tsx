import React, { useState, useEffect } from "react";
import ComponentMenuAdmin from "../components/Admin/compMenuAdmin";
import FormProjects from "../components/Admin/AdminProjetos/compFormProjects";
import ModalProjects from "../components/Admin/AdminProjetos/compModalProjects";
import DashboardProjects from "../components/Admin/AdminProjetos/compDashboardProjects";
import DashboardTablesProjects from "../components/Admin/AdminProjetos/compDashboardTablesProjects";
import type { ProjectRow } from "../components/Admin/AdminProjetos/compDashboardTablesProjects";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const Projects: React.FC = () => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [projects, setProjects] = useState<ProjectRow[]>([]);

    // Função para buscar projetos
    const fetchProjects = async () => {
        const snapshot = await getDocs(collection(db, "projetos"));
        const rows: ProjectRow[] = [];
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
        setProjects(rows);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <>
            <ComponentMenuAdmin pageName="Cadastro de Projetos" />
            <div className="min-h-screen bg-gray-100 flex">
                {/* Dashboard lateral */}
                <DashboardProjects onProjectClick={() => setIsProjectModalOpen(true)} />
                {/* Conteúdo principal */}
                <main className="flex-1 p-8">
                    <DashboardTablesProjects 
                        projects={projects} 
                        setProjects={setProjects}
                        onProjectClick={() => setIsProjectModalOpen(true)}
                    />
                </main>
            </div>
            <ModalProjects isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Cadastro de Projeto">
                <FormProjects onSuccess={() => { setIsProjectModalOpen(false); fetchProjects(); }} />
            </ModalProjects>
        </>
    );
}

export default Projects;