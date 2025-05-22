// src/sumula/sumula.module.ts
import { Module } from '@nestjs/common';
import { SumulaService } from './sumula.service';
import { SumulaController } from './sumula.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // ajuste path se diferente

@Module({
  imports: [PrismaModule],
  controllers: [SumulaController],
  providers: [SumulaService],
})
export class SumulaModule {}
