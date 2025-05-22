import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJogoDto } from './dto/create-jogo.dto';

@Injectable()
export class JogoService {
  constructor(private readonly prisma: PrismaService) {}

  /* --------- CREATE ---------- */
  async create(dto: CreateJogoDto, userId: number) {
    return this.prisma.jogo.create({
      data: {
        nome_jogo:   dto.nome_jogo,
        nome_time_a: dto.nome_time_a,
        nome_time_b: dto.nome_time_b,
        data_hora:   new Date(dto.data_hora),

        // liga o Jogo ao usuário LOGADO
        usuario: { connect: { id_usr: userId } },
      },

      // devolve também a FK (já preenchida pelo Prisma)
      select: {
        id_jogo:     true,
        nome_jogo:   true,
        nome_time_a: true,
        nome_time_b: true,
        data_hora:   true,
        usuarioId:   true,
      },
    });
  }

  /* --------- READs ---------- */
  findAll(userId: number) {
    return this.prisma.jogo.findMany({
      where:  { usuarioId: userId },
      orderBy:{ data_hora: 'desc' },
      select: {
        id_jogo:     true,
        nome_jogo:   true,
        nome_time_a: true,
        nome_time_b: true,
        data_hora:   true,
        usuarioId:   true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.jogo.findUnique({
      where: { id_jogo: id },
    });
  }

  /* --------- DELETE ---------- */
  remove(id: number) {
    return this.prisma.jogo.delete({
      where: { id_jogo: id },
    });
  }
}
