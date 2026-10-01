import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductosService } from './productos.service.js';
@Controller('productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() crear(@Body() body: unknown) { return this.service.crear(body); }
}
