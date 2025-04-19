import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>,
  ) {}

  async create(email: string, password: string): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = this.usersRepo.create({ email, passwordHash: hash });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  
}
