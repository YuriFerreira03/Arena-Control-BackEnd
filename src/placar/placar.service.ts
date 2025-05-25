import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlacarDto } from '../placar/dto/creat-placar.dto';

@Injectable()
export class PlacarService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePlacarDto) {
    return this.prisma.placar.create({ data });
  }

  async findAll() {
    return this.prisma.placar.findMany();
  }

  async findOne(id: number) {
    return this.prisma.placar.findUnique({ where: { id_placar: id } });
  }

  async update(id: number, data: Partial<CreatePlacarDto>) {
    return this.prisma.placar.update({
      where: { id_placar: id },
      data,
    });
    }

    async findByGame(jogoId: number) {
  return this.prisma.placar.findMany({
    where: { jogo_id: jogoId },
    orderBy: { periodo: 'asc' },
  });
    }

    async getPlacaresPorJogo(jogoId: number) {
  const placares = await this.prisma.placar.findMany({
    where: { jogo_id: jogoId },
    orderBy: { createdAt: 'desc' },  // 🔥 Ordena do mais recente para o mais antigo
  });

  return placares;
}

}
