import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NpkPredictorController } from './npk-predictor.controller';
import { NpkPredictorService } from './npk-predictor.service';

@Module({
  imports: [HttpModule],
  controllers: [NpkPredictorController],
  providers: [NpkPredictorService],
})
export class NpkPredictorModule {}