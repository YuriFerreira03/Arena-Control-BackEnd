import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTabelaDto } from './dto/create-tabela.dto';

@Injectable()
export class TabelaService {
  constructor(private prisma: PrismaService) {}

   async deletarTabela(id: number) {
    const tabela = await this.prisma.tabela.findUnique({
      where: { id_tabela: id },
    });

    if (!tabela) {
      throw new NotFoundException('Tabela não encontrada');
    }

    return this.prisma.tabela.delete({
      where: { id_tabela: id },
    });
  }

async vincularJogo(tabelaId: number, gameId: number) {
  // 1) traga *todos* os placares
  const jogo = await this.prisma.jogo.findUnique({
    where: { id_jogo: gameId },
    include: { placar: true },
  });
  if (!jogo) throw new NotFoundException('Jogo não encontrado');

  // 2) ordene por createdAt desc
  const sorted = jogo.placar.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  // 3) checa vínculo na tabela intermediária
  const existente = await this.prisma.tabela_jogo.findUnique({
    where: {
      fk_tabela_id_tabela_fk_jogo_id_jogo: {
        fk_tabela_id_tabela: tabelaId,
        fk_jogo_id_jogo:     gameId,    // usar gameId aqui
      }
    }
  });
  if (existente) {
    throw new BadRequestException('Jogo já vinculado');
  }

  // 4) cria vínculo
  await this.prisma.tabela_jogo.create({
    data: {
      fk_tabela_id_tabela: tabelaId,
      fk_jogo_id_jogo:     gameId,
    }
  });

  // 5) filtra únicos por período
  const placaresUnicos = sorted.filter(
    (p, i, arr) => arr.findIndex(x => x.periodo === p.periodo) === i
  );

  // 6) soma gols
  const golsA = placaresUnicos.reduce((sum, p) => sum + (p.pontos_time_a ?? 0), 0);
  const golsB = placaresUnicos.reduce((sum, p) => sum + (p.pontos_time_b ?? 0), 0);

  // 7) atualiza Tabela_Time
  const { nome_time_a, nome_time_b } = jogo;
  const times = [
    { team: nome_time_a!, gols: golsA, golsOponente: golsB },
    { team: nome_time_b!, gols: golsB, golsOponente: golsA },
  ];

  for (const { team, gols, golsOponente } of times) {
    await this.prisma.tabela_Time.upsert({
      where: { tabela_team: { fk_tabela_id_tabela: tabelaId, team } },
      update: {
        vitorias:   { increment: gols > golsOponente ? 1 : 0 },
        empates:    { increment: gols === golsOponente ? 1 : 0 },
        derrotas:   { increment: gols <  golsOponente ? 1 : 0 },
        pontos:     { increment: gols > golsOponente ? 3 : gols === golsOponente ? 1 : 0 },
        saldo_gols: { increment: gols - golsOponente },
      },
      create: {
        fk_tabela_id_tabela: tabelaId,
        team,
        vitorias:   gols > golsOponente ? 1 : 0,
        empates:    gols === golsOponente ? 1 : 0,
        derrotas:   gols <  golsOponente ? 1 : 0,
        pontos:     gols > golsOponente ? 3 : gols === golsOponente ? 1 : 0,
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
