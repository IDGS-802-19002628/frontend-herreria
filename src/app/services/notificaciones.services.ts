import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notificaciones } from '../interfaces/notificaciones';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private lstNotificaciones: Notificaciones[] = [];
  private notificacionesSubject = new BehaviorSubject<Notificaciones[]>([]);
  notificaciones$ = this.notificacionesSubject.asObservable();

  constructor() {
    this.startNotificationCleanup();
  }

  addNotificacion(notificacion: Notificaciones): void {
    notificacion.timestamp = new Date().getTime(); // Agrega un timestamp
    this.lstNotificaciones.push(notificacion);
    this.notificacionesSubject.next(this.lstNotificaciones);
  }

  private startNotificationCleanup(): void {
    setInterval(() => {
      const now = new Date().getTime();
      this.lstNotificaciones = this.lstNotificaciones.filter(
        (n) => n.timestamp !== undefined && now - n.timestamp < 30 * 60 * 1000 // Verifica que timestamp exista
      );
      this.notificacionesSubject.next(this.lstNotificaciones);
    }, 60 * 1000); // Verificar cada minuto
  }
  
}
