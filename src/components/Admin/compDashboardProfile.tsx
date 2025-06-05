import React from "react";

interface DashboardProfileProps {
  onProfileClick: () => void;
  onConferenciaClick: () => void;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({ onProfileClick, onConferenciaClick }) => (
  <aside className="w-64 min-h-full bg-gradient-to-b from-blue-900 via-blue-700 to-blue-200 bg-opacity-80 p-6 flex flex-col gap-4 shadow-lg">
    <h2 className="text-lg font-bold text-white mb-4">Dashboard</h2>
    <button
      onClick={onProfileClick}
      className="text-left px-4 py-2 rounded-md font-semibold bg-blue-200 text-blue-900 hover:bg-blue-300 transition"
    >
      Cadastrar Profile
    </button>
    <button
      onClick={onConferenciaClick}
      className="text-left px-4 py-2 rounded-md font-semibold bg-green-200 text-green-900 hover:bg-green-300 transition"
    >
      Cadastrar Conferência
    </button>
  </aside>
);

export default DashboardProfile;
