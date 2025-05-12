// src/usuario/dto/create-usuario.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty() username: string;
  @IsOptional() matricula?: string;
  @IsEmail() email: string;
  @IsOptional() telefone?: string;
  @MinLength(6) senha: string;
}
