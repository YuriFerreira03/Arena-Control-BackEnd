// src/tabela/dto/create-tabela.dto.ts
import { IsString, IsNotEmpty, IsInt,IsOptional } from 'class-validator';

export class CreateTabelaDto {
  @IsString()
  @IsNotEmpty()
  nome_tabela: string;
  
  @IsOptional()
  @IsInt()
  fk_usuario_id_usr: number;
}
