import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
//import { CreateUserDto } from '../auth/Dto/user.Dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private MailerServices: MailerService,
  ) {}

  // @Post('/signUp')
  // async createUser(@Body() body: CreateUserDto) {
  //   console.log(body);
  //   this.AuthServices.newUser(body);
  //   // const link = 'http://localhost:3000/users/login';
  //   // const result = await this.MailerServices.sendMail({
  //   //   to: body.email,
  //   //   from: 'kohilamariammal@gmail.com',
  //   //   subject: 'successfully Registered',
  //   //   text: link,
  //   // });
  //   // return result;
  // }
  // @Post('/login')
  // async loginUser(@Body() body, @Session() Session: any) {
  //   return this.AuthServices.login(body);
  // }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getUser(@Param('id') id: number) {
    return this.userService.userDetail(id);
  }
  // @Patch('/resetPassword/:id')
  // resetPassword(@Param('id') id: number, @Body() body: UpdateUserDto) {
  //   this.AuthServices.resetPassword(body, id);
  // }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    this.userService.updateUser(id, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/remove')
  removedUser(@Body() body) {
    this.userService.removeUser(body.id);
  }
}
