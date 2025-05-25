// src/tabela/dto/link-game.dto.ts
import { IsInt } from 'class-validator';

export class LinkGameDto {
  @IsInt()
  gameId: number;
}
