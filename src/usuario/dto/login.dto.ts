// src/usuario/dto/login.dto.ts
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() senha: string;
}
