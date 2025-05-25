import { Module } from '@nestjs/common';
import { TabelaService } from './tabela.service';
import { TabelaController } from './tabela.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TabelaController],
  providers: [TabelaService, PrismaService],
})
export class TabelaModule {}
