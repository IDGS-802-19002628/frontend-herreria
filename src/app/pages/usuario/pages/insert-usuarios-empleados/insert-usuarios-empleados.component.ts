import { Component } from '@angular/core';

@Component({
  selector: 'app-insert-usuarios-empleados',
  templateUrl: './insert-usuarios-empleados.component.html',
  styleUrls: ['./insert-usuarios-empleados.component.scss']
})
export class InsertUsuariosEmpleadosComponent {
  imageSrc: string | ArrayBuffer | null = null;

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

}
