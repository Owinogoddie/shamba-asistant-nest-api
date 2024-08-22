import { ApiProperty } from '@nestjs/swagger';

class Location {
  @ApiProperty()
  label: string;
}

export class FarmData {
  @ApiProperty()
  farmName: string;

  @ApiProperty()
  farmerName: string;

  @ApiProperty()
  location: Location;

  @ApiProperty()
  cropName: string;

  @ApiProperty()
  targetYield: number;

  @ApiProperty()
  fieldSize: number;

  @ApiProperty()
  nitrogen: number;

  @ApiProperty()
  phosphorus: number;

  @ApiProperty()
  potassium: number;

  @ApiProperty()
  soilMoisture: number;

  @ApiProperty()
  temperature?: number;

  @ApiProperty()
  ph: number;

  @ApiProperty()
  soilConductivity: number;
}