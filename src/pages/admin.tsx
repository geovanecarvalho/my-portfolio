import type React from "react";
import ComponentMenuAdmin from "../components/Admin/compMenuAdmin";
import AdminJumbotron from "../components/Admin/compJumbotron";


const Admin: React.FC = () => {
  return (
    <>
      <ComponentMenuAdmin/>,
      <AdminJumbotron userName="Geovane Carvalho"/>
    </>
  );
}

export default Admin;
