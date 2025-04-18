import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitEntity } from './visit.entity';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { UrlsModule } from '../urls/urls.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VisitEntity]),
    forwardRef(() => UrlsModule),
  ],
  providers: [VisitsService],
  controllers: [VisitsController],
  exports: [VisitsService],
})
export class VisitsModule {}
