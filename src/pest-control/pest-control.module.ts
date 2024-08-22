import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PestControlController } from './pest-control.controller';
import { PestControlService } from './pest-control.service';

@Module({
  imports: [ConfigModule],
  controllers: [PestControlController],
  providers: [PestControlService],
})
export class PestControlModule {}