import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'you@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}
