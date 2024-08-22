import { Module } from '@nestjs/common';
import { DiseaseControlService } from './disease-control.service';
import { DiseaseControlController } from './disease-control.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [DiseaseControlController],
  providers: [DiseaseControlService],
})
export class DiseaseControlModule {}
