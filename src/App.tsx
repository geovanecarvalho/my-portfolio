import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.tsx';
import Admin from './pages/admin.tsx';
import Login from './pages/login.tsx';
import Profile from './pages/admin_profile.tsx';
import Projects from './pages/admin_projects.tsx';
import PrivateRoute from './components/privateRoutes.tsx';
import ProjectDetail from './pages/detail.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/login" element={<Login />} />
      {/* Rotas protegidas */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
