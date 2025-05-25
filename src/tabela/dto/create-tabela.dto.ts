// src/tabela/dto/create-tabela.dto.ts
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTabelaDto {
  @IsString()
  @IsNotEmpty()
  nome_tabela: string;

  @IsInt()
  fk_usuario_id_usr: number;
}
