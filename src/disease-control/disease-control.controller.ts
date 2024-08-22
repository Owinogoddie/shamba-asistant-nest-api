import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiseaseControlService } from './disease-control.service';
import { CropPlannedDto } from './dto/crop-planned.dto';

@ApiTags('disease-control')
@Controller('disease-control')
export class DiseaseControlController {
  constructor(private readonly diseaseControlService: DiseaseControlService) {}

  @Post()
  @ApiOperation({ summary: 'Analyze diseases for a given crop' })
  @ApiResponse({ status: 200, description: 'Disease analysis successful' })
  @ApiResponse({ status: 201, description: 'Disease analysis successful' })
  @ApiResponse({ status: 500, description: 'Failed to analyze disease data' })
  async analyzediseases(@Body() cropPlannedDto: CropPlannedDto) {
    return this.diseaseControlService.analyzeDiseases(cropPlannedDto.cropPlanned);
  }
}