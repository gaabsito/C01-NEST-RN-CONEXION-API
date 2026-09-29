import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Luna', especie: 'gato' },
    { id: 2, nombre: 'Toby', especie: 'perro' },
    { id: 3, nombre: 'Nube', especie: 'conejo' },
  ];

  findOne(id: number) {
    return this.mascotas.find((mascota) => mascota.id === id);
  }
}
