import { Component, OnInit } from '@angular/core';

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

  products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Protección estándar para puertas de hogar', price: 25.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', description: 'Protección avanzada con múltiples capas de seguridad', price: 40.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3. Ideal para aquellos que buscan...', price: 15.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Producto 4', description: 'Descripción del producto 4. No te lo puedes perder...', price: 30.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Producto 5', description: 'Descripción del producto 5. ¡Compra ahora y ahorra!', price: 35.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Producto 6', description: 'Descripción del producto 6. Un producto de alta calidad...', price: 20.00, imageUrl: 'https://via.placeholder.com/150' }
  ];

  cart: Product[] = [];
  purchases: Product[] = [];
  showCart = false;
  showPurchases = false;

  ngOnInit() {
    this.loadPurchases();
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    if (this.cart.length > 0) {
      // Agregar productos al historial de compras
      this.purchases = [...this.purchases, ...this.cart];
      this.savePurchases();
      this.cart = [];
      this.showCart = false;
      alert('Compra realizada con éxito.');
    } else {
      alert('El carrito está vacío.');
    }
  }

  togglePurchases() {
    this.showPurchases = !this.showPurchases;
  }

  savePurchases() {
    localStorage.setItem('purchases', JSON.stringify(this.purchases));
  }

  loadPurchases() {
    const savedPurchases = localStorage.getItem('purchases');
    if (savedPurchases) {
      this.purchases = JSON.parse(savedPurchases);
    }
  }
  removeFromCart(product: Product) {
    const index = this.cart.indexOf(product);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }
  
}
