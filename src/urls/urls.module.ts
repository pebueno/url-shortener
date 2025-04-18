import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url.entity';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { VisitsModule } from '../visits/visits.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UrlEntity]),
    forwardRef(() => VisitsModule), // allow injecting VisitsService
  ],
  providers: [UrlsService],
  controllers: [UrlsController],
  exports: [UrlsService],
})
export class UrlsModule {}
