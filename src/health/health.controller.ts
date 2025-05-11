import { Controller, Get } from '@nestjs/common';

@Controller('health') // rota base: /health
export class HealthController {
  @Get('ping') // GET /health/ping
  ping() {
    return { message: 'pong' };
  }
}
