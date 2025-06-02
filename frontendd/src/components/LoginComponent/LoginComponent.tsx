import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCookiesLogin,
  setLoginCookiesAndRedirect,
} from "../../utils/cookisLogin";
import type { UserData } from "../../interfaces/UserData";
import {
  validateName,
  validatePassword,
  verificarUsuario,
} from "../../utils/verificaciones";
import type { LoginProps } from "../../interfaces/LoginProps";
import { Usuario } from "../../interfaces/Usuario";
import { useUserStore } from "../../hooks/userStore";
import { useTranslation } from "react-i18next";

export const LoginComponent: FC<LoginProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const [form, setForm] = useState<Usuario>(Usuario());
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(false);
    setMensajeError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setMensajeError("");

    if (!form.usuario || !form.contrasenya) {
      setError(true);
      setMensajeError(t("login.camposObligatorios"));
      return;
    }

    if (validateName(form.usuario) && validatePassword(form.contrasenya)) {
      const token: UserData | null = await verificarUsuario(form);
      if (token) {
        try {
          setToken(token.token);
          onClose();
          setLoginCookiesAndRedirect(token);
          console.log(getCookiesLogin());
          navigate("/");
        } catch (error) {
          console.error("Error al generar el token:", error);
          setError(true);
          setMensajeError(t("login.errorGenerico"));
        }
      } else {
        setError(true);
        setMensajeError(t("login.error"));
      }
    } else {
      setError(true);
      setMensajeError(t("login.datosInvalidos"));
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[5px] bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="p-6 rounded-lg shadow-lg w-full max-w-sm relative"
        style={{ backgroundColor: "#1F2937" }}
      >
        <button
          onClick={onClose}
          aria-label={t("login.cerrarModal")}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl transition"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center" style={{ color: "#C4B5FD" }}>
          {t("login.titulo")}
        </h2>

        {mensajeError && (
          <p className="text-red-500 text-sm text-center mb-4">{mensajeError}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder={t("login.placeholderUsuario")}
            value={form.usuario}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-4 bg-[#374151] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
              error ? "border border-red-500 focus:ring-red-500" : "focus:ring-[#C4B5FD]"
            }`}
          />
          <input
            type="password"
            name="contrasenya"
            placeholder={t("login.placeholderContrasenya")}
            value={form.contrasenya}
            onChange={handleChange}
            className={`w-full p-3 rounded mb-6 bg-[#374151] text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
              error ? "border border-red-500 focus:ring-red-500" : "focus:ring-[#C4B5FD]"
            }`}
          />

          <p className="text-center text-sm text-gray-300 mb-6">
            {t("login.noCuenta")}{" "}
            <Link
              to="register"
              className="text-[#C4B5FD] hover:underline font-semibold"
              onClick={onClose}
            >
              {t("login.registrate")}
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded bg-[#A7F3D0] text-gray-900 font-semibold hover:bg-[#9EE6C4] transition"
          >
            {t("login.botonEntrar")}
          </button>
        </form>
      </div>
    </div>
  );
};
