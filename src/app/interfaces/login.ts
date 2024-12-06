export interface Login {
    //correo y password
    Email: string;
    Contrasenia: string;

}

export interface LoginResponse {
    id: number;
    nombre: string;
    rol: string;  // Aquí se define que 'rol' es una propiedad de tipo string
    estatus: number;
    urlImage: string;
    direccion: string;
    clientePotencial: boolean;
  }
  