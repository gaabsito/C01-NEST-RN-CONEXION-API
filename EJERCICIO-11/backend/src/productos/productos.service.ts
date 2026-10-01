import { BadRequestException, Injectable } from '@nestjs/common';
@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Pizza Margarita', precio: 9 },
    { id: 2, nombre: 'Hamburguesa', precio: 8 },
    { id: 3, nombre: 'Helado', precio: 3 },
  ];
  findAll() { return this.productos; }
  crear(body: unknown) {
    if (!body || typeof body !== 'object') throw new BadRequestException('Producto no válido');
    const { nombre, precio } = body as Record<string, unknown>;
    if (typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 80 ||
        typeof precio !== 'number' || !Number.isFinite(precio) || precio < 0) {
      throw new BadRequestException('Introduce un nombre y un precio válido mayor o igual a cero');
    }
    const producto = { id: this.productos.length + 1, nombre: nombre.trim(), precio: Math.round(precio * 100) / 100 };
    this.productos.push(producto);
    return producto;
  }
}
