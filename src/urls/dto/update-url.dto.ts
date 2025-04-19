import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto {
  @ApiProperty({
    description: 'New custom slug (alphanumeric, 6–32 chars)',
    example: 'newSlug1',
  })
  @IsString()
  @Length(6, 32)
  @Matches(/^[A-Za-z0-9]+$/)
  slug: string;
}
