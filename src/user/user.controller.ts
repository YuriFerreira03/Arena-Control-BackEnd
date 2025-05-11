import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('usuarios') // → /usuarios
export class UserController {
  constructor(private readonly service: UserService) {}

  /** GET /usuarios  → todos os usuários */
  @Get()
  getAll() {
    return this.service.findAll();
  }

  /** GET /usuarios/1  → usuário único por ID */
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
