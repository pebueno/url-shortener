// src/urls/url.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('url')
export class UrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ length: 32, unique: true })
  slug: string;

  @Column('text')
  target: string;

  @CreateDateColumn()
  createdAt: Date;
}
