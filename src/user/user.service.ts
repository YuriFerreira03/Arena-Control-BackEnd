import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Usuario } from '@prisma/client'; // modelo gerado pelo Prisma

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /** Lista todos os usuários já existentes */
  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany(); // use o nome em minúsculo
  }

  /** Busca por ID (id_usr) */
  async findOne(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id_usr: id }, // troque pelo campo gerado
    });
  }
}
