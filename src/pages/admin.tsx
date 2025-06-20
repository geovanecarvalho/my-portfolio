import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import ComponentMenuAdmin from "../components/Admin/compMenuAdmin";
import AdminJumbotron from "../components/Admin/compJumbotron";
import CompGrafico from "../components/Admin/compGrafico";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== "geovanehacker.io@gmail.com") {
        navigate("/"); // Redireciona para home se não for você
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center py-10 text-white">
        Verificando acesso...
      </div>
    );
  }

  return (
    <>
      <ComponentMenuAdmin pageName="Página de Administração" />
      <AdminJumbotron userName="Geovane Carvalho" />
      <CompGrafico />
    </>
  );
};

export default Admin;