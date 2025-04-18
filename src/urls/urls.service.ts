import {
  Injectable,
  ConflictException,
  NotFoundException,
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

  async create(dto: CreateUrlDto): Promise<UrlEntity> {
    let slug = dto.slug ?? this.generateSlug();
    if (dto.slug && (await this.urlRepo.findOneBy({ slug }))) {
      throw new ConflictException('Slug already in use');
    }
    while (!dto.slug && (await this.urlRepo.findOneBy({ slug }))) {
      slug = this.generateSlug();
    }
    const url = this.urlRepo.create({ slug, target: dto.target });
    return this.urlRepo.save(url);
  }

  findAll(): Promise<UrlEntity[]> {
    return this.urlRepo.find();
  }

  async findBySlug(slug: string): Promise<UrlEntity> {
    const url = await this.urlRepo.findOneBy({ slug });
    if (!url) throw new NotFoundException('Slug not found');
    return url;
  }
}
