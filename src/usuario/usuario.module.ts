import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsuarioController } from './usuario.controller';


@Module({
  imports: [PrismaModule], // ← importa o módulo que fornece PrismaService
  providers: [UsuarioService],
  exports: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
