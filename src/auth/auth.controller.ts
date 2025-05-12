// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../usuario/dto/login.dto';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post('register')
  register(@Body() dto: CreateUsuarioDto) {
    return this.auth.register(dto);
  }
}
