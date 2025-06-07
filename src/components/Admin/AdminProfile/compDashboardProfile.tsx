import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebase';

interface DashboardProfileProps {
  onProfileClick: () => void;
  onConferenciaClick: () => void;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({ onProfileClick, onConferenciaClick }) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  // Estado: aberto só no desktop, fechado por padrão no mobile
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const setByScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Só altera open se mudou o modo
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

  // Corrige: ao fechar modal, não fecha o dashboard no desktop
  const handleClick = (fn: () => void) => {
    fn();
    if (isMobile) setOpen(false);
  };

  // Novo: Minimizar e maximizar dashboard no mobile
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <aside className={`bg-gradient-to-b from-blue-900 via-blue-700 to-blue-200 bg-opacity-80 flex flex-col gap-4 shadow-lg md:min-h-screen transition-all duration-300
      ${open ? 'p-6 w-full md:w-64' : 'p-2 w-16'}
      ${open ? 'block' : 'block'}
    `}>
      {/* Botão de abrir/fechar menu no mobile e desktop */}
      <button
        className={`mb-2 bg-blue-900 text-white rounded-full p-2 shadow-lg focus:outline-none self-start transition-transform duration-300 ${open ? '' : 'rotate-180'}`}
        onClick={handleToggle}
        aria-label={open ? 'Minimizar dashboard' : 'Expandir dashboard'}
      >
        {open ? (
          // Ícone de minimizar (seta para a esquerda)
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        ) : (
          // Ícone de maximizar (seta para a direita)
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        )}
      </button>
      {/* Usuário logado no topo do dashboard */}
      {open && user && (
        <div className="flex items-center gap-3 mb-4">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName || 'Usuário'} className="w-10 h-10 rounded-full border-2 border-white shadow" />
          )}
          <span className="text-white font-semibold truncate max-w-[120px]">{user.displayName || user.email}</span>
        </div>
      )}
      {/* Sidebar responsiva */}
      {open && (
        <div className="relative">
          <button
            onClick={() => handleClick(onProfileClick)}
            className="text-left px-4 py-2 rounded-md font-semibold bg-blue-200 text-blue-900 hover:bg-blue-300 transition mb-2 w-full"
          >
            Cadastrar Novo Usuário
          </button>
          <button
            onClick={() => handleClick(onConferenciaClick)}
            className="text-left px-4 py-2 rounded-md font-semibold bg-green-200 text-green-900 hover:bg-green-300 transition w-full"
          >
            Cadastrar Nova Conferência
          </button>
        </div>
      )}
    </aside>
  );
};

export default DashboardProfile;
