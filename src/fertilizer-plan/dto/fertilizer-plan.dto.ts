import { ApiProperty } from '@nestjs/swagger';

export class FertilizerPlanDto {
  @ApiProperty()
  crop_name: string;

  @ApiProperty()
  target_yield: number;

  @ApiProperty()
  field_size: number;

  @ApiProperty()
  ph_water: number;

  @ApiProperty()
  organic_carbon: number;

  @ApiProperty()
  total_nitrogen: number;

  @ApiProperty()
  phosphorus_m3: number;

  @ApiProperty()
  potassium_exch: number;
}