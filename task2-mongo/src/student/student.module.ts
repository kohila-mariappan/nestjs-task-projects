import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from 'src/entity/Student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), //AuthModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
