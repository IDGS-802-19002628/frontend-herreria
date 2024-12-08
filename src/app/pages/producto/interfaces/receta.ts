export interface receta {
  idReceta: number;
  idFabricacion: number;
  tipoProteccion: string;
  materiales: string[]; // Cambiar de material a materiales (arreglo de strings)
  cantidad: number;
  descripcion: string;
  fechaCreacion: string;
  estatus: number;
}
