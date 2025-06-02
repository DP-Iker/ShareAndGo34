import Cookies from "js-cookie";
import type { UserData } from "../interfaces/UserData";

export const deleteCookiesLogin = (): void => {
  Cookies.remove("sessionToken");
};

export const getCookiesLogin = (): string | null => {
  const token = Cookies.get("sessionToken");
  try {
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error al parsear el token:", error);
    return null;
  }
};

export const setLoginCookiesAndRedirect = (userData: UserData) => {
  // Guardar cookies por 3 días
  Cookies.set("sessionToken", JSON.stringify(userData.token), {
    expires: 1 / 24,
    sameSite: "Strict",
    path: "/",
    // secure: true,
  });
};
