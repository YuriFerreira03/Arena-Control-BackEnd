import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto, @Request() req) {
    console.log(" [POST] /usuario - Criador:", req.user.id_usr);
    console.log(" Payload recebido:", dto);
    return this.usuarioService.create(dto, req.user.id_usr);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateUsuarioDto, @Request() req) {
  console.log("[PUT] /usuario/" + id + " - Requisitante:", req.user.id_usr);
  console.log("Dados para atualizar:", dto);
  const usuario = await this.usuarioService.findOne(+id);
  console.log(" Dono do usuário a editar:", usuario?.createdById);
  if (!usuario || usuario.createdById !== req.user.id_usr) {
      console.warn("Permissão negada para editar");
    throw new ForbiddenException('Só quem criou pode editar este usuário');
  }
  return this.usuarioService.update(+id, dto);
}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('created')
  findCreated(@Request() req) {
    return this.usuarioService.findCreatedBy(req.user.id_usr);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
      console.log("[DELETE] /usuario/" + id + " - Requisitante:", req.user.id_usr);
    const usuario = await this.usuarioService.findOne(+id);
      console.log("🔎 Dono do usuário a excluir:", usuario?.createdById);
    if (!usuario || usuario.createdById !== req.user.id_usr) {
          console.warn("Permissão negada para deletar");
      throw new ForbiddenException('Só quem criou pode remover este usuário');
    }
    return this.usuarioService.remove(+id);
  }
}
