import Logo from "../../assets/logo.png"; // Ajuste o caminho conforme necessário

const ComponentLogo = () => {
  return (
    <div className="flex items-center justify-center h-16 ">
      <img
        src={Logo}
        alt="Logo"
        className="w-40 mr-2"
      />
    </div>
  );
}
export default ComponentLogo;