import { useNavigate, Link } from "react-router-dom";
import { deleteCookiesLogin } from "../../utils/cookisLogin";
import { useUserStore } from "../../hooks/userStore";
import { useEffect, useState } from "react";
import { httpGetTok } from "../../utils/apiService";
import {
  usuarioCompletoVacio,
  type UsuarioCompleto,
} from "../../interfaces/Usuario";
import { FondoPanelComponent } from "../../components/FondoPanelComponent/FondoPanelComponent";
import { TituloComponent } from "../../components/PanelComonent/TituloComponent";
import { useTranslation } from "react-i18next"; // 🟣 i18n

export const UserMenuPage = () => {
  const { t } = useTranslation(); // 🟣 hook de traducción
  const navigate = useNavigate();
  const setToken = useUserStore((state) => state.setToken);
  const [usuario, setUsuario] = useState<UsuarioCompleto>(usuarioCompletoVacio);

  const logOut = () => {
    deleteCookiesLogin();
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioCompleto>("/usuarios/me");
      if (data) {
        setUsuario(data);
        console.log(data);
      }
    };

    fetch();
  }, []);

  const sections = [
    {
      icon: "🚗",
      title: t("userPanel.misReservas"),
      onClick: () => navigate("/panel/reservas"),
    },
    {
      icon: "🔑",
      title: t("userPanel.cambiarPass"),
      onClick: () => navigate("/panel/pass"),
    },
    {
      icon: "✅",
      title: t("userPanel.verificacion"),
      onClick: () => navigate("/panel/veri-user"),
    },
    {
      icon: "📜",
      title: t("userPanel.historial"),
      onClick: () => navigate("/panel/historial"),
    },
    // {
    //   icon: "🔒",
    //   title: "Seguridad",
    //   onClick: () => navigate("/seguridad"),
    // },
    {
      icon: "📤",
      title: t("userPanel.cerrarSesion"),
      onClick: logOut,
    },
  ];

  return (
    <FondoPanelComponent>
      <div className="relative min-h-screen p-8 text-white">
        <TituloComponent titulo={t("userPanel.titulo")} />

        <div className="relative flex flex-col lg:flex-row gap-8">
          <div className="relative w-full max-w-xs bg-white/5 backdrop-blur-md rounded-3xl p-4 shadow-md border border-white/10 mx-auto text-center">
            <Link to="/panel/editar-perfil">
              <button className="absolute top-3 right-3 text-purple-300 hover:text-white transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z"
                  />
                </svg>
              </button>
            </Link>

            <div className="relative w-28 h-28 mx-auto mb-2">
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
            </div>

            <h2 className="text-lg font-semibold text-white">
              {usuario.usuario}
            </h2>

            <div className="mt-2 space-y-1 text-sm text-white">
              <p>
                <span className="text-[#A7F3D0] font-medium">{t("userPanel.email")}:</span>{" "}
                {usuario.email}
              </p>
              <p>
                <span className="text-[#A7F3D0] font-medium">{t("userPanel.nacimiento")}:</span>{" "}
                {usuario.fechaNacimiento}
              </p>
              <p>
                <span className="text-[#A7F3D0] font-medium">{t("userPanel.dni")}:</span>{" "}
                {usuario.dni}
              </p>
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col space-y-4">
            {sections.map(({ icon, title, onClick }, i) => (
              <div
                key={i}
                onClick={onClick}
                className={`flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-md border border-white/10 cursor-pointer duration-200 ease-in-out hover:scale-[1.02] active:scale-95 transition ${i === sections.length - 1 ? "hover:bg-[#F93943]/60" : ""
                  }`}
              >
                <div className="text-3xl">{icon}</div>
                <div className="flex-1 ml-4 text-white text-base font-medium">
                  {title}
                </div>
                <div className="text-purple-300 text-xl">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FondoPanelComponent>
  );
};