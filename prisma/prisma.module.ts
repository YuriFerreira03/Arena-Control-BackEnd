// npx prisma db pull : atualizar banco de dados

import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ← torna-o visível para outros módulos
})
export class PrismaModule {}
