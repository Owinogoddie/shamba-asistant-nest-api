import { ApiProperty } from '@nestjs/swagger';

export class FarmDataDto {
  @ApiProperty()
  cropName: string;

  @ApiProperty()
  targetYield: number;

  @ApiProperty()
  fieldSize: number;

  @ApiProperty()
  ph: number;

  @ApiProperty()
  soilConductivity: number;

  @ApiProperty()
  nitrogen: number;

  @ApiProperty()
  phosphorus: number;

  @ApiProperty()
  potassium: number;

  @ApiProperty()
  soilMoisture: number;
}