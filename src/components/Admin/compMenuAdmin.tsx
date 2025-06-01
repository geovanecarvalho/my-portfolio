import type React from "react";
import Logo from "../../assets/icon.png"; // Importando o logo

const ComponentMenuAdmin: React.FC = () =>{
    return (
        <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center text-white text-xl font-bold space-x-2">
                    <img src={Logo} alt="Logo" className="w-10" />
                    <span>Página Administrativa</span>
                </div>
                <div className="space-x-6 hidden md:flex items-center">
                    <a href="#profile" className="text-white hover:text-blue-200 transition">Profile</a>
                    <a href="#projetos" className="text-white hover:text-blue-200 transition">Projetos</a>
                    <button
  className="
    px-4 py-2 rounded-md 
    bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 
    text-white font-bold 
    shadow-lg 
    hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 
    transition
    duration-300
  "
>
  logout
</button>
                </div>
            </div>
        </nav>

    );
}
export default ComponentMenuAdmin;