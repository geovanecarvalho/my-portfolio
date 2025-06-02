import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/icon.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

interface Props {
  pageName: string;
}

const ComponentMenuHome = ({ pageName }: Props) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `transition hover:text-blue-200 ${
      isActive(path) ? "text-orange-400 font-bold underline" : "text-white"
    }`;

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white p-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center text-white text-xl font-bold space-x-2">
          <img src={Logo} alt="Logo" className="w-10" />
          <span>{pageName}</span>
        </div>

        <div className="space-x-4 hidden md:flex items-center">
          {!loading && user ? (
            <>
              <Link
                to="/admin"
                className="
                  px-4 py-2 rounded-md 
                  bg-gradient-to-r from-green-600 via-green-500 to-green-400 
                  text-white font-bold 
                  shadow-lg 
                  hover:from-green-300 hover:via-green-400 hover:to-green-500 
                  transition
                  duration-300
                "
              >
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
                  transition
                  duration-300
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
                transition
                duration-300
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
