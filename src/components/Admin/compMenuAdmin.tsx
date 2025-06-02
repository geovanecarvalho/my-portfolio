import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icon.png";
import ButtonLogout from "./compLogout";

interface Props {
  pageName: string;
}

const ComponentMenuAdmin = ({ pageName }: Props) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `transition hover:text-blue-200 ${
      isActive(path) ? "text-orange-400 font-bold underline" : "text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4 relative">
      <div className="flex justify-between items-center w-full px-4 py-3">
        <div className="flex items-center text-white text-xl font-bold space-x-2">
          <img src={Logo} alt="Logo" className="w-10" />
          <span>{pageName}</span>
        </div>

        {/* Botão do menu hamburguer no mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu de links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 absolute md:static top-16 right-4 bg-blue-800 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-md md:shadow-none z-50`}
        >
          <Link to="/" className={`${linkClasses("/")} w-full text-center`}>
            Home
          </Link>
          <Link to="/admin" className={`${linkClasses("/admin")} w-full text-center`}>
            Admin
          </Link>
          <Link
            to="/admin/profile"
            className={`${linkClasses("/admin/profile")} w-full text-center`}
          >
            Profile
          </Link>
          <Link
            to="/admin/projects"
            className={`${linkClasses("/admin/projects")} w-full text-center`}
          >
            Projetos
          </Link>
          <div className="w-full">
            <ButtonLogout />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ComponentMenuAdmin;
