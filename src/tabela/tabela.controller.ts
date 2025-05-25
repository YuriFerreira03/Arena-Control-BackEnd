// src/tabela/tabela.controller.ts
import { Controller, Post, Param, Body, ParseIntPipe, Get  } from '@nestjs/common';
import { TabelaService } from './tabela.service';
import { LinkGameDto } from './dto/link-game.dto';
import { CreateTabelaDto } from './dto/create-tabela.dto'; 

@Controller('tabelas')
export class TabelaController {
  constructor(private readonly tabelaService: TabelaService) {}

  @Post()
  async criar(@Body() dto: CreateTabelaDto) {
    return this.tabelaService.criarTabela(dto);
  }

  @Post(':id/vincular-jogo')
  async vincularJogo(
    @Param('id', ParseIntPipe) tabelaId: number,
    @Body() { gameId }: LinkGameDto,
  ) {
    return this.tabelaService.vincularJogo(tabelaId, gameId);
  }

  @Get(':id/classificacao')
  async getClassificacao(@Param('id', ParseIntPipe) tabelaId: number) {
    return this.tabelaService.getClassificacao(tabelaId);
  }

  @Get('user/:id')
  listarPorUsuario(@Param('id', ParseIntPipe) userId: number) {
    return this.tabelaService.listarPorUsuario(userId);
  }
}
