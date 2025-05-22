// src/jogo/dto/create-jogo.dto.ts
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateJogoDto {
  @IsString()
  @IsNotEmpty()
  nome_jogo: string;

  @IsString()
  @IsNotEmpty()
  nome_time_a: string;

  @IsString()
  @IsNotEmpty()
  nome_time_b: string;

  @IsDateString()
  @IsNotEmpty()
  data_hora: string;
}
