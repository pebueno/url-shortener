import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { VisitsService } from './visits.service';
import { UrlsService } from '../urls/urls.service';
import { VisitEntity } from './visit.entity';

@ApiTags('visits')
@Controller('api/urls/:slug/visits')
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
    private readonly urlsService: UrlsService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'List of all visits for this slug',
    type: [VisitEntity],
  })
  @ApiNotFoundResponse({ description: 'Slug not found' })
  async findBySlug(@Param('slug') slug: string): Promise<VisitEntity[]> {
    const url = await this.urlsService.findBySlug(slug);
    if (!url) throw new NotFoundException('Slug not found');
    return this.visitsService.getVisitsForUrl(url.id);
  }
}
