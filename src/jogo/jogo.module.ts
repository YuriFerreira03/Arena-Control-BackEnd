import { Module } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { JogoController } from './jogo.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JogoController],
  providers: [JogoService],
})
export class JogoModule {}
