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

  // Para links de navegação SPA
  const isActive = (path: string) => location.pathname === path;
  const linkClasses = (path: string) =>
    `transition cursor-pointer px-2 py-1 rounded 
     hover:text-blue-200 hover:drop-shadow-[0_0_8px_#38bdf8] 
     ${
       isActive(path)
         ? "text-orange-400 font-bold underline"
         : "text-white"
     }`;

  // Para links âncora (scroll suave)
  const anchorClasses = (hash: string) =>
    `transition cursor-pointer px-2 py-1 rounded 
     hover:text-blue-200 hover:drop-shadow-[0_0_8px_#38bdf8] 
     ${
       window.location.hash === hash
         ? "text-orange-400 font-bold underline"
         : "text-white"
     }`;

  // Scroll suave para âncoras sem recarregar a página
const scrollToSection = (id: string) => {
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    const yOffset = -130; // Deslocar 20px acima da posição da seção
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setIsMenuOpen(false);
  }
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900 border-mb-2 border-blue-200/60 px-4 py-3 shadow-lg hover:shadow-blue-500/40 transition-shadow duration-30">
      <div className="flex justify-between items-center w-full px-4 py-3">
        {/* Logo e nome */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <img src={Logo} alt="Logo" className="w-10" />
          <span className="text-gray-300">{pageName}</span>
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
          {/* Links âncora para as seções */}
          <span onClick={() => scrollToSection("sobre")} className={anchorClasses("#sobre")}>
            Sobre mim
          </span>
          <span className="mx-2 text-blue-200/40">|</span>
          <span onClick={() => scrollToSection("conferencia")} className={anchorClasses("#conferencia")}>
            Conferências & Comunidades
          </span>
          <span className="mx-2 text-blue-200/40">|</span>
          <span onClick={() => scrollToSection("projetos")} className={anchorClasses("#projetos")}>
            Projetos
          </span>
          <span className="mx-2 text-blue-200/40">|</span>
          {/* Links de login/admin/logout */}
          {isLoggedIn ? (
            <>
              <Link to="/admin" className={linkClasses("/admin")}>
                Admin
              </Link>
              <span className="mx-2 text-blue-200/40">|</span>
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