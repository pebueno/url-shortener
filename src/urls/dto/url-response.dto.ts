import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDto {
  @ApiProperty({ description: 'Unique identifier of this URL record' })
  id: string;

  @ApiProperty({ description: 'The short slug clients will visit' })
  slug: string;

  @ApiProperty({ description: 'The original target URL' })
  target: string;

  @ApiProperty({
    description: 'Timestamp when this short URL was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;
}