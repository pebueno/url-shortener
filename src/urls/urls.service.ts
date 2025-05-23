import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlEntity } from './url.entity';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  private generateSlug(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let slug = '';
    for (let i = 0; i < 6; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
  }

  private async assertReachable(url: string) {
    try {
      // Use HEAD so we don't download the whole page
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
    } catch (err) {
      throw new BadRequestException(`Target URL not reachable: ${err.message}`);
    }
  }

  async create(dto: CreateUrlDto, userId: string): Promise<UrlEntity> {
    await this.assertReachable(dto.target);

    let slug = dto.slug ?? this.generateSlug();
    if (dto.slug && (await this.urlRepo.findOneBy({ slug }))) {
      throw new ConflictException('Slug already in use');
    }
    while (!dto.slug && (await this.urlRepo.findOneBy({ slug }))) {
      slug = this.generateSlug();
    }
    const url = this.urlRepo.create({ slug, target: dto.target, userId });
    return this.urlRepo.save(url);
  }

  async updateSlug(
    oldSlug: string,
    newSlug: string,
    userId: string,
  ): Promise<UrlEntity> {
    const url = await this.findBySlug(oldSlug);
    if (url.userId !== userId) throw new ForbiddenException();
    if (await this.urlRepo.findOneBy({ slug: newSlug })) {
      throw new ConflictException('Slug already in use');
    }
    url.slug = newSlug;
    return this.urlRepo.save(url);
  }

  async findAllGlobal(): Promise<UrlEntity[]> {
    return this.urlRepo.find();
  }

  async findAllForUser(userId: string): Promise<UrlEntity[]> {
    return this.urlRepo
      .createQueryBuilder('url')
      .where('url.userId = :userId', { userId })
      .loadRelationCountAndMap('url.visits', 'url.visits')
      .getMany();
  }

  async findBySlug(slug: string): Promise<UrlEntity> {
    const url = await this.urlRepo.findOneBy({ slug });
    if (!url) throw new NotFoundException('Slug not found');
    return url;
  }
}
