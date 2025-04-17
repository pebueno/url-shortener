import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { v4 as uuidv4 } from 'uuid';

export interface UrlRecord {
    id: string;
    slug: string;
    target: string;
    createdAt: Date;
  }

@Injectable()
export class UrlsService {
  private urls: UrlRecord[] = [];

  private generateSlug(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let slug = '';
    for (let i = 0; i < 6; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
  }

  create(dto: CreateUrlDto): UrlRecord {
    const { target, slug: customSlug } = dto;
    let slug = customSlug;
    if (slug) {
      if (this.urls.find(u => u.slug === slug)) {
        throw new ConflictException('Slug already in use');
      }
    } else {
      do {
        slug = this.generateSlug();
      } while (this.urls.find(u => u.slug === slug));
    }

    const url: UrlRecord = {
      id: uuidv4(),
      slug,
      target,
      createdAt: new Date(),
    };
    this.urls.push(url);
    return url;
  }

  findAll(): UrlRecord[] {
    return this.urls;
  }

  findBySlug(slug: string): UrlRecord {
    const url = this.urls.find(u => u.slug === slug);
    if (!url) throw new NotFoundException('Slug not found');
    return url;
  }
}
