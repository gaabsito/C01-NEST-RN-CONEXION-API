import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HeroesService {
  private heroes = [
    {
      id: 1,
      nombre: 'Spider-Man',
      poder: 'Lanzar telarañas y trepar paredes',
      universo: 'Marvel',
    },
    {
      id: 2,
      nombre: 'Wonder Woman',
      poder: 'Superfuerza y lazo de la verdad',
      universo: 'DC',
    },
    {
      id: 3,
      nombre: 'Thor',
      poder: 'Controlar el trueno y el relámpago',
      universo: 'Marvel',
    },
  ];

  findOne(id: number) {
    const heroe = this.heroes.find((heroe) => heroe.id === id);

    if (!heroe) {
      throw new NotFoundException('No existe un héroe con ese ID');
    }

    return heroe;
  }
}