import { useState } from "react";
import type { FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

interface FormConferenciaState {
  imagem: string;
  nome: string;
  data: string;
  local: string;
}

export default function FormConferencia() {
  const [form, setForm] = useState<FormConferenciaState>({
    imagem: "",
    nome: "",
    data: "",
    local: ""
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "conferencias"), {
        imagem: form.imagem,
        nome: form.nome,
        data: form.data,
        local: form.local,
        criadoEm: serverTimestamp()
      });
      setMensagem("Conferência cadastrada com sucesso!");
      setForm({ imagem: "", nome: "", data: "", local: "" });
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar conferência.");
    }
  };

  const Input = ({ label, name, type = "text" }: { label: string; name: keyof FormConferenciaState; type?: string; }) => (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-white">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );

  return (
    <div className="p-6 max-w-xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Cadastrar Conferência</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <Input label="URL da Imagem" name="imagem" type="url" />
        <Input label="Nome da Conferência" name="nome" />
        <Input label="Data" name="data" type="date" />
        <Input label="Local" name="local" />
        <button
          type="submit"
          className="bg-white text-blue-800 py-3 rounded-md font-semibold hover:bg-blue-100 transition"
        >
          Salvar
        </button>
        {mensagem && (
          <p className="text-center text-green-200 font-medium">{mensagem}</p>
        )}
      </form>
    </div>
  );
}
