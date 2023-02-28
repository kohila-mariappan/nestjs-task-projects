import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}
  async create(body: any): Promise<any> {
    const email: string = body.email;
    const newUser = await this.repo.findOne({ where: { email } });
    if (newUser) {
      throw new BadRequestException('User already registered');
    } else {
      const password = await this.passwordEncryption(body.password);
      const newUser = await this.repo.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        password: password,
      });
      return this.repo.save(newUser);
    }
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.repo.findOne({ where: { email } });
    console.log(user);

    if (user) {
      const result = await bcrypt.compare(password, user.password);
      console.log('result', result);
      if (result) {
        return user;
      } else {
        throw new BadRequestException('incorrect password');
      }
    } else {
      throw new BadRequestException('invalid email');
    }
  }

  async signIn(body): Promise<any> {
    const user = await this.validateUser(body.email, body.password);
    console.log('value', user);
    if (user) {
      const payload = {
        email: body.email,
        password: body.password,
      };
      const token = this.jwt.sign(payload);
      console.log('token', token);
      return {
        user,
        token,
      };
    } else {
      throw new BadRequestException('error');
    }
  }
  async resetPassword(body, id: number): Promise<any> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('invalid user email');
    } else {
      const password: string = await this.passwordEncryption(body.password);
      user.password = password;
      await this.repo.save(user);
    }
  }
  async passwordEncryption(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
