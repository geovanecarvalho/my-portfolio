import React, { useState } from 'react';
import ComponentMenuAdmin from '../components/Admin/compMenuAdmin';
import FormProfile from '../components/Admin/compFormProfile';
import FormConferencia from '../components/Admin/compFormConferencia';
import Modal from '../components/Admin/compModal';
import DashboardProfile from '../components/Admin/compDashboardProfile';
import DashboardTables from '../components/Admin/compDashboardTables';

const Profile: React.FC = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isConferenciaModalOpen, setIsConferenciaModalOpen] = useState(false);
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
                <DashboardTables />
            </main>
        </div>
        
        <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Cadastro de Profile">
            <FormProfile />
        </Modal>
        <Modal isOpen={isConferenciaModalOpen} onClose={() => setIsConferenciaModalOpen(false)} title="Cadastro de Conferência">
            <FormConferencia />
        </Modal>
    </>
    );
}

export default Profile;