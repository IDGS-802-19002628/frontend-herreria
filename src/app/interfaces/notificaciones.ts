export interface Notificaciones {
    chrTitulo: string;
    chrMensaje: string;
    dtFecha?: string;
    chrStatus: number; // 1 = New, 2 = Urgent, 3 = Important
    timestamp: number; // Tiempo en milisegundos
  }
  