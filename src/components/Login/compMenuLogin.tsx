import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icon.png";

interface Props {
    pageName: string;
}

const ComponentMenuLogin = ({ pageName }: Props) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fecha o menu sempre que a rota mudar
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4 shadow-md">
            <div className="flex justify-between items-center w-full px-4 py-3">
                {/* Logo e nome */}
                <div className="flex items-center space-x-2 text-xl font-bold">
                    <img src={Logo} alt="Logo" className="w-10" />
                    <span>{pageName}</span>
                </div>
                {/* Botão Hamburguer (mobile) */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Abrir menu"
                >
                    ☰
                </button>
                {/* Menu Links */}
                <div
                    className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 absolute md:static top-16 right-4 bg-blue-800 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-md md:shadow-none z-50`}
                >
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 text-white font-bold shadow-lg hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 transition duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default ComponentMenuLogin;
