import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FarmReportController } from './farm-report.controller';
import { FarmReportService } from './farm-report.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [FarmReportController],
  providers: [FarmReportService],
})
export class FarmReportModule {}