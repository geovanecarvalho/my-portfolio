import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/icon.png"; // sua logo
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

export default function ComponentLogin() {
  const navigate = useNavigate();

  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  useEffect(() => {
    // Após redirecionamento, verifica se o usuário está logado
    getRedirectResult(auth).then((result) => {
      if (result && result.user) {
        navigate("/admin");
      } else if (auth.currentUser) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const loginWithGoogle = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        await signInWithPopup(auth, provider);
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer login: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white">
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-white/30 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4">Login</h1>

        {/* Logo abaixo do título */}
        <img
          src={Logo}
          alt="Logo"
          className="w-20 mx-auto mb-6"
        />

        <p className="text-white text-opacity-90 mb-6">
          Faça login com sua conta Google para continuar
        </p>

        <button
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow-md hover:shadow-lg transition duration-300"
        >
          <FcGoogle className="text-2xl" />
          <span>Entrar com Google</span>
        </button>
      </div>
    </div>
  );
}
