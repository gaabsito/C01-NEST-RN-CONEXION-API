import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HeroesService } from './heroes.service.js';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.heroesService.findOne(id);
  }
}