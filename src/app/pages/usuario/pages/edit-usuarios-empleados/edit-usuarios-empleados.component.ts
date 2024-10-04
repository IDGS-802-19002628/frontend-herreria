import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-usuarios-empleados',
  templateUrl: './edit-usuarios-empleados.component.html',
  styleUrls: ['./edit-usuarios-empleados.component.scss']
})
export class EditUsuariosEmpleadosComponent {
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
