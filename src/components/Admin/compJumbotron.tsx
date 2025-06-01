import React from 'react'

interface Props {
  userName: string
}

const AdminJumbotron = ({ userName }: Props) => {
  return (
    <div className="bg-gradient-to-r m-10 from-blue-900 via-blue-700 to-blue-600 text-white p-8 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Bem-vindo, {userName}!
      </h1>
      <p className="text-lg md:text-xl text-blue-100">
        Esta é a área administrativa do sistema. Aproveite suas ferramentas!
      </p>
      
    </div>
  )
}

export default AdminJumbotron