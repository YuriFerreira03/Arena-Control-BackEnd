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

/* --------- READ JOGOS COM PLACAR FINAL ---------- */
async findJogosJogados(userId: number) {
  // 1. Busca todos os placares, já ordenados do mais novo pro mais velho
  const jogos = await this.prisma.jogo.findMany({
    where: {
      usuarioId: userId,
      placar: { some: {} },
    },
    orderBy: { data_hora: 'desc' },
    include: {
      placar: {
        orderBy: { createdAt: 'desc' }, 
        // não precisa de `take` aqui porque vamos filtrar por período
      },
    },
  });

  // 2. Para cada jogo, mantém só o registro mais recente de cada período
  return jogos.map((jogo) => {
    const placaresUnicos = jogo.placar.filter((p, i, arr) =>
      // pega o primeiro (que já é o mais novo) de cada período
      arr.findIndex(x => x.periodo === p.periodo) === i
    );

    // 3. Soma apenas esses únicos
    const totalPontosA = placaresUnicos.reduce(
      (sum, p) => sum + (p.pontos_time_a ?? 0),
      0
    );
    const totalPontosB = placaresUnicos.reduce(
      (sum, p) => sum + (p.pontos_time_b ?? 0),
      0
    );

    return {
      id_jogo: jogo.id_jogo,
      nome_jogo: jogo.nome_jogo,
      nome_time_a: jogo.nome_time_a,
      nome_time_b: jogo.nome_time_b,
      data_hora: jogo.data_hora,
      usuarioId: jogo.usuarioId,
      resultado_final: {
        pontos_time_a: totalPontosA,
        pontos_time_b: totalPontosB,
      },
    };
  });
}

}
