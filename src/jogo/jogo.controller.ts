import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';           // ✅ 1. importa Request
import { JogoService } from './jogo.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('jogos')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Post()
  create(@Body() dto: CreateJogoDto, @Req() req: Request) {
    const userId = (req as any).user.id_usr;
    return this.jogoService.create(dto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = (req as any).user.id_usr;
    return this.jogoService.findAll(userId);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jogoService.remove(id);
  }
}