import {Routes, Route} from 'react-router-dom';
import Home from './pages/home.tsx';
import Admin from './pages/admin.tsx';
import Login from './pages/login.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Adicione outras rotas aqui */}
      <Route path="/" element={<Home  />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/admin" element={<Admin  />} />
    </Routes>
  );
}
export default App;
