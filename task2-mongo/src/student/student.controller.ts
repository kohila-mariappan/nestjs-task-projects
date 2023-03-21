import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
// import { CreateStudentDto } from 'src/Dto/createStudent.dto';
import { UpdateStudentDto } from 'src/Dto/updateStudent.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService, //private authService: AuthService,
  ) {}
  // @UseGuards(AuthGuard('local'))
  // @Post('/signUp')
  // studentSignUp(@Body() body: CreateStudentDto): any {
  //   console.log(body);
  //   return this.authService.create(body);
  // }
  // @Post('/signIn')
  // studentSignIn(@Body() body): any {
  //   return this.authService.signIn(body);
  // }
  @Get('/allStudents')
  studentList() {
    return this.studentService.findAll();
  }
  @Get('/:id')
  studentDetails(@Param('id') id: string) {
    return this.studentService.findOneId(id);
  }
  @Patch('/:id')
  studentDeatilsUpdate(
    @Param('id') id: string,
    @Body() body: UpdateStudentDto,
  ) {
    return this.studentService.update(id, body);
  }
  @Delete()
  removeStudent(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
