import { Module } from '@nestjs/common';
import { CriaturasController } from './criaturas/criaturas.controller.js';
import { CriaturasService } from './criaturas/criaturas.service.js';
@Module({ controllers: [CriaturasController], providers: [CriaturasService] })
export class AppModule {}
