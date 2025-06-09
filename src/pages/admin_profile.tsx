import React, { useState, useEffect } from 'react';
import ComponentMenuAdmin from '../components/Admin/compMenuAdmin';
import FormProfile from '../components/Admin/AdminProfile/compFormProfile';
import FormConferencia from '../components/Admin/AdminProfile/compFormConferencia';
import Modal from '../components/Admin/AdminProfile/compModal';
import DashboardProfile from '../components/Admin/AdminProfile/compDashboardProfile';
import DashboardTables from '../components/Admin/AdminProfile/compDashboardTables';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

const Profile: React.FC = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isConferenciaModalOpen, setIsConferenciaModalOpen] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [conferencias, setConferencias] = useState([]);

    // Funções para buscar dados
    const fetchProfiles = async () => {
        const snapshot = await getDocs(collection(db, "perfil"));
        const rows = [];
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
    };
    const fetchConferencias = async () => {
        const snapshot = await getDocs(collection(db, "conferencias"));
        const rows = [];
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
        fetchProfiles();
        fetchConferencias();
    }, []);

    return (
    <>
        <ComponentMenuAdmin pageName="Cadastro de Profile" />
        <div className="min-h-screen bg-gray-100 flex">
            {/* Dashboard lateral */}
            <DashboardProfile
                onProfileClick={() => setIsProfileModalOpen(true)}
                onConferenciaClick={() => setIsConferenciaModalOpen(true)}
            />
            {/* Conteúdo principal */}
            <main className="flex-1 p-8">
                <DashboardTables 
                  profiles={profiles} 
                  setProfiles={setProfiles}
                  conferencias={conferencias}
                  setConferencias={setConferencias}
                />
            </main>
        </div>
        <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Cadastro de Profile">
            <FormProfile onSuccess={() => { setIsProfileModalOpen(false); fetchProfiles(); }} />
        </Modal>
        <Modal isOpen={isConferenciaModalOpen} onClose={() => setIsConferenciaModalOpen(false)} title="Cadastro de Conferência">
            <FormConferencia onSuccess={() => { setIsConferenciaModalOpen(false); fetchConferencias(); }} />
        </Modal>
    </>
    );
}

export default Profile;