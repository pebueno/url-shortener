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

@ApiTags('urls')
@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('api/urls')
  @ApiCreatedResponse({
    description: 'A new short URL has been created',
    type: UrlResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  create(@Body() dto: CreateUrlDto): UrlResponseDto {
    return this.urlsService.create(dto);
  }

  @Get('api/urls')
  @ApiOkResponse({
    description: 'All shortened URLs',
    type: [UrlResponseDto],
  })
  findAll(): UrlResponseDto[] {
    return this.urlsService.findAll();
  }

  @Get(':slug')
  @HttpCode(302)
  @ApiExcludeEndpoint() // Will hide this endpoint for now in the Swagger
  @ApiOkResponse({ description: 'Redirects (302) to the target URL' })
  @ApiNotFoundResponse({ description: 'Slug not found' })
  async redirect(
    @Param('slug') slug: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = this.urlsService.findBySlug(slug);
    if (!url) throw new NotFoundException('Slug not found');

    // must record the visit
    return res.redirect(302, url.target);
  }
}
