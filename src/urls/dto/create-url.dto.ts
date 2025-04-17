import { IsString, IsUrl, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The original URL to shorten',
    example: 'https://example.com/foo/bar',
  })
  @IsUrl({}, { message: 'target must be a valid URL' })
  target: string;

  @ApiPropertyOptional({
    description:
      'Custom slug (alphanumeric, 6–32 chars). If omitted, a random one will be generated.',
    example: 'abc123',
  })
  @IsOptional()
  @IsString()
  @Length(6, 32, {
    message: 'slug must be between 6 and 32 characters',
  })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'slug can only contain letters and numbers',
  })
  slug?: string;
}
