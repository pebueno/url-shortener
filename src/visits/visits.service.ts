import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitEntity } from './visit.entity';

interface LogVisitDto {
  urlId: string;
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(VisitEntity)
    private readonly visitRepo: Repository<VisitEntity>,
  ) {}

  logVisit(dto: LogVisitDto): Promise<VisitEntity> {
    const visit = this.visitRepo.create(dto);
    return this.visitRepo.save(visit);
  }

  getVisitsForUrl(urlId: string): Promise<VisitEntity[]> {
    return this.visitRepo.find({ where: { urlId } });
  }
}
