import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Luna', especie: 'Gato', emoji: '🐱', likes: 0 },
    { id: 2, nombre: 'Toby', especie: 'Perro', emoji: '🐶', likes: 0 },
  ];

  findOne(id: number) {
    const mascota = this.mascotas.find((item) => item.id === id);
    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    return mascota;
  }

  darLike(id: number) {
    const mascota = this.findOne(id);
    mascota.likes += 1;
    return mascota;
  }
}
