import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateSumulaDto,
  PeriodoDto,
  JogadorDto,
} from './dto/create-sumula.dto';
import { UpdateSumulaDto } from './dto/update-sumula.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SumulaService {
  constructor(private prisma: PrismaService) {}

  /* ---------- helpers ---------- */
  private mapPeriodos(p: PeriodoDto[] | undefined) {
    const [p1 = {} as PeriodoDto, p2 = {} as PeriodoDto, pr = {} as PeriodoDto] =
      p ?? [];
    return {
      // 1º tempo
      gols_1t_a: p1.golsA,
      gols_1t_b: p1.golsB,
      faltas_1t_a: p1.faltasA,
      faltas_1t_b: p1.faltasB,
      tempos_1t_a: p1.temposA,
      tempos_1t_b: p1.temposB,
      // 2º tempo
      gols_2t_a: p2.golsA,
      gols_2t_b: p2.golsB,
      faltas_2t_a: p2.faltasA,
      faltas_2t_b: p2.faltasB,
      tempos_2t_a: p2.temposA,
      tempos_2t_b: p2.temposB,
      // prorrogação
      gols_prorrog_a: pr.golsA,
      gols_prorrog_b: pr.golsB,
      faltas_prorrog_a: pr.faltasA,
      faltas_prorrog_b: pr.faltasB,
      tempos_prorrog_a: pr.temposA,
      tempos_prorrog_b: pr.temposB,
    };
  }

  /* ---------- CRUD ---------- */
  async create(dto: CreateSumulaDto, userId: number) {
    return this.prisma.sumula.create({
      data: {
        fk_usuario_id_usr: userId,
        esporte: dto.esporte,
        competicao: dto.competicao,
        categoria: dto.categoria,
        local: dto.local,
        cidade: dto.cidade,
        equipe_a: dto.equipeA,
        equipe_b: dto.equipeB,
        arbitro: dto.arbitro,
        observacoes: dto.observacoes,
        fk_jogo_id_jogo: dto.fk_jogo_id_jogo ?? null,
        data_hora: dto.data_hora ? new Date(dto.data_hora) : null,
        jogadores_a: dto.jogadoresA as unknown as Prisma.JsonArray,
        jogadores_b: dto.jogadoresB as unknown as Prisma.JsonArray,
        ...this.mapPeriodos(dto.periodos),
      },
    });
  }

  async findAll() {
    return this.prisma.sumula.findMany({
      orderBy: { id_sumula: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.sumula.findUnique({ where: { id_sumula: id } });
  }

findByUser(userId: number) {
  return this.prisma.sumula.findMany({
    where: { fk_usuario_id_usr: userId },
    include: { Jogo: true },
  });
}


  async update(id: number, dto: UpdateSumulaDto) {
  console.log('Dados sendo gravados no update:', {
    jogadores_a: dto.jogadoresA,
    jogadores_b: dto.jogadoresB,
    periodos: dto.periodos,
    data_hora: dto.data_hora ?? null,
  });

  return this.prisma.sumula.update({
    where: { id_sumula: id },
    data: {
      esporte: dto.esporte,
      competicao: dto.competicao,
      categoria: dto.categoria,
      local: dto.local,
      cidade: dto.cidade,
      equipe_a: dto.equipeA,
      equipe_b: dto.equipeB,
      arbitro: dto.arbitro,
      observacoes: dto.observacoes,
      fk_jogo_id_jogo: dto.fk_jogo_id_jogo,
      data_hora: dto.data_hora ?? null,

      jogadores_a: dto.jogadoresA
        ? (dto.jogadoresA as unknown as Prisma.JsonArray)
        : undefined,
      jogadores_b: dto.jogadoresB
        ? (dto.jogadoresB as unknown as Prisma.JsonArray)
        : undefined,

      ...(dto.periodos?.length ? this.mapPeriodos(dto.periodos) : {}),
    },
  });
}


  async remove(id: number) {
    await this.prisma.sumula.delete({ where: { id_sumula: id } });
    return { message: 'Súmula removida' };
  }
}
