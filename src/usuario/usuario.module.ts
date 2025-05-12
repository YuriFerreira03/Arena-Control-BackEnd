import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ← importa o módulo que fornece PrismaService
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
