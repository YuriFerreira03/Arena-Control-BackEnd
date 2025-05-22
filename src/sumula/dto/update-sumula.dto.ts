import { PartialType } from '@nestjs/swagger';
import { CreateSumulaDto } from './create-sumula.dto';

export class UpdateSumulaDto extends PartialType(CreateSumulaDto) {}
