import React, { useEffect, useState, Fragment } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
} from "lucide-react";
import {
  UserCircle,
  ChatsCircle,
  MapPin as PhosphorMapPin,
  GraduationCap as PhosphorGraduationCap,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  FacebookLogo,
  TelegramLogo,
  WhatsappLogo,
  Sparkle,
  NotePencil,
  Globe,
} from "@phosphor-icons/react";

interface PerfilData {
  id: string;
  perfil: {
    foto: string;
    nomeCompleto: string;
    bio: string;
    softSkills: string;
    ativo: boolean;
  };
  contatos: { email: string; telefone: string };
  endereco: { bairro: string; cidade: string; estado: string; cep: string };
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
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "perfil"));
      snap.forEach((doc) => {
        const data = doc.data();
        if (data.perfil?.ativo && !perfil) {
          setPerfil({
            id: doc.id,
            perfil: data.perfil || {},
            contatos: data.contatos || {},
            endereco: data.endereco || {},
            redes_sociais: data.redes_sociais || {},
            formacao: data.formacao || {},
          } as PerfilData);
        }
      });
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <div className="text-center text-blue-900 py-4 animate-pulse">
        Carregando perfil...
      </div>
    );
  if (!perfil)
    return (
      <div className="text-center text-gray-600 py-4">
        Nenhum perfil ativo encontrado.
      </div>
    );

  const { perfil: pf, contatos, endereco, formacao, redes_sociais } = perfil;
  const initials =
    pf.nomeCompleto
      ?.split(" ")
      .map((n) => n[0])
      .join("") ?? "";

  return (
    <Fragment>
      {/* COLUNA CENTRALIZADA – avatar + nome + softskills + blocos */}
      <div className="w-full flex flex-col items-center max-w-4xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 p-8 rounded-3xl shadow-2xl border-2 border-blue-400">
        {/* Foto / iniciais */}
        <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-white shadow-lg overflow-hidden mx-auto">
          {pf.foto ? (
            <img
              src={pf.foto}
              alt={pf.nomeCompleto}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white">
              {initials}
            </span>
          )}
        </div>
        {/* Nome centralizado */}
        <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg shadow-blue-1200 font-[\'InterVariable\'] tracking-tight">
          {pf.nomeCompleto}
        </h2>
        {/* BIO abaixo do nome */}
        {pf.bio && (
          <fieldset className="border-2 border-white rounded-xl px-4 py-3 bg-white/10 mt-4 w-full">
            <legend className="font-semibold text-white px-2 flex items-center gap-2">
              <NotePencil size={22} color="#fbbf24" weight="fill" /> Bio
            </legend>
            <p className="text-white whitespace-pre-line mt-2 text-justify" style={{ textIndent: '2em' }}>{pf.bio}</p>
          </fieldset>
        )}
        {/* Soft skills como badges */}
        {pf.softSkills && (
          <fieldset className="border-2 border-white rounded-xl px-3 py-2 mt-4 w-full bg-white/10 flex flex-col items-center">
            <legend className="font-semibold text-white px-2 flex items-center gap-2">
              <Sparkle size={22} color="#38bdf8" weight="fill" /> Soft Skills
            </legend>
            <div className="flex flex-wrap gap-2 justify-center mt-1 text-justify">
              {pf.softSkills.split(/[,;]+/).map((s) => (
                <span
                  key={s.trim()}
                  className="border border-white rounded-lg bg-white/20 text-white px-[10px] py-[5px] text-sm font-medium"
                  style={{ padding: '5px' }}
                >
                  {s.trim()}
                </span>
              ))}
            </div>
          </fieldset>
        )}
        {/* Blocos de dados abaixo da bio/softskills */}
        <div className="w-full flex flex-col gap-6 mt-4">
          {/* CONTATOS */}
          {(contatos.email || contatos.telefone) && (
            <fieldset className="border-2 border-white rounded-xl px-4 py-3 bg-white/10">
              <legend className="font-semibold text-white px-2 flex items-center gap-2">
                <ChatsCircle size={22} color="#34d399" weight="fill" /> Contatos
              </legend>
              <ul className="text-white space-y-1 text-sm mt-2">
                {contatos.email && (
                  <li className="flex items-center gap-1">
                    <Mail size={16} className="text-white" />
                    <a
                      href={`mailto:${contatos.email}`}
                      className="underline text-white hover:text-blue-200"
                    >
                      {contatos.email}
                    </a>
                  </li>
                )}
                {contatos.telefone && (
                  <li className="flex items-center gap-1">
                    <Phone size={16} className="text-white" />
                    <a
                      href={`tel:${contatos.telefone}`}
                      className="underline text-white hover:text-blue-200"
                    >
                      {contatos.telefone}
                    </a>
                  </li>
                )}
              </ul>
            </fieldset>
          )}
          {/* ENDEREÇO */}
          {(endereco.bairro || endereco.cidade || endereco.estado || endereco.cep) && (
            <fieldset className="border-2 border-white rounded-xl px-4 py-3 bg-white/10">
              <legend className="font-semibold text-white px-2 flex items-center gap-2">
                <PhosphorMapPin size={22} color="#f472b6" weight="fill" /> Endereço
              </legend>
              <div className="text-white text-sm mt-2 space-y-1">
                {endereco.bairro && (
                  <div><span className="font-bold">Bairro:</span> {endereco.bairro}</div>
                )}
                {endereco.cidade && (
                  <div><span className="font-bold">Cidade:</span> {endereco.cidade}</div>
                )}
                {endereco.estado && (
                  <div><span className="font-bold">Estado:</span> {endereco.estado}</div>
                )}
                {endereco.cep && (
                  <div><span className="font-bold">CEP:</span> {endereco.cep}</div>
                )}
              </div>
            </fieldset>
          )}
          {/* FORMAÇÃO */}
          {(formacao.curso ||
            formacao.instituicao ||
            formacao.anoConclusao ||
            formacao.nivel) && (
            <fieldset className="border-2 border-white rounded-xl px-4 py-3 bg-white/10">
              <legend className="font-semibold text-white px-2 flex items-center gap-2">
                <PhosphorGraduationCap size={22} color="#facc15" weight="fill" /> Formação
              </legend>
              <div className="text-white text-sm mt-2 space-y-1">
                {formacao.curso && (
                  <div><span className="font-bold">Curso:</span> {formacao.curso}</div>
                )}
                {formacao.instituicao && (
                  <div><span className="font-bold">Instituição:</span> {formacao.instituicao}</div>
                )}
                {formacao.nivel && (
                  <div><span className="font-bold">Nível:</span> {formacao.nivel}</div>
                )}
                {formacao.anoConclusao && (
                  <div><span className="font-bold">Conclusão:</span> {formacao.anoConclusao}</div>
                )}
              </div>
            </fieldset>
          )}
          {/* REDES SOCIAIS */}
          {(Object.values(redes_sociais).some(Boolean)) && (
            <fieldset className="border-2 border-white rounded-xl px-4 py-3 bg-white/10">
              <legend className="font-semibold text-white px-2 flex items-center gap-2">
                <Globe size={22} color="#38bdf8" weight="fill" />
                Redes Sociais
              </legend>
              <div className="flex flex-wrap gap-4 mt-2">
                {redes_sociais.linkedin && (
                  <a
                    href={redes_sociais.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <LinkedinLogo size={18} color="#0a66c2" weight="fill" /> LinkedIn
                  </a>
                )}
                {redes_sociais.github && (
                  <a
                    href={redes_sociais.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <GithubLogo size={18} color="#fff" weight="fill" /> GitHub
                  </a>
                )}
                {redes_sociais.instagram && (
                  <a
                    href={redes_sociais.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <InstagramLogo size={18} color="#e1306c" weight="fill" /> Instagram
                  </a>
                )}
                {redes_sociais.facebook && (
                  <a
                    href={redes_sociais.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <FacebookLogo size={18} color="#1877f3" weight="fill" /> Facebook
                  </a>
                )}
                {redes_sociais.telegram && (
                  <a
                    href={redes_sociais.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <TelegramLogo size={18} color="#229ed9" weight="fill" /> Telegram
                  </a>
                )}
                {redes_sociais.whatsapp && (
                  <a
                    href={redes_sociais.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-200 flex items-center gap-1"
                  >
                    <WhatsappLogo size={18} color="#25d366" weight="fill" /> WhatsApp
                  </a>
                )}
              </div>
            </fieldset>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CompPerfil;
