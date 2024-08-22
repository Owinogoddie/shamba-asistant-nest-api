import { ApiProperty } from '@nestjs/swagger';

export class CropPlannedDto {
  @ApiProperty({ example: 'maize', description: 'The planned crop' })
  cropPlanned: string;
}
