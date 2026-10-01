import { Module } from '@nestjs/common';
import { ProductosController } from './productos/productos.controller.js';
import { ProductosService } from './productos/productos.service.js';
@Module({ controllers: [ProductosController], providers: [ProductosService] })
export class AppModule {}
