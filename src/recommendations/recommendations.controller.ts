import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  @ApiOperation({summary:'Generate recommendations'})
  async generateRecommendations(@Body() data: { farmData: any; npkResult: any; fertilizerPlanData: any }) {
    try {
      const { farmData, npkResult, fertilizerPlanData } = data;
      const result = await this.recommendationsService.generateRecommendations(farmData, npkResult, fertilizerPlanData);
      return result;
    } catch (error) {
      console.error("Error generating final report:", error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}