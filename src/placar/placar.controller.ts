import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlacarService } from './placar.service';
import { CreatePlacarDto } from '../placar/dto/creat-placar.dto';

@Controller('placar')
export class PlacarController {
  constructor(private readonly service: PlacarService) {}

  @Post()
  create(@Body() dto: CreatePlacarDto) {
     console.log('Recebido no backend:', dto);
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePlacarDto,
  ) {
    console.log('Recebido update /placar/', id, dto);
    return this.service.update(id, dto);
  }
  @Get('jogo/:id')
  getByGame(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByGame(id);
  }
}
