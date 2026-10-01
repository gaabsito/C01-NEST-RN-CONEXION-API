import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mascotasService.findOne(id);
  }

  @Patch(':id/like')
  darLike(@Param('id', ParseIntPipe) id: number) {
    return this.mascotasService.darLike(id);
  }
}
