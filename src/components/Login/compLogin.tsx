import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

export default function ComponentLogin() {
  const navigate = useNavigate();
  
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      // Redireciona para a home ou admin após login
      navigate("/admin");
    } catch (error) {
        error instanceof Error &&
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Página de Login</h1>
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Entrar com Google
      </button>
    </div>
  );
}