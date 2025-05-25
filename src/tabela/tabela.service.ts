import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTabelaDto } from './dto/create-tabela.dto';

@Injectable()
export class TabelaService {
  constructor(private prisma: PrismaService) {}

  async vincularJogo(tabelaId: number, gameId: number) {
    const jogo = await this.prisma.jogo.findUnique({
      where: { id_jogo: gameId },
      include: { placar: true },
    });

    if (!jogo) {
      throw new NotFoundException('Jogo não encontrado');
    }

    const placarFinal = jogo.placar.pop();
    if (!placarFinal) {
      throw new BadRequestException('Placar não disponível para esse jogo');
    }

const { nome_time_a, nome_time_b } = jogo;

if (!nome_time_a || !nome_time_b) {
  throw new BadRequestException('Nome dos times não definidos no jogo');
}

const golsA = placarFinal.pontos_time_a ?? 0;
const golsB = placarFinal.pontos_time_b ?? 0;

const times = [
  { team: nome_time_a, gols: golsA, golsOponente: golsB },
  { team: nome_time_b, gols: golsB, golsOponente: golsA },
];

for (const { team, gols, golsOponente } of times) {
  await this.prisma.tabela_Time.upsert({
    where: {
      tabela_team: {
        fk_tabela_id_tabela: tabelaId,
        team: team,
      },
    },
    update: {
      vitorias: { increment: gols > golsOponente ? 1 : 0 },
      empates: { increment: gols === golsOponente ? 1 : 0 },
      derrotas: { increment: gols < golsOponente ? 1 : 0 },
      pontos: {
        increment:
          gols > golsOponente
            ? 3
            : gols === golsOponente
            ? 1
            : 0,
      },
      saldo_gols: { increment: gols - golsOponente },
    },
    create: {
      fk_tabela_id_tabela: tabelaId,
      team: team,
      vitorias: gols > golsOponente ? 1 : 0,
      empates: gols === golsOponente ? 1 : 0,
      derrotas: gols < golsOponente ? 1 : 0,
      pontos:
        gols > golsOponente
          ? 3
          : gols === golsOponente
          ? 1
          : 0,
      saldo_gols: gols - golsOponente,
    },
  });
}


    return this.getClassificacao(tabelaId);
  }

  async getClassificacao(tabelaId: number) {
    return this.prisma.tabela_Time.findMany({
      where: { fk_tabela_id_tabela: tabelaId },
      orderBy: { pontos: 'desc' },
    });
  }

  async criarTabela(dto: CreateTabelaDto) {
  return this.prisma.tabela.create({
    data: {
      nome_tabela: dto.nome_tabela,
      fk_usuario_id_usr: dto.fk_usuario_id_usr,
    },
  });
}
 async listarPorUsuario(userId: number) {
    return this.prisma.tabela.findMany({
      where: { fk_usuario_id_usr: userId },
      orderBy: { id_tabela: 'desc' },
    });
  }

}
