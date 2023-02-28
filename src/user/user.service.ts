import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async createUser(body) {
    const user = await this.repo.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      password: body.password,
    });
    this.repo.save(user);
  }
  async findUser(email) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }
  async userDetail(id) {
    const user = await this.repo.find({ where: { id } });
    console.log('user', user);
    return user;
  }

  async updateUser(id: number, attrs: Partial<User>) {
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
      throw new NotFoundException('user not found');
    }
    await this.repo.remove(user);
  }
}
