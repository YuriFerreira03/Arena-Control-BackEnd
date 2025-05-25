import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlacarService } from './placar.service';
import { PlacarController } from './placar.controller';

@Module({
  imports: [PrismaModule],
  providers: [PlacarService],
  controllers: [PlacarController],
})
export class PlacarModule {}
