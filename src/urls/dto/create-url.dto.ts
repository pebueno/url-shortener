import { IsString, IsUrl, IsOptional, Length, Matches } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'target must be a valid URL' })
  target: string;

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
