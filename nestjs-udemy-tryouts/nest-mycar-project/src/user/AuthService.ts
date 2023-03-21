import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Hash, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scrypts = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private UserServices: UserService) {}
  async signup(email: string, password: string) {
    // uaser already signUp or not
    const user = await this.UserServices.findUser(email);
    if (user.length > 0) {
      throw new BadRequestException('eamail already use in');
    } else {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypts(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash;
      const user = await this.UserServices.createUser(email, result);
      return user;
    }
  }
  async signin(email: string, password: string) {
    const [user] = await this.UserServices.findUser(email);
    if (user) {
      const [salt, storedhash] = user.password.split('.');
      const hash = (await scrypts(password, salt, 32)) as Buffer;
      if (storedhash === hash.toString('hex')) {
        return user;
      } else {
        throw new BadRequestException('incorrect password');
      }
    } else {
      throw new BadRequestException('incorrect email');
    }
  }
}
