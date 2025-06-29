import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../services/firebase';
import SobreProjetosCard from "./SobreProjetosCard";
import { collection, onSnapshot } from "firebase/firestore";

interface ProjetoData {
  id: string;
  nome: string;
  destaque: boolean;
  likes?: number;
  tecnologias: string[];
  categoria: string;
}

interface DashboardProjectsProps {
  onProjectClick: () => void;
}

const DashboardProjects: React.FC<DashboardProjectsProps> = ({ onProjectClick }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isMobile, setIsMobile] = useState(false);
  const [projetos, setProjetos] = useState<ProjetoData[]>([]);

  // Atualiza tamanho da sidebar conforme tamanho da tela
  useEffect(() => {
    const setByScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen((prevOpen) => {
        if (mobile && prevOpen) return false;
        if (!mobile && !prevOpen) return true;
        return prevOpen;
      });
    };

    setByScreen();
    window.addEventListener('resize', setByScreen);
    return () => window.removeEventListener('resize', setByScreen);
  }, []);

  // Carrega os projetos em tempo real com onSnapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projetos"), (snapshot) => {
      const dados: ProjetoData[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ProjetoData[];

      setProjetos(dados);
    });

    return () => unsubscribe(); // Limpar o listener
  }, []);

  const handleClick = () => {
    onProjectClick();
    if (isMobile) setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prev) => {
      const novoValor = !prev;

      // ⏱️ Ao abrir, dispara um resize para forçar renderização dos gráficos
      if (novoValor) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 300); // deve ser igual ou maior que a duração da transição
      }

      return novoValor;
    });
  };

  return (
    <aside
      className={`
        fixed top-24 mt-3.5 left-0 z-[9999]
        transition-all duration-300
        bg-gradient-to-b from-blue-900 via-blue-700 to-blue-900 bg-opacity-90
        shadow-lg
        ${open ? 'w-80 p-4 overflow-y-auto h-[calc(100vh-5rem)]' : 'w-16 p-2 h-[calc(100vh-5rem)]'}
      `}
    >
      {/* Botão de abrir/fechar */}
      <button
        className={`mb-2 bg-blue-900 text-white rounded-full p-2 shadow-lg focus:outline-none self-start transition-transform duration-300 ${open ? '' : 'rotate-180'}`}
        onClick={handleToggle}
        aria-label={open ? 'Minimizar dashboard' : 'Expandir dashboard'}
      >
        {open ? (
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        ) : (
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        )}
      </button>

      {/* Usuário */}
      {open && user && (
        <div className="flex items-center gap-3 mb-4">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName || 'Usuário'}
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
          )}
          <span className="text-white font-semibold truncate max-w-[120px]">
            {user.displayName || user.email}
          </span>
        </div>
      )}

      {/* Card de SobreProjetos */}
            {open && (
        <div className="mt-2">
        <SobreProjetosCard key={`dashboard-card-${open}`} projetos={projetos} />

        </div>
        )}


    </aside>
  );
};

export default DashboardProjects;
