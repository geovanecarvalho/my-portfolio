import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/icon.png";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ComponentLogin() {
  const navigate = useNavigate();
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log('user:', user, 'loading:', loading, 'auth.currentUser:', auth.currentUser);
    if (user && !loading) {
      // Se não tem hash, força reload para hash
      if (!window.location.hash) {
        window.location.assign(window.location.origin + '/#/admin');
        return;
      }
      // Fallback: recupera o hash salvo e redireciona
      const hash = localStorage.getItem('postLoginHash');
      if (hash) {
        window.location.hash = hash;
        localStorage.removeItem('postLoginHash');
      } else if (!window.location.hash.includes('/admin')) {
        window.location.hash = '/admin';
      } else {
        navigate('/admin');
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Para garantir: tenta obter resultado do redirect
    getRedirectResult(auth).then((result) => {
      console.log('getRedirectResult result:', result);
      if (result && result.user) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const loginWithGoogle = async () => {
    try {
      if (isMobile) {
        // Salva o hash atual para restaurar após o redirect
        localStorage.setItem('postLoginHash', '#/admin');
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

  const checkThirdPartyCookies = () => {
    // Testa se cookies de terceiros estão bloqueados
    try {
      document.cookie = "__test=1; SameSite=None; Secure";
      if (!document.cookie.includes("__test=1")) {
        alert("Seu navegador está bloqueando cookies de terceiros. O login Google pode não funcionar. Tente liberar cookies de terceiros nas configurações do navegador.");
      }
      // Limpa cookie de teste
      document.cookie = "__test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (e) {
      alert("Seu navegador está bloqueando cookies de terceiros. O login Google pode não funcionar. Tente liberar cookies de terceiros nas configurações do navegador.");
    }
  };

  useEffect(() => {
    if (isMobile) checkThirdPartyCookies();
  }, [isMobile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white">
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-white/30 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <img src={Logo} alt="Logo" className="w-20 mx-auto mb-6" />
        <p className="text-white text-opacity-90 mb-6">
          Faça login com sua conta Google para continuar
        </p>
        {isMobile && (
          <div className="bg-yellow-200 text-yellow-900 rounded p-2 mb-4 text-sm font-semibold">
            Para fazer login com Google no celular, é necessário permitir cookies de terceiros no navegador.<br />
            Se estiver no modo anônimo ou com cookies bloqueados, o login não funcionará.<br />
            Tente liberar cookies de terceiros nas configurações do navegador ou use outro navegador.
          </div>
        )}
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
