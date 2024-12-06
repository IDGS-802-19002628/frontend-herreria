export interface SolicitudProduccion {
  id: number; // Representa el ID único de la solicitud de producción
  descripcion: string; // Descripción de la solicitud
  estatus: string; // Estado de la solicitud (activo, inactivo, etc.)
  cantidad: number; // Cantidad de producción solicitada
  fabricacionId: number; // ID relacionado con la fabricación
  usuarioId: number; // ID del usuario que realizó la solicitud
}

export interface IniciarProduccionDTO {
  usuarioId: number;              // Representa el ID del usuario
  solicitudProduccionId: number;  // Representa el ID de la solicitud de producción
  costoTotal: number;             // Representa el costo total (usando 'number' para tipo float en TypeScript)
}