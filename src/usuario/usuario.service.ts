// src/usuario/usuario.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

async create(data: CreateUsuarioDto, currentUserId: number) {
  const hash = await bcrypt.hash(data.senha, 10);

  try {
    return await this.prisma.usuario.create({
      data: { ...data, senha: hash, createdById: currentUserId },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new BadRequestException('Esse nome de usuário já está em uso.');
    }
    throw error;
  }
}

  async update(id: number, data: CreateUsuarioDto) {
  // opcional: re-hash senha se vier preenchida
  let updateData: any = { ...data };

  if (data.senha) {
    updateData.senha = await bcrypt.hash(data.senha, 10);
  }

  return this.prisma.usuario.update({
    where: { id_usr: id },
    data: updateData,
  });
}


  async findByUsername(username: string) {
    return this.prisma.usuario.findUnique({ where: { username } });
  }
  async findCreatedBy(userId: number) {
  return this.prisma.usuario.findMany({
    where: { createdById: userId },
  });
}
  // 1) listar todos
  async findAll() {
    return this.prisma.usuario.findMany();
  }

  // 2) buscar um pelo ID
  async findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id_usr: id } });
  }

  // 3) remover (para o DELETE do controller)
  async remove(id: number) {
    return this.prisma.usuario.delete({ where: { id_usr: id } });
  }
}
