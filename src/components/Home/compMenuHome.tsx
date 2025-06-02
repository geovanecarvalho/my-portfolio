import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icon.png";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

interface Props {
  pageName: string;
}

const ComponentMenuHome = ({ pageName }: Props) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detecta autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false); // fecha o menu após logout
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `transition hover:text-blue-200 ${
      isActive(path) ? "text-orange-400 font-bold underline" : "text-white"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo e nome */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <img src={Logo} alt="Logo" className="w-10" />
          <span>{pageName}</span>
        </div>

        {/* Botão Hamburguer (mobile) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Menu Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 absolute md:static top-16 right-4 bg-blue-800 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow-md md:shadow-none z-50`}
        >
          {isLoggedIn ? (
            <>
              <Link to="/admin" className={linkClasses("/admin")}>
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="
                  px-4 py-2 rounded-md 
                  bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 
                  text-white font-bold 
                  shadow-lg 
                  hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 
                  transition duration-300
                "
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="
                px-4 py-2 rounded-md 
                bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 
                text-white font-bold 
                shadow-lg 
                hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 
                transition duration-300
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ComponentMenuHome;
