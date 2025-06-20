import { signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Logo from "../../assets/icon.png";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const EMAIL_AUTORIZADO = "geovanehacker.io@gmail.com";

function ModalAcessoNegado({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xs w-full text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Acesso Negado</h2>
        <p className="text-gray-700 mb-4">Apenas o proprietário pode acessar esta área.</p>
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default function ComponentLogin() {
  const navigate = useNavigate();
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const [user, loading] = useAuthState(auth);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      if (user.email !== EMAIL_AUTORIZADO) {
        auth.signOut();
        setModalAberto(true);
        return;
      }
      if (!window.location.hash) {
        window.location.assign(window.location.origin + '/#/admin');
        return;
      }
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
    getRedirectResult(auth).then((result) => {
      if (result && result.user) {
        if (result.user.email !== EMAIL_AUTORIZADO) {
          auth.signOut();
          setModalAberto(true);
          return;
        }
        navigate("/admin");
      }
    });
  }, [navigate]);

  const loginWithGoogle = async () => {
    try {
      if (isMobile) {
        localStorage.setItem('postLoginHash', '#/admin');
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        if (result.user.email !== EMAIL_AUTORIZADO) {
          await auth.signOut();
          setModalAberto(true);
          return;
        }
        navigate("/admin");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer login: " + error.message);
      }
    }
  };

  const checkThirdPartyCookies = () => {
    try {
      document.cookie = "__test=1; SameSite=None; Secure";
      if (!document.cookie.includes("__test=1")) {
        alert("Seu navegador está bloqueando cookies de terceiros. O login Google pode não funcionar. Tente liberar cookies de terceiros nas configurações do navegador.");
      }
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
      <ModalAcessoNegado open={modalAberto} onClose={() => setModalAberto(false)} />
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