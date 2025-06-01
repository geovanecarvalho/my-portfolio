import type React from "react";
import ComponentMenuAdmin from "../components/Admin/compMenuAdmin";
import AdminJumbotron from "../components/Admin/compJumbotron";

const Admin: React.FC = () => {
  return (
    <>
      <ComponentMenuAdmin pageName= "Página de Administração" />,
      <AdminJumbotron userName="Geovane Carvalho"/>,
    
    </>
  );
}

export default Admin;
