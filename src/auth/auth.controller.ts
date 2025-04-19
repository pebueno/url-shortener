// src/auth/auth.controller.ts
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
import { JwtAuthGuard } from './jwt.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'User registered' })
  @ApiBadRequestResponse({ description: 'Validation failed or email taken' })
  signup(@Body() dto: SignupDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'JWT access token issued' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  login(@Request() req) {
    return this.auth.login(req.user);
  }
}
