import { useRef, useState } from "react";
import type { UserData } from "../../interfaces/UserData";
import { setLoginCookiesAndRedirect } from "../../utils/cookisLogin";
import { useNavigate } from "react-router-dom";
import {
  validateMail,
  validateName,
  validatePassword,
  verificarUsuario,
} from "../../utils/verificaciones";
import { Usuario } from "../../interfaces/Usuario";
import { httpPost } from "../../utils/apiService";
import { useUserStore } from "../../hooks/userStore";
import { mostrarError } from "../../utils/notiToast";
import { useTranslation } from "react-i18next"; // 🟢 Traducción

export const RegisterComponent = () => {
  const { t } = useTranslation(); // 🟢 Hook de traducción
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());
  const [mensajeError, setMensajeError] = useState("");

  const [erroresCampos, setErroresCampos] = useState({
    usuario: false,
    email: false,
    contrasenya: false,
  });

  const refNombre = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPass = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErroresCampos((prev) => ({
      ...prev,
      [name]: false,
    }));
    setMensajeError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nombreValido = validateName(form.usuario);
    const emailValido = validateMail(form.email);
    const passValida = validatePassword(form.contrasenya);

    if (!form.usuario && !form.email && !form.contrasenya) {
      const msg = t("registro.todosCampos");
      setMensajeError(msg);
      mostrarError(msg);
      setErroresCampos({ usuario: true, email: true, contrasenya: true });
      refNombre.current?.focus();
      return;
    }

    const nuevosErrores = {
      usuario: !nombreValido,
      email: !emailValido,
      contrasenya: !passValida,
    };

    const camposInvalidos = Object.entries(nuevosErrores)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if (camposInvalidos.length > 0) {
      setErroresCampos(nuevosErrores);

      const mensajes = [];
      if (!nombreValido) mensajes.push(t("registro.nombreValido"));
      if (!emailValido) mensajes.push(t("registro.correoValido"));
      if (!passValida) mensajes.push(t("registro.passValida"));

      const combinado = `${t("registro.introduce")} ${mensajes.join(" y ")}`;
      setMensajeError(combinado);
      mostrarError(combinado);

      if (!nombreValido) refNombre.current?.focus();
      else if (!emailValido) refEmail.current?.focus();
      else if (!passValida) refPass.current?.focus();

      return;
    }

    try {
      await httpPost("/auth/registro", form);
      const token: UserData | null = await verificarUsuario(form);
      if (token) {
        setToken(token.token);
        setLoginCookiesAndRedirect(token);
        navigate("/");
      } else {
        const msg = t("registro.usuarioExiste");
        setErroresCampos({ usuario: true, email: false, contrasenya: false });
        setMensajeError(msg);
        mostrarError(msg);
        refNombre.current?.focus();
      }
    } catch (error) {
      const msg = t("registro.errorGeneral");
      setErroresCampos({ usuario: false, email: false, contrasenya: false });
      setMensajeError(msg);
      mostrarError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1F2937] p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "#C4B5FD" }}>
        {t("registro.titulo")}
      </h2>

      {mensajeError && (
        <p className="text-red-500 text-sm text-center mb-4">{mensajeError}</p>
      )}

      <input
        ref={refNombre}
        type="text"
        name="usuario"
        placeholder={t("registro.placeholderNombre")}
        value={form.usuario}
        onChange={handleChange}
        className={`w-full p-3 mb-4 rounded bg-[#374151] text-white placeholder-gray-400 border focus:outline-none focus:ring-2 transition ${
          erroresCampos.usuario
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent focus:ring-[#C4B5FD]"
        }`}
      />

      <input
        ref={refEmail}
        type="email"
        name="email"
        placeholder={t("registro.placeholderCorreo")}
        value={form.email}
        onChange={handleChange}
        className={`w-full p-3 mb-4 rounded bg-[#374151] text-white placeholder-gray-400 border focus:outline-none focus:ring-2 transition ${
          erroresCampos.email
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent focus:ring-[#C4B5FD]"
        }`}
      />

      <input
        ref={refPass}
        type="password"
        name="contrasenya"
        placeholder={t("registro.placeholderPass")}
        value={form.contrasenya}
        onChange={handleChange}
        className={`w-full p-3 mb-2 rounded bg-[#374151] text-white placeholder-gray-400 border focus:outline-none focus:ring-2 transition ${
          erroresCampos.contrasenya
            ? "border-red-500 focus:ring-red-500"
            : "border-transparent focus:ring-[#C4B5FD]"
        }`}
      />

      {erroresCampos.contrasenya && (
        <p className="text-red-400 text-sm mb-4">
          {t("registro.validacionPass")}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded bg-[#A7F3D0] text-gray-900 font-semibold hover:bg-[#9EE6C4] transition"
      >
        {t("registro.boton")}
      </button>
    </form>
  );
};
