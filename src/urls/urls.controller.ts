import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlResponseDto } from './dto/url-response.dto';
import { VisitsService } from '../visits/visits.service';
import { VisitEntity } from '../visits/visit.entity';

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly visitsService: VisitsService,
  ) {}

  @Post('api/urls')
  @ApiCreatedResponse({
    description: 'A new short URL has been created',
    type: UrlResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  create(@Body() dto: CreateUrlDto): Promise<UrlResponseDto> {
    return this.urlsService.create(dto);
  }

  @Get('api/urls')
  @ApiOkResponse({
    description: 'All shortened URLs',
    type: [UrlResponseDto],
  })
  findAll(): Promise<UrlResponseDto[]> {
    return this.urlsService.findAll();
  }

  @Get('api/urls/:slug/visits')
  @ApiOkResponse({
    description: 'List all visits for a given slug',
    type: [VisitEntity],
  })
  @ApiNotFoundResponse({ description: 'Slug not found' })
  async findVisits(@Param('slug') slug: string): Promise<VisitEntity[]> {
    const url = await this.urlsService.findBySlug(slug);
    return this.visitsService.getVisitsForUrl(url.id);
  }

  @Get(':slug')
  @HttpCode(302)
  @ApiExcludeEndpoint() // hidden in Swagger
  @ApiNotFoundResponse({ description: 'Slug not found' })
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
}
