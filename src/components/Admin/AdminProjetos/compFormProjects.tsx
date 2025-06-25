import { useState } from "react";
import type { ChangeEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../services/firebase";

const STATUS_OPTIONS = [
  { value: "rascunho", label: "Rascunho" },
  { value: "publicado", label: "Publicado" },
  { value: "em_andamento", label: "Em andamento" },
];

interface FormProjectsProps {
  onSuccess?: () => void;
}

export default function FormProjects({ onSuccess }: FormProjectsProps) {
  const [form, setForm] = useState({
    categoria:"",
    nome: "",
    descricao: "",
    imagemCapa: "",
    gifPreview: "",
    linkDetalhes: "",
    linkRepositorio: "",
    linkDemo: "",
    tecnologias: "",
    dataPublicacao: "",
    status: "rascunho",
    destaque: false,
  });
  const [mensagem, setMensagem] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const now = new Date();
      await addDoc(collection(db, "projetos"), {
        categoria: form.categoria,
        nome: form.nome,
        descricao: form.descricao,
        imagemCapa: form.imagemCapa,
        gifPreview: form.gifPreview,
        linkDetalhes: form.linkDetalhes,
        linkRepositorio: form.linkRepositorio,
        linkDemo: form.linkDemo,
        tecnologias: form.tecnologias.split(",").map(t => t.trim()).filter(Boolean),
        dataPublicacao: form.dataPublicacao,
        status: form.status,
        destaque: form.destaque,
        created_at: now,
        updated_at: now,
        criadoEm: serverTimestamp(),
      });
      setMensagem("Projeto cadastrado com sucesso!");
      setForm({
        categoria: "",
        nome: "",
        descricao: "",
        imagemCapa: "",
        gifPreview: "",
        linkDetalhes: "",
        linkRepositorio: "",
        linkDemo: "",
        tecnologias: "",
        dataPublicacao: "",
        status: "rascunho",
        destaque: false,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      setMensagem("Erro ao cadastrar projeto.");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Cadastrar Projeto</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
         <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Tipo de Projeto</label>
          <input name="categoria" value={form.categoria} onChange={handleInput} placeholder="Exemplo: Web backend" className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Nome do Projeto</label>
          <input name="nome" value={form.nome} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Descrição Resumida</label>
          <textarea name="descricao" value={form.descricao} onChange={handleInput} className="border px-3 py-2 rounded-md w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Imagem de Capa (URL)</label>
          <input type="url" name="imagemCapa" value={form.imagemCapa} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">GIF Preview (URL, opcional)</label>
          <input type="url" name="gifPreview" value={form.gifPreview} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Link para Detalhes</label>
          <input type="url" name="linkDetalhes" value={form.linkDetalhes} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Link do Repositório (opcional)</label>
          <input type="url" name="linkRepositorio" value={form.linkRepositorio} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Link da Demo Online (opcional)</label>
          <input type="url" name="linkDemo" value={form.linkDemo} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Tecnologias (separe por vírgula)</label>
          <input name="tecnologias" value={form.tecnologias} onChange={handleInput} placeholder="React, Django, Docker" className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Data de Publicação</label>
          <input type="date" name="dataPublicacao" value={form.dataPublicacao} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Status</label>
          <select name="status" value={form.status} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300">
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="destaque" checked={form.destaque} onChange={handleInput} className="w-5 h-5 accent-yellow-500" />
          <label className="font-semibold text-white">Destaque (aparecer na página inicial)</label>
        </div>
        <button type="submit" className="bg-white text-blue-800 py-3 rounded-md font-semibold hover:bg-blue-100 transition">Salvar</button>
        {mensagem && <p className="text-center text-green-200 font-medium">{mensagem}</p>}
      </form>
    </div>
  );
}
