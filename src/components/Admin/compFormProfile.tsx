import { useState, FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

// Tipagem do formulário
interface FormState {
  nomeCompleto: string;
  foto: string;
  bio: string;
  softSkills: string;
  email: string;
  telefone: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
  telegram: string;
  whatsapp: string;
  curso: string;
  instituicao: string;
  anoConclusao: string;
  nivel: string;
  ativo: "sim" | "nao";
}

export default function FormProfile() {
  const [form, setForm] = useState<FormState>({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao atualizar perfil.");
    }
  };

  const Input = ({
    label,
    name,
    type = "text"
  }: {
    label: string;
    name: keyof FormState;
    type?: string;
  }) => (
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

  const Textarea = ({
    label,
    name
  }: {
    label: string;
    name: keyof FormState;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-white">{label}</label>
      <textarea
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="border px-3 py-2 rounded-md w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );

  const FieldGroup = ({
    title,
    children
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <fieldset className="border border-white rounded-lg p-4">
      <legend className="font-bold text-lg text-white px-2">{title}</legend>
      <div className="grid gap-4 mt-2">{children}</div>
    </fieldset>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Editar Perfil</h1>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <FieldGroup title="Perfil">
          <Input label="Foto de Perfil (URL)" name="foto" type="url" />
          <Input label="Nome Completo" name="nomeCompleto" />
          <Textarea label="Bio / Resumo Profissional" name="bio" />
          <Input label="Soft Skills" name="softSkills" />

          <div className="flex gap-4 items-center">
            <label className="font-semibold text-white">Usuário Ativo:</label>
            <label className="text-white">
              <input
                type="radio"
                name="ativo"
                value="sim"
                checked={form.ativo === "sim"}
                onChange={handleChange}
                className="mr-1"
              />
              Sim
            </label>
            <label className="text-white">
              <input
                type="radio"
                name="ativo"
                value="nao"
                checked={form.ativo === "nao"}
                onChange={handleChange}
                className="mr-1"
              />
              Não
            </label>
          </div>
        </FieldGroup>

        <FieldGroup title="Contatos">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="E-mail" name="email" type="email" />
            <Input label="Telefone" name="telefone" />
          </div>
        </FieldGroup>

        <FieldGroup title="Endereço">
          <div className="grid md:grid-cols-4 gap-4">
            <Input label="Bairro" name="bairro" />
            <Input label="Cidade" name="cidade" />
            <Input label="Estado" name="estado" />
            <Input label="CEP" name="cep" />
          </div>
        </FieldGroup>

        <FieldGroup title="Redes Sociais">
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="LinkedIn" name="linkedin" type="url" />
            <Input label="GitHub" name="github" type="url" />
            <Input label="Instagram" name="instagram" type="url" />
            <Input label="Facebook" name="facebook" type="url" />
            <Input label="Telegram" name="telegram" type="url" />
            <Input label="WhatsApp" name="whatsapp" type="url" />
          </div>
        </FieldGroup>

        <FieldGroup title="Formação">
          <div className="grid md:grid-cols-4 gap-4">
            <Input label="Curso" name="curso" />
            <Input label="Instituição" name="instituicao" />
            <Input label="Ano de Conclusão" name="anoConclusao" type="number" />
            <Input label="Nível" name="nivel" />
          </div>
        </FieldGroup>

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
