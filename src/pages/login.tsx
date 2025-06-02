import type React from "react";
import ComponentLogin from "../components/Login/compLogin";
import ComponentMenuLogin from "../components/Login/compMenuLogin";

const Login: React.FC = () => {
  return (
    <>
      <ComponentMenuLogin pageName="Página de Login" />
      <ComponentLogin />
    </>

  );
}

export default Login;


