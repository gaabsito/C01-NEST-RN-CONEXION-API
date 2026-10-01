import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CriaturasService } from './criaturas.service.js';
@Controller('criaturas')
export class CriaturasController {
  constructor(private readonly service: CriaturasService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id/like') darLike(@Param('id', ParseIntPipe) id: number) { return this.service.darLike(id); }
}
