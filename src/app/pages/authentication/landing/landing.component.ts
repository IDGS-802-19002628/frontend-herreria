import { Component, OnInit } from '@angular/core';
import { ProductoController } from '../../producto/controller/producto.controller';
import { HttpClient } from '@angular/common/http'; 

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  categories = [
    { id: 1, name: 'Electrónicos' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Hogar' },
    { id: 4, name: 'Libros' },
    { id: 5, name: 'Juguetes' }
  ];

  products: Product[] = [];
  cart: Product[] = [];
  purchases: any[] = [];
  
  showCart = false;
  showPurchases = false;
  isLoading = false;
  userName: string | null = null;
  userId: number | null = null;

  constructor(
    private productoController: ProductoController,
    private http: HttpClient 
  ) { }

  ngOnInit() {
    this.loadUser(); 
    this.loadPurchases();
    this.getAllProductos();
  }

  loadUser() {
    const user = localStorage.getItem('usuario');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.nombre;
      this.userId = parsedUser.id;
      console.log(this.userName, this.userId);
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.userName = null;
    this.userId = null; 
    localStorage.removeItem('purchases'); 
    window.location.href = '/authentication/login'; 
  }

  async getAllProductos() {
    this.isLoading = true;
    try {
      const response = await this.productoController.getAllProductoA();
      console.log(response);
      
      this.products = response.map((product: any) => ({
        id: product.id,
        name: product.fabricacion.nombreProducto,
        description: product.cantidad,
        price: product.precio,
        imageUrl: product.fabricacion.imagenProducto || 'https://via.placeholder.com/150'
      }));
    } catch (error) {
      console.error('Error al obtener productos', error);
    } finally {
      this.isLoading = false;
    }
  }
 

  addToCart(product: Product) {
    if (this.userName) {
      this.cart.push(product);
    } else {
      window.location.href = '/authentication/login';
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  togglePurchases() {
    this.showPurchases = !this.showPurchases;
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  async checkout() {
    if (this.cart.length > 0) {
      const folio = 'FOLIO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const userId = localStorage.getItem('usuario');
      const ventaData = {
        fecha: new Date().toISOString(),
        folio: folio,
        usuarioId: this.userId || 0  
      };
      try {
        const response = await this.http.post('http://localhost:5055/api/Venta/PostVenta', ventaData).toPromise();
        this.purchases = [...this.purchases, ...this.cart];
        this.savePurchases();
        this.cart = [];
        this.showCart = false;
        alert('Compra realizada con éxito.');
      } catch (error) {
        console.error('Error al realizar la compra', error);
        alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
      }
    } else {
      alert('El carrito está vacío.');
    }
  }

  savePurchases() {
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  async loadPurchases() {
    if (this.userId) {
      try {
        const response = await this.http.get<any[]>(`http://localhost:5055/api/Venta/GetVentaByUsuario/${this.userId}`).toPromise();
        if (response && response.length > 0) {
          this.purchases = response;
          console.log(this.purchases);
          
        }
      } catch (error) {
        console.error('Error al obtener las compras del usuario', error);
      }
    }
  }

  removeFromCart(product: Product) {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }
}
