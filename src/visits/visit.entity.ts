import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UrlEntity } from '../urls/url.entity';

@Entity('visit')
export class VisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  urlId: string;

  @ManyToOne(() => UrlEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'urlId' })
  url: UrlEntity;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @CreateDateColumn()
  timestamp: Date;
}
