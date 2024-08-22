import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SoilCorrectionService } from './soil-correction.service';
import { SoilCorrectionDto } from './dto/soil-correction.dto';

@ApiTags('soil-correction')
@Controller('soil-correction')
export class SoilCorrectionController {
  constructor(private readonly soilCorrectionService: SoilCorrectionService) {}

  @Post()
  @ApiOperation({ summary: 'Generate soil correction plan' })
  async generatePlan(@Body() soilCorrectionData: SoilCorrectionDto) {
    return this.soilCorrectionService.generatePlan(soilCorrectionData);
  }
}