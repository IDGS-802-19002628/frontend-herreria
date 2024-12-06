export interface receta {
    idReceta: number;        // ID de la receta
  idFabricacion: number;   // ID de fabricación
  tipoProteccion: string;  // Tipo de protección
  material: string;        // Material utilizado
  cantidad: number;        // Cantidad del material
 
  descripcion: string;     // Descripción de la receta
  fechaCreacion: string;   // Fecha de creación de la receta (formato ISO)
  estatus: number;   
    
}