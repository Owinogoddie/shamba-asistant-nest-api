import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NpkPredictorModule } from './npk-predictor/npk-predictor.module';
import { PestControlModule } from './pest-control/pest-control.module';
import { ConfigModule } from '@nestjs/config';
import { DiseaseControlModule } from './disease-control/disease-control.module';
import { FarmReportModule } from './farm-report/farm-report.module';
import { SoilCorrectionModule } from './soil-correction/soil-correction.module';
import { FertilizerPlanModule } from './fertilizer-plan/fertilizer-plan.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NpkPredictorModule,
    PestControlModule,
    DiseaseControlModule,
    FarmReportModule,
    SoilCorrectionModule,
    FertilizerPlanModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
