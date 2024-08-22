import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FertilizerPlanService } from './fertilizer-plan.service';
import { FertilizerPlanDto } from './dto/fertilizer-plan.dto';

@ApiTags('fertilizer-plan')
@Controller('fertilizer-plan')
export class FertilizerPlanController {
  constructor(private readonly fertilizerPlanService: FertilizerPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Generate fertilizer plan' })
  async generatePlan(@Body() fertilizerPlanData: FertilizerPlanDto) {
    return this.fertilizerPlanService.generatePlan(fertilizerPlanData);
  }
}