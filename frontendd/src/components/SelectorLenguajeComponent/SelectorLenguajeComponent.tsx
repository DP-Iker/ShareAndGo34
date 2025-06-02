import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";


const flags: Record<string, string> = {
  es: "https://upload.wikimedia.org/wikipedia/commons/7/70/Flag_of_Spain_%28civil%29.svg",
  en: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
  ca: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg",
};

const nombresIdiomas: Record<string, string> = {
  es: "ESP",
  ca: "CAT",
  en: "ENG",
};

export const SelectorLenguajeComponent: React.FC = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const cambiarLenguaje = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="w-10 h-7 border-2 border-white/20 rounded overflow-hidden shadow"
      >
        <img
          src={flags[i18n.language] || flags.en}
          alt={i18n.language}
          className="w-full h-full object-cover"
        />
      </button>

      {open && (
        <div className="absolute left-[-20px] mt-2 w-20 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {Object.entries(flags).map(([lang, url]) => (
            <button
              key={lang}
              onClick={() => cambiarLenguaje(lang)}
              className={`w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${i18n.language === lang ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
            >
              <img src={url} alt={lang} className="w-5 h-5 object-cover rounded" />
              <span className="text-sm font-semibold">
                {nombresIdiomas[lang] || lang.toUpperCase()}
              </span>

            </button>
          ))}
        </div>
      )}
    </div>
  );
};
