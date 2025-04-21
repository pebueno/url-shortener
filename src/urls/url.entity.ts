import { VisitEntity } from 'src/visits/visit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
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

  @OneToMany(() => VisitEntity, (visit) => visit.url)
  visits: VisitEntity[];
}
