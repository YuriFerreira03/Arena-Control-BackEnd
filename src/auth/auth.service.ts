// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../usuario/dto/login.dto';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private users: UsuarioService,
    private jwt: JwtService,
  ) {}
  async validateUser(username: string, pass: string) {
    const user = await this.users.findByUsername(username);
    if (!user || !user.senha) return null;

    const senhaOk = await bcrypt.compare(pass, user.senha);
    if (!senhaOk) return null;

    const { senha, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.username, dto.senha);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
    const payload = {
      sub: user.id_usr,
      username: user.username,
      e_adm: user.e_adm,
    };
    return { access_token: this.jwt.sign(payload), user };
  }

  async register(dto: CreateUsuarioDto) {
    const user = await this.users.create(dto, 0);
    return this.login({ username: user.username, senha: dto.senha });
  }
}
