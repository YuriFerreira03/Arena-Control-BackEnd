// src/usuario/usuario.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsuarioDto) {
    const hash = await bcrypt.hash(data.senha, 10);
    return this.prisma.usuario.create({ data: { ...data, senha: hash } });
  }

  async findByUsername(username: string) {
    return this.prisma.usuario.findUnique({ where: { username } });
  }
}
