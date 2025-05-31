import {Routes, Route} from 'react-router-dom';
import Home from './pages/home.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home  />} />
      {/* Adicione outras rotas aqui */}
    </Routes>
  );
}
export default App;
