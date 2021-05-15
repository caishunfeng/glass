import { AppModule } from './modules/proxy/app/app.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [HealthModule, AppModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
