import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JogoModule } from './jogo/jogo.module';
import { PlacarModule } from './placar/placar.module';
import { TabelaModule } from './tabela/tabela.module';
import { SumulaModule } from './sumula/sumula.module';

@Module({
  imports: [
    UsuarioModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JogoModule,
    SumulaModule,
    TabelaModule,
    PlacarModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
