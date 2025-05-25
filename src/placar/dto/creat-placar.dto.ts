// src/modules/placar/dto/create-placar.dto.ts
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlacarDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pontos_time_a?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pontos_time_b?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  set_faltas_a?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  set_faltas_b?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  periodo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pedido_tempo_a?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  pedido_tempo_b?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    jogo_id?: number;
}
