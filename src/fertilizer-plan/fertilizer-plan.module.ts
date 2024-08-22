import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FertilizerPlanController } from './fertilizer-plan.controller';
import { FertilizerPlanService } from './fertilizer-plan.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [FertilizerPlanController],
  providers: [FertilizerPlanService],
})
export class FertilizerPlanModule {}