import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './Dto/user.Dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from 'src/user/Dtos/updateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  studentSignUp(@Body() body: CreateUserDto): any {
    console.log(body);
    return this.authService.create(body);
  }
  @Post('/signIn')
  studentSignIn(@Body() body): any {
    return this.authService.signIn(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/resetPassword/:id')
  resetPassword(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.authService.resetPassword(body, id);
  }
}
