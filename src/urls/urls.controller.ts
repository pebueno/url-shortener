import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('api/urls')
  async create(@Body() dto: CreateUrlDto) {
    return this.urlsService.create(dto);
  }

  @Get('api/urls')
  async findAll() {
    return this.urlsService.findAll();
  }

  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const url = await this.urlsService.findBySlug(slug);
    if (!url) throw new NotFoundException('Slug not found');

    // must record the visit whenever passes through a created slug

    return res.redirect(302, url.target);
  }
}
