import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateMail,
  validateFechaNacimiento,
  validarDNI,
} from "../../utils/verificaciones";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";
import { FondoPanelComponent } from "../../components/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../components/PanelComonent/TituloComponent";
import { useTranslation } from "react-i18next"; // 🟣 Hook de traducción

export const EditarPerfilPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);
  const [errores, setErrores] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const erroresForm: string[] = [];

    if (!validateName(usuario.usuario)) erroresForm.push(t("perfil.errorNombre"));
    if (!validateMail(usuario.email)) erroresForm.push(t("perfil.errorCorreo"));
    if (!validateFechaNacimiento(usuario.fechaNacimiento)) erroresForm.push(t("perfil.errorFecha"));
    if (!validarDNI(usuario.dni)) erroresForm.push(t("perfil.errorDNI"));

    if (erroresForm.length > 0) {
      setErrores(erroresForm);
      return;
    }

    navigate("/panel");
  };

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen text-white px-8 py-10">

        <TituloComponent titulo={t("perfil.titulo")} />

        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10">
          <div className="flex gap-10">
            <div className="w-1/3 flex flex-col items-center ">
              {usuario.avatar ? (
                <img
                  src={usuario.avatar}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-purple-400/30 mb-4 shadow-md flex items-center justify-center bg-purple-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-purple-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9.3 1.6-9.3 4.7v1.1c0 .6.5 1.1 1.1 1.1h16.4c.6 0 1.1-.5 1.1-1.1v-1.1c0-3.1-6.2-4.7-9.3-4.7z" />
                  </svg>
                </div>
              )}
              <button className="text-sm mt-2 text-purple-400 hover:underline cursor-pointer">
                {t("perfil.cambiarFoto")}
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-2/3 space-y-5 p-8 rounded-2xl"
            >
              {errores.length > 0 && (
                <div className="bg-red-600/20 border border-red-600 text-red-300 p-3 rounded-md">
                  <ul className="text-sm space-y-1">
                    {errores.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {t("perfil.nombre")}
                  </label>
                  <input
                    type="text"
                    name="usuario"
                    value={usuario.usuario}
                    onChange={handleChange}
                    placeholder={t("perfil.placeholderNombre")}
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {t("perfil.apellidos")}
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    onChange={handleChange}
                    placeholder={t("perfil.placeholderApellidos")}
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {t("perfil.correo")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    placeholder={t("perfil.placeholderCorreo")}
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {t("perfil.telefono")}
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    onChange={handleChange}
                    placeholder={t("perfil.placeholderTelefono")}
                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="text-right mt-6">
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
                >
                  {t("perfil.botonGuardar")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FondoPanelComponent>
  );
};
