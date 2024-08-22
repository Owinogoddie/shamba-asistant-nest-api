import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SoilCorrectionController } from './soil-correction.controller';
import { SoilCorrectionService } from './soil-correction.service';

@Module({
  imports: [ConfigModule],
  controllers: [SoilCorrectionController],
  providers: [SoilCorrectionService],
})
export class SoilCorrectionModule {}