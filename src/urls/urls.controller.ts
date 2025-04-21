import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Res,
  NotFoundException,
  HttpCode,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UrlsService } from './urls.service';
import { VisitsService } from '../visits/visits.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { VisitEntity } from '../visits/visit.entity';
import { Throttle } from '@nestjs/throttler';

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly visitsService: VisitsService,
  ) {}

  @Get(':slug')
  @ApiExcludeEndpoint() // hidden in Swagger
  @ApiNotFoundResponse({ description: 'Slug not found' })
  @HttpCode(302)
  async redirect(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.urlsService.findBySlug(slug);
    if (!url) throw new NotFoundException('Slug not found');

    await this.visitsService.logVisit({
      urlId: url.id,
      ip: res.req.ip,
      userAgent: res.req.get('user-agent'),
    });
    return res.redirect(302, url.target);
  }

  // Public global list
  @Get('api/urls/all')
  @ApiOkResponse({ type: [UrlResponseDto] })
  getAll(): Promise<UrlResponseDto[]> {
    return this.urlsService.findAllGlobal();
  }

  // All endpoints below require a valid JWT
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('api/urls')
  @ApiOkResponse({ type: [UrlResponseDto] })
  getMyUrls(@Request() req: Request & { user: { id: string } }) {
    return this.urlsService.findAllForUser(req.user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post('api/urls')
  @ApiCreatedResponse({ type: UrlResponseDto })
  @ApiBadRequestResponse()
  create(@Body() dto: CreateUrlDto, @Request() req): Promise<UrlResponseDto> {
    return this.urlsService.create(dto, req.user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Patch('api/urls/:slug')
  @Throttle({ default: { ttl: 10000, limit: 100 } })
  @ApiOkResponse({ type: UrlResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('slug') oldSlug: string,
    @Body() dto: UpdateUrlDto,
    @Request() req,
  ): Promise<UrlResponseDto> {
    const url = await this.urlsService.findBySlug(oldSlug);
    if (url.userId !== req.user.id) {
      throw new ForbiddenException('You do not own this URL');
    }
    return this.urlsService.updateSlug(oldSlug, dto.slug, req.user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('api/urls/:slug/visits')
  @ApiOkResponse({ type: [VisitEntity] })
  @ApiNotFoundResponse()
  async findVisits(
    @Param('slug') slug: string,
    @Request() req,
  ): Promise<VisitEntity[]> {
    const url = await this.urlsService.findBySlug(slug);

    if (url.userId !== req.user.id) {
      throw new ForbiddenException('You do not own this URL');
    }
    return this.visitsService.getVisitsForUrl(url.id);
  }
}
