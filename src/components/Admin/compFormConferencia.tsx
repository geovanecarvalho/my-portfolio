import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function FormConferencia() {
  const [form, setForm] = useState({
    imagem: "",
    nome: "",
    data: "",
    local: "",
    site: ""
  });
  const [mensagem, setMensagem] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "conferencias"), {
        imagem: form.imagem,
        nome: form.nome,
        data: form.data,
        local: form.local,
        site: form.site,
        criadoEm: serverTimestamp()
      });
      setMensagem("Conferência cadastrada com sucesso!");
      setForm({ imagem: "", nome: "", data: "", local: "", site: "" });
    } catch (error) {
      setMensagem("Erro ao cadastrar conferência.");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Cadastrar Conferência</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">URL da Imagem</label>
          <input type="url" name="imagem" value={form.imagem} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Nome da Conferência</label>
          <input name="nome" value={form.nome} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Data</label>
          <input type="date" name="data" value={form.data} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Local</label>
          <input name="local" value={form.local} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">URL do Site da Conferência</label>
          <input type="url" name="site" value={form.site} onChange={handleInput} className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <button type="submit" className="bg-white text-blue-800 py-3 rounded-md font-semibold hover:bg-blue-100 transition">Salvar</button>
        {mensagem && <p className="text-center text-green-200 font-medium">{mensagem}</p>}
      </form>
    </div>
  );
}
