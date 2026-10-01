import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class CriaturasService {
  private criaturas = [
    { id: 1, nombre: 'Draco', nivel: 18, poder: 82, likes: 27, emoji: '🐲' },
    { id: 2, nombre: 'Foxy', nivel: 12, poder: 68, likes: 19, emoji: '🦊' },
    { id: 3, nombre: 'Panda-X', nivel: 15, poder: 73, likes: 22, emoji: '🐼' },
  ];
  findAll() { return this.criaturas; }
  findOne(id: number) {
    const criatura = this.criaturas.find((item) => item.id === id);
    if (!criatura) throw new NotFoundException('Criatura no encontrada');
    return criatura;
  }
  darLike(id: number) {
    const criatura = this.findOne(id);
    criatura.likes += 1;
    return criatura;
  }
}
