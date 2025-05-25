// src/tabela/tabela.controller.ts
import {
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TabelaService } from './tabela.service';
import { LinkGameDto } from './dto/link-game.dto';
import { CreateTabelaDto } from './dto/create-tabela.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tabelas')
export class TabelaController {
  constructor(private readonly tabelaService: TabelaService) {}
 
  @Post()
  async criar(@Request() req, @Body() dto: CreateTabelaDto) {
    const userId = req.user.id_usr;         
    return this.tabelaService.criarTabela({
      ...dto,
      fk_usuario_id_usr: userId,
    });
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

  @Get()
  listarPorUsuario(@Request() req) {
    const userId = req.user.id_usr;     
    return this.tabelaService.listarPorUsuario(userId);
  }

}
