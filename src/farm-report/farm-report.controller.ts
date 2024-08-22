import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FarmReportService } from './farm-report.service';
import { FarmData } from './dto/farm-report.dto';

@ApiTags('farm-report')
@Controller('farm-report')
export class FarmReportController {
  constructor(private readonly farmReportService: FarmReportService) {}

  @Post()
  @ApiOperation({ summary: 'Generate farm report' })
  async generateReport(@Body() farmData: FarmData) {
    return this.farmReportService.generateReport(farmData);
  }
}