import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiCreatedResponse({ description: 'User registered' })
  @ApiBadRequestResponse({ description: 'Validation failed or email taken' })
  signup(@Body() dto: SignupDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'JWT access token issued' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  login(@Request() req) {
    return this.auth.login(req.user);
  }
}
