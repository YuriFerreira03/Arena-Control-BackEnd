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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SumulaService } from './sumula.service';
import { CreateSumulaDto } from './dto/create-sumula.dto';
import { UpdateSumulaDto } from './dto/update-sumula.dto';

@ApiTags('sumula')
@Controller('sumula')
export class SumulaController {
  constructor(private readonly sumulaService: SumulaService) {}

@Post()
@UseGuards(JwtAuthGuard)
@ApiCreatedResponse({ description: 'Súmula criada com sucesso.' })
create(@Body() dto: CreateSumulaDto, @Req() req: any) {
  console.log('DTO RECEBIDO ===>', dto);
  console.log('USER ===>', req.user);
  const userId = req.user.id; 
  return this.sumulaService.create(dto, userId);
}

  @Get()
  @ApiOkResponse({ description: 'Lista de súmulas.' })
  findAll() {
    return this.sumulaService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('minhas')
  findMySumulas(@Req() req: any) {
    const userId = req.user.id;
    return this.sumulaService.findByUser(userId);
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
