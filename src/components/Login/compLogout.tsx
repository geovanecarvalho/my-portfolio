import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

export default function ButtonLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer logout: " + error.message);
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
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
      Logout
    </button>
  );
}
