export interface InventarioMateriales {
    id: number; // Identificador único
    cantidad: number; // Cantidad del material
    proveedorId: number; // ID del proveedor asociado
    materialId: number; // ID del material
    detalleCompraId: number; // ID del detalle de compra
    nombreMaterial: string; // Nombre del material
  }
  