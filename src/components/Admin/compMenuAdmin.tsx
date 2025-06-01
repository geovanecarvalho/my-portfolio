import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icon.png";

interface Props {
    pageName: string;
}

const ComponentMenuAdmin = ({ pageName }: Props) => {
    const location = useLocation();

    // Verifica se o path atual corresponde ao link
    const isActive = (path: string) => location.pathname === path;

    // Retorna a classe condicional com base na rota ativa
    const linkClasses = (path: string) =>
        `transition hover:text-blue-200 ${
            isActive(path) ? "text-orange-400 font-bold underline" : "text-white"
        }`;

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center text-white text-xl font-bold space-x-2">
                    <img src={Logo} alt="Logo" className="w-10" />
                    <span>{pageName}</span>
                </div>
                <div className="space-x-6 hidden md:flex items-center">
                    <Link to="/admin" className={linkClasses("/admin")}>
                        Admin
                    </Link>
                    <Link to="/admin/profile" className={linkClasses("/admin/profile")}>
                        Profile
                    </Link>
                    <Link to="/admin/projects" className={linkClasses("/admin/projects")}>
                        Projetos
                    </Link>
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
};

export default ComponentMenuAdmin;
