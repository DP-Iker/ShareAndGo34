import type { UserData } from "../interfaces/UserData";
import type { Usuario } from "../interfaces/Usuario";
import { httpPost } from "./apiService";

export function validateMail(mail: string): boolean {
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return mailRegex.test(mail);
}

export function validateName(name: string): boolean {
  // const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
  const nameRegex = /^[\p{L}\p{M}\s\W\d]{3,25}$/u;
  return nameRegex.test(name);
}
export function validatePassword(pass: string): boolean {
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // (mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo)
  return passwordRegex.test(pass);
}
export function validateFechaNacimiento(fn: string): boolean {
  const fechaNacimientoRegex = /^\d{4}-\d{2}-\d{2}$/;

  return fechaNacimientoRegex.test(fn);
}

export function validarDNI(dni: string): boolean {
  const dniRegex = /^\d{8}[A-Za-z]$/;
  if (!dniRegex.test(dni)) return false;

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(dni.slice(0, 8), 10);
  const letra = dni.charAt(8).toUpperCase();

  return letra === letras[numero % 23];
}

export function validarNIE(nie: string): boolean {
  const nieRegex = /^[XYZ]\d{7}[A-Za-z]$/;
  if (!nieRegex.test(nie)) return false;

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const numero = parseInt(nie.slice(0, 8), 10);
  const letra = nie.slice(8).toUpperCase();

  return letra === letras[numero % 23];
}

export function valodateForm(form: Usuario) {
  const validates = [];

  validates.push(!validateName(form.usuario));
  validates.push(!validatePassword(form.contrasenya));
  validates.push(!validateMail(form.email));

  let verifi = true;
  validates.forEach((item) => {
    console.log(item);
    if (item) {
      verifi = false;
    }
  });

  return verifi;
}

export async function verificarUsuario(
  user: Usuario
): Promise<UserData | null> {
  return await httpPost("/auth/login", {
    usuario: user.usuario,
    contrasenya: user.contrasenya,
  });
}
