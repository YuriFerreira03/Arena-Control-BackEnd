import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional,IsBoolean, Min, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PeriodoDto {
  @ApiProperty() @IsOptional() @IsInt() golsA?: number;
  @ApiProperty() @IsOptional() @IsInt() golsB?: number;
  @ApiProperty() @IsOptional() @IsInt() faltasA?: number;
  @ApiProperty() @IsOptional() @IsInt() faltasB?: number;
  @ApiProperty() @IsOptional() @IsInt() temposA?: number;
  @ApiProperty() @IsOptional() @IsInt() temposB?: number;
}

export class JogadorDto {
  @ApiProperty() @IsString() numero!: string;
  @ApiProperty() @IsString() nome!: string;
  @ApiProperty() @IsNumber()  @Min(0) amarelo!: number;
  @ApiProperty() @IsBoolean() vermelho!: boolean;
}



export class CreateSumulaDto {
  @ApiProperty() @IsString() esporte!: string;
  @ApiProperty() @IsString() competicao!: string;
  @ApiProperty() @IsString() categoria!: string;
  @ApiProperty() @IsString() local!: string;
  @ApiProperty() @IsString() cidade!: string;
  @ApiProperty() @IsString() equipeA!: string;
  @ApiProperty() @IsString() equipeB!: string;
  @ApiProperty() @IsString() arbitro!: string;

  @ApiProperty()
  @IsOptional()
  data_hora?: Date;

  @ApiProperty({ type: [PeriodoDto] })
  @ValidateNested({ each: true }) @Type(() => PeriodoDto) @IsArray()
  periodos!: PeriodoDto[];

  @ApiProperty({ type: [JogadorDto] })
  @ValidateNested({ each: true }) @Type(() => JogadorDto) @IsArray()
  jogadoresA!: JogadorDto[];

  @ApiProperty({ type: [JogadorDto] })
  @ValidateNested({ each: true }) @Type(() => JogadorDto) @IsArray()
  jogadoresB!: JogadorDto[];

  @ApiProperty() @IsOptional() @IsString() observacoes?: string;

  @ApiProperty() @IsInt() @IsOptional() fk_jogo_id_jogo!: number;
}
