import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../services/firebase";

export default function FormProfile() {
  const [form, setForm] = useState({
    nomeCompleto: "",
    foto: "",
    bio: "",
    softSkills: "",
    email: "",
    telefone: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    linkedin: "",
    github: "",
    instagram: "",
    facebook: "",
    telegram: "",
    whatsapp: "",
    curso: "",
    instituicao: "",
    anoConclusao: "",
    nivel: "",
    ativo: "sim"
  });
  const [mensagem, setMensagem] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "radio" ? value : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "perfil"), {
        perfil: {
          foto: form.foto,
          nomeCompleto: form.nomeCompleto,
          bio: form.bio,
          softSkills: form.softSkills,
          ativo: form.ativo === "sim"
        },
        contatos: {
          email: form.email,
          telefone: form.telefone
        },
        endereco: {
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.estado,
          cep: form.cep
        },
        redes_sociais: {
          linkedin: form.linkedin,
          github: form.github,
          instagram: form.instagram,
          facebook: form.facebook,
          telegram: form.telegram,
          whatsapp: form.whatsapp
        },
        formacao: {
          curso: form.curso,
          instituicao: form.instituicao,
          anoConclusao: form.anoConclusao,
          nivel: form.nivel
        },
        atualizadoEm: serverTimestamp()
      });
      setMensagem("Perfil atualizado com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar perfil.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <fieldset className="border border-white rounded-lg p-4">
          <legend className="font-bold text-lg text-white px-2">Perfil</legend>
          <div className="grid gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Foto de Perfil (URL)</label>
              <input type="url" name="foto" value={form.foto} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Nome Completo</label>
              <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Bio / Resumo Profissional</label>
              <textarea name="bio" value={form.bio} onChange={handleInput} className="border px-3 py-2 rounded-md w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Soft Skills</label>
              <input name="softSkills" value={form.softSkills} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex gap-4 items-center">
              <label className="font-semibold text-white">Usuário Ativo:</label>
              <label className="text-white">
                <input type="radio" name="ativo" value="sim" checked={form.ativo === "sim"} onChange={handleInput} className="mr-1" /> Sim
              </label>
              <label className="text-white">
                <input type="radio" name="ativo" value="nao" checked={form.ativo === "nao"} onChange={handleInput} className="mr-1" /> Não
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-white rounded-lg p-4">
          <legend className="font-bold text-lg text-white px-2">Contatos</legend>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">E-mail</label>
              <input type="email" name="email" value={form.email} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Telefone</label>
              <input name="telefone" value={form.telefone} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-white rounded-lg p-4">
          <legend className="font-bold text-lg text-white px-2">Endereço</legend>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Bairro</label>
              <input name="bairro" value={form.bairro} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Cidade</label>
              <input name="cidade" value={form.cidade} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Estado</label>
              <input name="estado" value={form.estado} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">CEP</label>
              <input name="cep" value={form.cep} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-white rounded-lg p-4">
          <legend className="font-bold text-lg text-white px-2">Redes Sociais</legend>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">LinkedIn</label>
              <input type="url" name="linkedin" value={form.linkedin} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">GitHub</label>
              <input type="url" name="github" value={form.github} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Instagram</label>
              <input type="url" name="instagram" value={form.instagram} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Facebook</label>
              <input type="url" name="facebook" value={form.facebook} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Telegram</label>
              <input type="url" name="telegram" value={form.telegram} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">WhatsApp</label>
              <input type="url" name="whatsapp" value={form.whatsapp} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
        </fieldset>
        <fieldset className="border border-white rounded-lg p-4">
          <legend className="font-bold text-lg text-white px-2">Formação</legend>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Curso</label>
              <input name="curso" value={form.curso} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Instituição</label>
              <input name="instituicao" value={form.instituicao} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Ano de Conclusão</label>
              <input type="number" name="anoConclusao" value={form.anoConclusao} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-white">Nível</label>
              <input name="nivel" value={form.nivel} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
        </fieldset>
        <button type="submit" className="bg-white text-blue-800 py-3 rounded-md font-semibold hover:bg-blue-100 transition">Salvar</button>
        {mensagem && <p className="text-center text-green-200 font-medium">{mensagem}</p>}
      </form>
    </div>
  );
}
