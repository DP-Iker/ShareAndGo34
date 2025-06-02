// import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "../../hooks/themeMode";

export default function ThemeButtonComponent() {
  const { darkMode, toggleDarkMode } = useThemeMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Cambiar tema"
      className="w-12 h-6 rounded-full flex items-center px-1 bg-gray-300 dark:bg-gray-700 transition-all duration-300 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? "translate-x-6  bg-black" : "translate-x-0  bg-white "
        }`}
      />
      {!darkMode ? (
        <span className="absolute left-1 text-[10px] text-yellow-500  select-none">
          ☀️
        </span>
      ) : (
        <span className="absolute right-1 text-[10px] text-white hidden  select-none">
          🌙
        </span>
      )}
    </button>
  );
}
