// src/sumula/sumula.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { SumulaService } from './sumula.service';
import { CreateSumulaDto } from './dto/create-sumula.dto';
import { UpdateSumulaDto } from './dto/update-sumula.dto';

@ApiTags('sumula')
@Controller('sumula')
export class SumulaController {
  constructor(private readonly sumulaService: SumulaService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Súmula criada com sucesso.' })
  create(@Body() dto: CreateSumulaDto) {
    return this.sumulaService.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de súmulas.' })
  findAll() {
    return this.sumulaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalhe da súmula.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sumulaService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Súmula atualizada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSumulaDto,
  ) {
    return this.sumulaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Súmula removida.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sumulaService.remove(id);
  }
}
