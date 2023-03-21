import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentDto } from 'src/Dto/createStudent.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //@UseGuards(AuthGuard('local'))
  @Post('/signUp')
  studentSignUp(@Body() body: CreateStudentDto): any {
    console.log(body);
    return this.authService.create(body);
  }
  @Post('/signIn')
  studentSignIn(@Body() body): any {
    return this.authService.signIn(body);
  }
}
