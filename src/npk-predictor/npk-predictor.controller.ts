import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NpkPredictorService } from './npk-predictor.service';
import { FarmDataDto } from './dto/farm-data.dto';

@ApiTags('npk-predictor')
@Controller('npk-predictor')
export class NpkPredictorController {
  constructor(private readonly npkPredictorService: NpkPredictorService) {}

  @Post()
  @ApiOperation({ summary: 'Predict NPK requirements' })
  async predictNpk(@Body() farmData: FarmDataDto) {
    return this.npkPredictorService.predict(farmData);
  }
}