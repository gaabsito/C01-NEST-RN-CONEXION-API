import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Pizza Margarita', emoji: '🍕', precio: 9 },
    { id: 2, nombre: 'Hamburguesa', emoji: '🍔', precio: 8 },
    { id: 3, nombre: 'Ensalada', emoji: '🥗', precio: 6 },
    { id: 4, nombre: 'Helado', emoji: '🍦', precio: 3 },
  ];

  findAll() {
    return this.productos;
  }
}