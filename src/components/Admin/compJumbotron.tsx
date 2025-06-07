import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';

const AdminJumbotron = () => {
  const [user] = useAuthState(auth);
  if (!user) return null;
  return (
    <div className="bg-gradient-to-r m-10 from-blue-900 via-blue-700 to-blue-600 text-white p-8 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center gap-6">
      {user.photoURL && (
        <img src={user.photoURL} alt={user.displayName || 'Usuário'} className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0" />
      )}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bem-vindo, {user.displayName || user.email}!
        </h1>
        <p className="text-lg md:text-xl text-blue-100">
          Esta é a área administrativa do sistema. Aproveite suas ferramentas!
        </p>
      </div>
    </div>
  )
}

export default AdminJumbotron