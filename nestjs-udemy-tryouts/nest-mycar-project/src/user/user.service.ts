import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}
  createUser(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });
    return this.repo.save(user);
  }
  async findAllUser() {
    const allUser = await this.repo.find({});
    console.log(allUser);
    return allUser;
  }

  async findUser(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  async removeUser(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
