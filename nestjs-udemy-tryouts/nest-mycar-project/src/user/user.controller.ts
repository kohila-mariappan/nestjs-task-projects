import { Controller, Query, Session } from '@nestjs/common';
import { Body, Post, Get, Param, Patch } from '@nestjs/common';
import { createUserDto } from './CreateUser.Dto';
import { UpdateUserDto } from './UpdateUser.Dto';
import { UserService } from './user.service';
import { AuthService } from './AuthService';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('/signUp')
  CreateUser(@Body() body: createUserDto, @Session() Session: any) {
    console.log(body);
    this.authService.signup(body.email, body.password);
  }
  @Post('/signIn')
  userSignIn(@Body() body, @Session() Session: any) {
    this.authService.signin(body.email, body.password);
  }

  @Get('/allUsers')
  FindAllUser() {
    const allUser = this.userService.findAllUser();
    return allUser;
  }

  @Get('/:id')
  gatoneUser(@Query('email') email: string) {
    this.userService.findUser(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    this.userService.update(parseInt(id), body);
  }
}
