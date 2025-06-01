import {Routes, Route} from 'react-router-dom';
import Home from './pages/home.tsx';
import Admin from './pages/admin.tsx';
import Login from './pages/login.tsx';
import Profile from './pages/admin_profile.tsx';
import Projects from './pages/admin_projects.tsx';


const App: React.FC = () => {
  return (
    <Routes>
      {/* Adicione outras rotas aqui */}
      <Route path="/" element={<Home  />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/admin" element={<Admin  />} />
      <Route path="/admin/profile" element={<Profile  />} />
      <Route path="/admin/projects" element={<Projects  />} />
    </Routes>
  );
}
export default App;
