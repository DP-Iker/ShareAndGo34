export type Usuario = {
  usuario: string;
  contrasenya: string;
  email: string;
};

export function Usuario(): Usuario {
  return { usuario: "", contrasenya: "", email: "" };
}

export interface UsuarioToken {
  contrasenya: string;
  email: string;
}

// export type UsuarioCompleto = {
//   usuario: string;
//   email: string;
//   fechaNacimiento: string;
//   dni: string;
// };

// export function UsuarioCompleto(): UsuarioCompleto {
//   return { usuario: "", email: "", fechaNacimiento: "", dni: "" };
// }

export type UsuarioLogin = {
  usuario: string;
  email: string;
  avatar: string;
};

export function UsuarioLogin(): UsuarioLogin {
  return { usuario: "", email: "", avatar: "" };
}

export type UsuarioCompleto = {
  id: number;
  usuario: string;
  email: string;
  fechaNacimiento: string;
  dni: string;
  avatar: string | null;
  esAdministrador: boolean;
  estaBloqueado: boolean;
  motivoBloqueo: string;
  createdAt: string;
};

export const usuarioCompletoVacio: UsuarioCompleto = {
  id: 0,
  usuario: "",
  email: "",
  fechaNacimiento: "",
  dni: "",
  avatar: null,
  esAdministrador: false,
  estaBloqueado: false,
  motivoBloqueo: "",
  createdAt: "",
};
