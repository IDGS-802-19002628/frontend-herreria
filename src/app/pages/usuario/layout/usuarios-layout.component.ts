import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuarios-layout',
  templateUrl: './usuarios-layout.component.html',
  styleUrls: []
})

export class UsuariosLayoutComponent {

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}
