import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

interface PerfilData {
  id: string;
  perfil: {
    foto: string;
    nomeCompleto: string;
    bio: string;
    softSkills: string;
    ativo: boolean;
  };
  contatos: {
    email: string;
    telefone: string;
  };
  endereco: {
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  redes_sociais: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
    telegram: string;
    whatsapp: string;
  };
  formacao: {
    curso: string;
    instituicao: string;
    anoConclusao: string;
    nivel: string;
  };
}

const CompPerfil: React.FC = () => {
  const [perfis, setPerfis] = useState<PerfilData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "perfil")).then((snapshot) => {
      const rows: PerfilData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          perfil: data.perfil || {},
          contatos: data.contatos || {},
          endereco: data.endereco || {},
          redes_sociais: data.redes_sociais || {},
          formacao: data.formacao || {},
        });
      });
      setPerfis(rows);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center text-blue-900 py-8">Carregando perfis...</div>;
  // Mostrar apenas perfis ativos
  const perfisAtivos = perfis.filter((p) => p.perfil.ativo);
  if (perfisAtivos.length === 0) return <div className="text-center text-gray-500 py-8">Nenhum perfil ativo encontrado.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid gap-8">
      {perfisAtivos.map((p, idx) => (
        <div
          key={p.id}
          className={
            `bg-gradient-to-r from-blue-400 via-blue-400 to-blue rounded-2xl shadow-xl border-2 border-blue-500 hover:shadow-2xl transition overflow-hidden flex flex-col items-center md:items-stretch animate-slide-card` +
            (idx > 0 ? ' mt-2' : '')
          }
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          {/* Card agrupando foto e nome */}
          <div className="w-full flex flex-col items-center bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 rounded-2xl shadow border border-blue-200 p-6 mb-4 animate-slide-down"
            style={{ margin: 20 }}
          >
            <div className="flex flex-col items-center w-full">
              {p.perfil.foto && (
                <div className="flex justify-center w-full mb-4">
                  <img
                    src={p.perfil.foto}
                    alt={p.perfil.nomeCompleto}
                    className="rounded-full object-cover border-4 border-blue-300 shadow transition-transform duration-700 ease-out hover:scale-105"
                    style={{
                      width: '6rem', // base: 96px
                      height: '6rem',
                      maxWidth: '100%',
                    }}
                    sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                    srcSet={
                      p.perfil.foto + ' 96w,' +
                      p.perfil.foto + ' 128w,' +
                      p.perfil.foto + ' 160w'
                    }
                  />
                </div>
              )}
              <div className="w-full flex justify-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-0 text-center tracking-tight transition-all duration-700 ease-out hover:text-blue-600 hover:scale-105">
                  {p.perfil.nomeCompleto}
                </h2>
              </div>
            </div>
          </div>
          {/* Dados agrupados */}
          <div className="flex-1 flex flex-col md:flex-row md:flex-wrap gap-4 w-full p-4">
            {/* Bio - ocupa toda a linha */}
            <div className="w-full bg-white/70 rounded-xl shadow border border-blue-200 p-4 mb-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><span>📝</span>Bio</h3>
              </div>
              <p className="text-gray-700 mb-2 whitespace-pre-line">{p.perfil.bio}</p>
            </div>
            {/* Soft Skills - ocupa toda a linha */}
            <div className="w-full bg-white/70 rounded-xl shadow border border-blue-200 p-4 mb-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h4 className="font-semibold text-blue-700 flex items-center gap-2 text-base"><span>💡</span>Soft Skills</h4>
              </div>
              <p className="text-gray-700">{p.perfil.softSkills}</p>
            </div>
            {/* Contatos */}
            <div className="flex-1 min-w-[260px] bg-white/70 rounded-xl shadow border border-blue-200 p-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><span>📞</span>Contatos</h3>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li><b>Email:</b> <a href={`mailto:${p.contatos.email}`} className="underline text-blue-700">{p.contatos.email}</a></li>
                <li><b>Telefone:</b> <a href={`tel:${p.contatos.telefone}`} className="underline text-blue-700">{p.contatos.telefone}</a></li>
              </ul>
            </div>
            {/* Endereço */}
            <div className="flex-1 min-w-[260px] bg-white/70 rounded-xl shadow border border-blue-200 p-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><span>🏠</span>Endereço</h3>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li><b>Bairro:</b> {p.endereco.bairro}</li>
                <li><b>Cidade:</b> {p.endereco.cidade}</li>
                <li><b>Estado:</b> {p.endereco.estado}</li>
                <li><b>CEP:</b> {p.endereco.cep}</li>
              </ul>
            </div>
            {/* Redes Sociais */}
            <div className="flex-1 min-w-[260px] bg-white/70 rounded-xl shadow border border-blue-200 p-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><span>🌐</span>Redes Sociais</h3>
              </div>
              <ul className="flex flex-wrap gap-3 text-blue-800">
                {p.redes_sociais.linkedin && <li><a href={p.redes_sociais.linkedin} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">in</a></li>}
                {p.redes_sociais.github && <li><a href={p.redes_sociais.github} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">GitHub</a></li>}
                {p.redes_sociais.instagram && <li><a href={p.redes_sociais.instagram} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">Instagram</a></li>}
                {p.redes_sociais.facebook && <li><a href={p.redes_sociais.facebook} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">Facebook</a></li>}
                {p.redes_sociais.telegram && <li><a href={p.redes_sociais.telegram} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">Telegram</a></li>}
                {p.redes_sociais.whatsapp && <li><a href={p.redes_sociais.whatsapp} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">WhatsApp</a></li>}
              </ul>
            </div>
            {/* Formação */}
            <div className="flex-1 min-w-[260px] bg-white/70 rounded-xl shadow border border-blue-200 p-4">
              <div className="border-b border-blue-200 mb-2 pb-1">
                <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-lg"><span>🎓</span>Formação</h3>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li><b>Curso:</b> {p.formacao.curso}</li>
                <li><b>Instituição:</b> {p.formacao.instituicao}</li>
                <li><b>Ano de Conclusão:</b> {p.formacao.anoConclusao}</li>
                <li><b>Nível:</b> {p.formacao.nivel}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompPerfil;

/* Tailwind custom animations (add to your global CSS if not present):
@layer utilities {
  .animate-slide-down {
    animation: slideDown 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .animate-slide-up {
    animation: slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .animate-slide-card {
    animation: slideCard 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideDown {
    0% { opacity: 0; transform: translateY(-40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideCard {
    0% { opacity: 0; transform: translateY(60px) scale(0.98); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
}
*/
