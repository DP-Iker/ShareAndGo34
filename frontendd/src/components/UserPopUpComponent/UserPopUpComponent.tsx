import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCookiesLogin } from "../../utils/cookisLogin";
import type { UsuarioCompleto } from "../../interfaces/Usuario";
import { httpGetTok } from "../../utils/apiService";
import { useUserStore } from "../../hooks/userStore";
import { useTranslation } from "react-i18next";

export const UserPopUpComponent = () => {
  const { t } = useTranslation(); // 🎯 hook de traducción
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);

  const setToken = useUserStore((state) => state.setToken);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await httpGetTok<UsuarioCompleto>("/usuarios/me");
      if (data) {
        setUsuario(data);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCerrarSesion = () => {
    deleteCookiesLogin();
    setToken("");
    setIsOpen(false);
    navigate("/");
  };

  const handleConfiguracion = () => {
    setIsOpen(false);
    navigate("/panel");
  };

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={usuario?.avatar || "/avatar-placeholder.png"}
        alt="User avatar"
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-500 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && usuario && (
        <div className="absolute right-0 mt-2 w-72 bg-[#1F2937] rounded-xl shadow-2xl p-4 z-50 border border-gray-700 text-white">
          <div className="flex items-center space-x-3">
            {usuario.avatar && (
              <img
                src={usuario.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full border border-gray-500 shadow"
              />
            )}

            <div>
              <h2 className="text-lg font-semibold">{usuario.usuario}</h2>
              <p className="text-sm text-gray-400">{usuario.email}</p>
            </div>
          </div>

          <hr className="my-3 border-gray-600" />

          <button
            onClick={handleConfiguracion}
            className="block w-full text-left text-sm py-2 hover:bg-[#374151] rounded px-2 transition duration-150"
          >
            ⚙️ {t("popup.configuracion")}
          </button>
          <button
            onClick={handleCerrarSesion}
            className="block w-full text-left text-sm py-2 text-red-400 hover:bg-[#F93943] hover:text-white rounded px-2 transition duration-150"
          >
            🔐 {t("popup.cerrarSesion")}
          </button>
        </div>
      )}
    </div>
  );
};
