import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PestControlService } from './pest-control.service';
import { CropPlannedDto } from './dto/crop-planned.dto';

@ApiTags('pest-control')
@Controller('pest-control')
export class PestControlController {
  constructor(private readonly pestControlService: PestControlService) {}

  @Post()
  @ApiOperation({ summary: 'Analyze pests for a given crop' })
  @ApiResponse({ status: 200, description: 'Pest analysis successful' })
  @ApiResponse({ status: 500, description: 'Failed to analyze pest data' })
  async analyzePests(@Body() cropPlannedDto: CropPlannedDto) {
    return this.pestControlService.analyzePests(cropPlannedDto.cropPlanned);
  }
}