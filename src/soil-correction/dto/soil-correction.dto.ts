import { ApiProperty } from '@nestjs/swagger';

class FarmData {
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

class NpkResult {
  @ApiProperty()
  nitrogen_need: number;

  @ApiProperty()
  phosphorus_need: number;

  @ApiProperty()
  potassium_need: number;
}

export class SoilCorrectionDto {
  @ApiProperty()
  farmData: FarmData;

  @ApiProperty()
  npkResult: NpkResult;
}